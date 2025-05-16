import React, { useState } from "react";
import "./ChatBot.css";
import axios from "axios";

function ChatBot() {
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me for an anime recommendation!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getRecommendation = async (description) => {
    try {
      const response = await axios.post(`${FASTAPI_URL}/inquiries/`, {
        description: description,
      });

      console.log("API Response:", response.data);
      return response.data.recommendation;
    } catch (error) {
      console.error("API Request Failed:", error);
      return "Sorry, something went wrong.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);

    const recommendation = await getRecommendation(input);

    setMessages((prev) => [...prev, { sender: "bot", text: recommendation }]);
    setInput("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="page-container">
      <div className="chatbot-container">
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message fs-3 ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="fs-3 message bot">Typing...</div>}
        </div>
        <div className="input-area fs-3">
          <input
            className="fs-3"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me something..."
          />
          <button onClick={handleSend} className="fs-3">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
