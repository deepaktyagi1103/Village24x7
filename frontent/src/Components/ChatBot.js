import React, { useState, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "../Components/botchat/ActionProvider";
import MessageParser from "../Components/botchat/MessageParser";
import config from "../Components/botchat/config";
import { TbMessageChatbot } from "react-icons/tb";
import { cn } from "../lib/utils";
import { GiCrossMark } from "react-icons/gi";


const ChatBotComponent = () => {
  const [showChat, setShowChat] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .react-chatbot-kit-chat-container {
        width: 350px !important;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      
      .react-chatbot-kit-chat-header {
        background: rgba(34, 197, 94, 0.8); /* Green Header */
        backdrop-filter: blur(10px);
        padding: 14px 20px;
        color: white;
        font-weight: 600;
        font-size: 15px;
        text-align: center;
        border-bottom: 2px solid rgba(255, 255, 255, 0.2);
      }
      
      .react-chatbot-kit-chat-message-container {
        background: #f8fdf8;
        height: 380px !important;
        overflow-y: auto;
      }
      
      .react-chatbot-kit-chat-bot-message {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        margin: 12px;
        padding: 12px 16px;
        font-size: 14px;
        color: #333;
        border: 1px solid rgba(0, 0, 0, 0.04);
      }
      
      .react-chatbot-kit-user-chat-message {
        background: linear-gradient(135deg, #34D399, #059669);
        border-radius: 12px;
        color: white;
        font-size: 14px;
        margin: 12px;
        padding: 12px 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      .react-chatbot-kit-chat-btn-send {
        background: #34D399;
        border-radius: 20px;
        padding: 8px 16px;
        transition: all 0.3s ease;
      }
      
      .react-chatbot-kit-chat-btn-send:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleChat = () => {
    if (showChat) {
      setAnimateIn(false);
      setTimeout(() => setShowChat(false), 300);
    } else {
      setShowChat(true);
      setTimeout(() => setAnimateIn(true), 10);
    }
  };

  return (
    <div>
      {showChat && (
        <div 
          className={cn(
            "fixed bottom-20 right-6 z-50 transform transition-all duration-300 ease-out",
            animateIn ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
          )}
        >
          <div className="relative bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl">
            <button 
              className="absolute -top-3 -right-3 bg-gray-100/80 backdrop-blur-md p-1.5 rounded-full text-gray-700 hover:text-gray-900 hover:bg-white/90 transition-all border border-gray-200 shadow-sm z-10"
              onClick={toggleChat}
              aria-label="Close chatbot"
            >
              <GiCrossMark size={18} strokeWidth={2.5} />
              {/* <X size={18} strokeWidth={2.5} /> */}
            </button>
            <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
          </div>
        </div>
      )}
      
      <button
        className={cn(
          "fixed bottom-5 right-5 flex items-center justify-center text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50",
          "bg-green-500 hover:bg-green-600 hover:shadow-2xl",
          "transform hover:scale-105 active:scale-95"
        )}
        onClick={toggleChat}
        aria-label="Open chatbot"
      >
        <TbMessageChatbot size={24} />
      </button>
    </div>
  );
};

export default ChatBotComponent;
