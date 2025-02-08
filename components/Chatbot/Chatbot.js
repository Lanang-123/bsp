import React, { useEffect, useRef, useState } from 'react';
import ChatbotIcon from './ChatbotIcon.js';
import { GoChevronDown, GoComment,GoX } from "react-icons/go";
import ChatbotForm from './ChatbotForm.js';
import ChatMessage from './ChatMessage.js';
import ChatbotOpen from './ChatbotOpen.js';

function Chatbot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false); // State untuk toggle chat
  const chatBodyRef = useRef();

  // Fungsi untuk membuka/menutup chat
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  // Komponen Chatbot
  const generateBotResponse = async (history) => {
    // Helper update history
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Merespon..."), // Hapus pesan "Thinking..."
        { role: "model", text }, // Tambahkan respons baru dari bot
      ]);
    };

    const formattedHistory = history.map(({ role, text }) => ({
      role: role === 'user' ? 'user' : 'model',
      text: text,
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: formattedHistory }),
    };

    try {
      const response = await fetch('/api/gemini', requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Ada yang salah!");

      // Proses respons dari API
      const aiResponse = data.response.replace(/\*\*(.*?)\*\*/g, "$1").trim();

      // Update chat history menggunakan updateHistory
      updateHistory(aiResponse);
    } catch (error) {
      console.error(error);

      // Jika terjadi error, tambahkan pesan error ke riwayat chat
      updateHistory("Maaf, terjadi kesalahan. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) { // Pastikan elemen sudah ada sebelum scroll
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory, isChatOpen]); // Tambahkan `isChatOpen` sebagai dependency
  

  return (
    <div className='chatbot-container'>
      {/* Chat Toggle */}
      <button id='chatbot-toggler' onClick={toggleChat}>
        {isChatOpen ? <GoX /> : <ChatbotOpen />}
      </button>

      {/* Popup Chat */}
      {isChatOpen && (
        <div className='chatbot-popup'>
          {/* Header */}
          <div className='chat-header'>
            <div className='header-info'>
              <ChatbotIcon />
              <h2 className='chatbot-logo-text'>BSP Assistant</h2>
            </div>
          </div>

          {/* Body */}
          <div className='chat-body' ref={chatBodyRef}>
            <div className='message bot-message'>
              <ChatbotIcon />
              <p className='message-text'>
                Halo 🙌 <br /> Ada yang bisa saya bantu?
              </p>
            </div>

            {/* Render the chat history dynamic */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* Footer */}
          <div className='chat-footer'>
            <ChatbotForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;