import React,{useRef} from 'react'
import { GoChevronUp } from "react-icons/go"

function ChatbotForm({setChatHistory,generateBotResponse,chatHistory}) {
    const inputRef = useRef();

    // Komponen ChatbotForm
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";
    
        // Update chat history dengan pesan pengguna
        setChatHistory((history) => [
        ...history,
        { role: "user", text: userMessage },
        ]);
    
        // Tampilkan pesan "Thinking..." sambil menunggu respons bot
        setTimeout(() => {
        setChatHistory((history) => [
            ...history,
            { role: "model", text: "Merespon..." },
        ]);
    
        // Panggil generateBotResponse dengan riwayat chat terbaru
        generateBotResponse([
            ...chatHistory,
            { role: "user", text: userMessage },
        ]);
        }, 600);
    };

    return (
        <form action='#' className='chat-form' onSubmit={handleFormSubmit}>
            <input type='text' ref={inputRef} placeholder='Tanya sesuatu...' className='message-input' required/>
            <button>
            <GoChevronUp className='send-chat'/>
            </button>
        </form>
    )
}

export default ChatbotForm
