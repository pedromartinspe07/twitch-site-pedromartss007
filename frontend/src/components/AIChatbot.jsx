import React, { useState, useEffect, useRef } from 'react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "Qual o horário das streams?",
    "Quais jogos você joga?",
    "Como entrar no Discord?",
    "Quais são as regras do chat?"
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mensagem inicial quando abre
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "👋 Olá! Eu sou o assistente de IA do canal **pedromartss007**! Posso te ajudar com informações sobre horários, jogos, regras e muito mais! 😊",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isOpen]);

  const sendMessage = async (message = input) => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Em produção, substituir por sua URL do backend
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          context: {
            is_first_message: messages.filter(m => m.sender === 'user').length === 0
          }
        })
      });

      const data = await response.json();

      if (data.success) {
        const botMessage = {
          id: messages.length + 2,
          text: data.response,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: data.suggestions || [],
          type: data.type || 'text'
        };

        setMessages(prev => [...prev, botMessage]);
        
        // Atualizar sugestões
        if (data.suggestions && data.suggestions.length > 0) {
          setSuggestions(data.suggestions);
        }
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Desculpe, estou tendo problemas para me conectar ao servidor. 😔 Aqui estão algumas informações do canal:\n\n📅 **Streams:** Seg-Sex 19h-22h\n🎮 **Jogos:** Valorant, Minecraft, Fortnite\n👥 **Discord:** https://discord.gg/R5jmaFKK",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getChannelStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/channel/stats');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return null;
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <button 
        className="ai-chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir assistente de IA"
      >
        {isOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <div className="ai-icon">
            <i className="fas fa-robot"></i>
            <span className="ai-pulse"></span>
          </div>
        )}
      </button>

      {/* Chatbot */}
      {isOpen && (
        <div className="ai-chatbot-container">
          <div className="ai-chatbot-header">
            <div className="ai-header-content">
              <div className="ai-avatar">
                <i className="fas fa-robot"></i>
                <div className="ai-status"></div>
              </div>
              <div className="ai-info">
                <h3>Assistente IA - pedromartss007</h3>
                <p>Online • Inteligência especializada no canal</p>
              </div>
            </div>
            <button 
              className="ai-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="ai-chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ai-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <div className="message-text">
                    {msg.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="message-timestamp">{msg.timestamp}</div>
                </div>
                
                {msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="message-suggestions">
                    <p className="suggestions-label">Talvez você queira saber:</p>
                    <div className="suggestions-grid">
                      {msg.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="suggestion-btn"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="ai-message bot-message">
                <div className="message-content">
                  <div className="message-text">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chatbot-suggestions">
            <p className="suggestions-title">Perguntas rápidas:</p>
            <div className="quick-suggestions">
              {suggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  className="quick-suggestion-btn"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="ai-chatbot-input">
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pergunte sobre horários, jogos, regras..."
                disabled={isLoading}
              />
              <button
                className="send-btn"
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <p className="input-hint">
              Pergunte sobre o canal! Ex: "Qual jogo você mais joga?", "Quando é a próxima stream?"
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
