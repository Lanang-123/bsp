import React, { useEffect, useRef, useState } from 'react';
import ChatbotIcon from './ChatbotIcon';
import { GoX, GoChevronDown } from "react-icons/go";
import { AiOutlineCheckCircle } from "react-icons/ai";
import ChatbotForm from './ChatbotForm';
import ChatMessage from './ChatMessage';
import DraggableRating from './DraggableRating';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const apiAdmin = process.env.NEXT_PUBLIC_ADMIN_API_ENDPOINT;

function Chatbot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [conversationData, setConversationData] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [ratingValue, setRatingValue] = useState(null);
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showInactivityPrompt, setShowInactivityPrompt] = useState(false);

  const conversationCreated = useRef(false);
  const chatBodyRef = useRef();
  const inactivityTimer = useRef(null);  // Timer untuk reminder 5 menit
  const autoEndTimer = useRef(null);       // Timer untuk auto-end 30 menit

  // Buat conversation baru hanya ketika user mengirim pesan pertama
  const createConversation = async () => {
    try {
      const convRequestBody = {
        user_id: '',
        guest_token: '',
        session_token: '',
        start_time: '',
        end_time: ''
      };
      const res = await fetch(`${apiAdmin}/api/conversation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(convRequestBody)
      });
      if (!res.ok) throw new Error("Gagal membuat conversation");
  
      const convData = await res.json();
      setConversationData(convData.data); // tetap set state
      conversationCreated.current = true;
      
      // return data conversation agar bisa dipakai langsung
      return convData.data;
    } catch (error) {
      console.error("Error membuat conversation:", error);
      return null;
    }
  };
  

  // Toggle chat open/close (tanpa membuat conversation saat membuka chat)
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  // Handle pengiriman pesan user:
  // - Jika conversation belum dibuat, maka buat terlebih dahulu.
  // - Update history, kirim ke API, dan panggil respons AI.
  const handleSendMessage = async (messageContent) => {
    if (!messageContent.trim()) return;
  
    let currentConversation = conversationData;
    if (!currentConversation) {
      currentConversation = await createConversation();
      if (!currentConversation) return; // Gagal membuat conversation, hentikan
    }
  
    const newUserMessage = { role: 'user', text: messageContent };
    setChatHistory(prev => [...prev, newUserMessage]);
  
    // Kirim pesan user ke DB dengan ID conversation yang sudah pasti
    await sendMessageToAPI('user', messageContent, currentConversation.id);
  
    // Panggil generateBotResponse dengan forcedConvId
    await generateBotResponse([...chatHistory, newUserMessage], currentConversation.id);
  };
  
  
  // Kirim pesan ke API message
  const sendMessageToAPI = async (sender, messageContent, forcedConvId) => {
    // Jika ada forcedConvId, gunakan itu. Jika tidak, gunakan conversationData dari state
    const convId = forcedConvId || (conversationData && conversationData.id);
    if (!convId) return; // tidak ada ID valid, hentikan
  
    try {
      await fetch(`${apiAdmin}/api/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: convId,
          sender,
          message_content: messageContent,
        }),
      });
    } catch (error) {
      console.error("Error mengirim pesan:", error);
    }
  };
  
  

  // Panggil API untuk mendapatkan respons AI dan update chat history
  const generateBotResponse = async (history, forcedConvId) => {
    const updateHistory = (text) => {
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "Merespon..."),
        { role: "model", text }
      ]);
    };
  
    const formattedHistory = history.map(({ role, text }) => ({
      role: role === 'user' ? 'user' : 'model',
      text,
    }));
  
    try {
      // Tampilkan placeholder "Merespon..."
      setChatHistory(prev => [...prev, { role: 'model', text: "Merespon..." }]);
  
      // Panggil endpoint AI
      const res = await fetch('/api/gemini', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: formattedHistory }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
  
      const aiResponse = data.response.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(aiResponse);
  
      // Pastikan kita mengirim ke API message dengan conversationId yang valid
      await sendMessageToAPI('AI', aiResponse, forcedConvId);
  
    } catch (error) {
      console.error(error);
      updateHistory("Maaf, terjadi kesalahan. Silakan coba lagi.");
    }
  };
  

  // Mengakhiri chat dengan menghasilkan summary dan update status chatEnded
  const endChat = async () => {
    if (!conversationData) return;
    try {
      const summaryPrompt = chatHistory
        .map(msg => `${msg.role}: ${msg.text}`)
        .join('\n');
      const summaryRes = await fetch('/api/gemini', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: summaryPrompt, mode: "summary" })
      });
      const summaryData = await summaryRes.json();
      if (!summaryRes.ok) throw new Error("Gagal membuat summary");
      await fetch(`${apiAdmin}/api/conversation/${conversationData.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: summaryData.response })
      });
      setChatEnded(true);
    } catch (error) {
      console.error("Error mengakhiri chat:", error);
    }
  };

  // Reset kedua timer (reminder 5 menit dan auto-end 30 menit) saat ada aktivitas
  useEffect(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (autoEndTimer.current) clearTimeout(autoEndTimer.current);
    // Set timer hanya jika chat terbuka, belum berakhir, conversation sudah dibuat,
    // dan user telah mengirim setidaknya satu pesan
    if (isChatOpen && !chatEnded && conversationData && chatHistory.some(msg => msg.role === 'user')) {
      inactivityTimer.current = setTimeout(() => {
        setShowInactivityPrompt(true);
      }, 30000); // 5 menit = 300000 ms

      autoEndTimer.current = setTimeout(async () => {
        // Jika tidak ada aktivitas selama 30 menit, otomatis akhiri chat
        await endChat();
        setRatingValue(0);
        setIsChatOpen(false);
      },  1800000); // 30 menit = 1800000 ms
    }
    return () => {
      clearTimeout(inactivityTimer.current);
      clearTimeout(autoEndTimer.current);
    };
  }, [chatHistory, isChatOpen, chatEnded, conversationData]);

  // Auto-scroll chat body saat chatHistory berubah
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory, isChatOpen]);

  // Jika chat telah berakhir dan rating belum diberikan, auto-set rating ke 0 setelah 60 detik
  useEffect(() => {
    if (chatEnded && ratingValue === null) {
      const timer = setTimeout(() => {
        setRatingValue(0);
        setShowRestartPrompt(false);
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [chatEnded, ratingValue]);

  useEffect(() => {
    if (chatEnded && ratingValue !== 0 && feedbackSubmitted && !showRestartPrompt) {
      const timer = setTimeout(() => {
        restartConversation();
      }, 10000); // 10 detik
      return () => clearTimeout(timer);
    }
  }, [chatEnded, ratingValue, feedbackSubmitted, showRestartPrompt]);
  

  // Saat user memberikan rating
  const handleRatingChange = async (rating) => {
    console.log("User memberi rating:", rating);
    setRatingValue(rating);

    try {
      const ratingAPI = await fetch(`${apiAdmin}/api/feedbacks`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id:conversationData.id,
          guest_token:conversationData.guest_token,
          rating
        })
      });
      const responseRating = await ratingAPI.json();
      console.log(responseRating);
      
    } catch (error) {
      console.log(error);
      
    }
    setShowRestartPrompt(true);
  };

  // Restart percakapan: reset state sehingga chat history dikosongkan
  const restartConversation = async () => {
    conversationCreated.current = false;
    setConversationData(null);
    setChatHistory([]);
    setChatEnded(false);
    setRatingValue(null);
    setShowRestartPrompt(false);
    setFeedbackSubmitted(false);
    setShowInactivityPrompt(false);
    // Conversation baru akan dibuat saat user mengirim pesan berikutnya
  };

  return (
    <div className='chatbot-container'>
      {/* Tombol toggler */}
      <button 
        id='chatbot-toggler' 
        onClick={toggleChat}
        style={{
          width: '80px',
          height: '80px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '50%',
          padding: 0,
          boxShadow: 'none'
        }}
      >
        {isChatOpen ? null : (
          <DotLottieReact 
            src="https://lottie.host/0117c9d8-d60a-409a-852a-65a824c41a09/stlsJ73z25.lottie"
            loop
            autoplay
            style={{ width: '100px', height: '80px', backgroundColor:'white', borderRadius:'50%' }}
          />
        )}
      </button>

      {isChatOpen && (
        <div className='chatbot-popup' style={{ position: 'relative' }}>
          {/* Header */}
          <div className='chat-header' style={{ position: 'relative' }}>
            <div className='header-info'>
              <ChatbotIcon />
              <h2 className='chatbot-logo-text' style={{ color:'white', fontWeight:'500' }}>
                BSP Assistant
              </h2>
            </div>
            {/* Tombol minimize & close (close membuka modal konfirmasi) */}
            {!chatEnded && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="minimize-button" 
                  onClick={() => setIsChatOpen(false)} 
                  aria-label="Minimize chat" 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color:'white' }}
                >
                  <GoChevronDown size={25} color="white" />
                </button>  
                <button 
                  className="close-button" 
                  onClick={() => setShowConfirmationModal(true)} 
                  aria-label="Close chat"
                >
                  <GoX size={25} color="white" />
                </button>
              </div>
            )}
          </div>

          {/* Modal Konfirmasi End Chat */}
          {showConfirmationModal && (
            <div className="confirmation-overlay" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255,255,255,0.95)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backdropFilter: 'blur(2px)',
              zIndex: 10
            }}>
              <div className="confirmation-modal" style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                width: '100%',
                maxWidth: '300px',
                textAlign: 'center'
              }}>
                <h4>Konfirmasi</h4>
                <p>Apakah Anda yakin ingin mengakhiri chat?</p>
                <div className="modal-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                  <button 
                    className="confirm-button" 
                    style={{ background: '#dc2626', color: '#fff', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}
                    onClick={async () => {
                      await endChat();
                      setShowConfirmationModal(false);
                    }}
                  >
                    End Chat
                  </button>
                  <button 
                    className="cancel-button" 
                    style={{ background: '#64748b', color: '#fff', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}
                    onClick={() => {
                      setShowConfirmationModal(false);
                      setShowInactivityPrompt(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Inaktivitas (hanya muncul jika conversation sudah dimulai) */}
          {showInactivityPrompt && (
            <div className="inactivity-overlay" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255,255,255,0.95)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10
            }}>
              <div className="inactivity-modal" style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                width: '100%',
                maxWidth: '300px',
                textAlign: 'center'
              }}>
                <p>Apakah Anda masih ingin melanjutkan percakapan? Jika tidak, chat akan segera diakhiri.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                  <button 
                    onClick={() => setShowInactivityPrompt(false)}
                    style={{ background: '#10B981', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize:'0.8rem' }}
                  >
                    Saya masih ada
                  </button>
                  <button 
                    onClick={async () => {
                      await endChat();
                      setShowInactivityPrompt(false);
                      setIsChatOpen(false);
                    }}
                    style={{ background: '#dc2626', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize:'0.8rem' }}
                  >
                    Akhiri Chat
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chat Body */}
          <div className='chat-body' ref={chatBodyRef}>
            {chatHistory.length === 0 ? (
              <div className='message bot-message'>
                <ChatbotIcon />
                <p className='message-text'>
                  Halo 🙌 <br /> Ada yang bisa saya bantu?
                </p>
              </div>
            ) : (
              chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))
            )}
          </div>

          {/* Chat Footer */}
          <div className='chat-footer'>
            {chatEnded ? (
              <div className='chat-feedback' style={{ textAlign: 'center', padding: '1rem' }}>
                {feedbackSubmitted ? (
                  <p style={{ fontSize: '1.5rem', marginTop: '1rem',color:'#25d366',fontWeight:'600' }}>
                    Terima kasih atas percakapan Anda 👏
                  </p>
                ) : showRestartPrompt ? (
                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <button 
                      onClick={async () => {
                        setFeedbackSubmitted(true);
                        await restartConversation();
                      }}
                      style={{ background: '#10B981', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '14px' }}
                    >
                      Ya, mulai percakapan baru
                    </button>
                    <button 
                      onClick={() => {
                        setFeedbackSubmitted(true);
                        setShowRestartPrompt(false);
                      }}
                      style={{ background: '#dc2626', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '14px' }}
                    >
                      Tidak, selesai
                    </button>
                  </div>
                ) : (
                  <>
                    <p style={{ fontSize: '14px', margin: '0.5rem 0' }}>
                      Terima kasih sudah menggunakan layanan kami!
                    </p>
                    <p style={{ marginBottom: '12px', fontSize: '14px' }}>
                      Bagaimana pengalaman Anda?
                    </p>
                    <DraggableRating onRatingChange={handleRatingChange} />
                  </>
                )}
                {(!showRestartPrompt && ratingValue === 0 && !feedbackSubmitted) && (
                  <div style={{
                    marginTop: '-11rem',
                    backgroundColor: 'green', // abu-abu terang
                    borderRadius: '0.375rem',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                   
                  }}>
                    <AiOutlineCheckCircle style={{ color: '#10B981', fontSize: '1.2rem' }} />
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: 'white',
                      fontWeight: 500
                    }}>
                      Percakapan telah selesai.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // ChatbotForm menerima fungsi handleSendMessage untuk mengirim pesan
              <ChatbotForm onSendMessage={handleSendMessage} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
