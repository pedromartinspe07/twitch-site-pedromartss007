import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Schedule from './components/Schedule';
import Links from './components/Links';
import Rules from './components/Rules';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');

  // Verificar status do backend da IA
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          setBackendStatus('connected');
          console.log('✅ Backend da IA conectado!');
        } else {
          setBackendStatus('error');
          console.log('⚠️ Backend da IA com problemas');
        }
      } catch (error) {
        setBackendStatus('disconnected');
        console.log('❌ Backend da IA desconectado. Execute: python app.py na pasta backend/');
      }
    };

    checkBackendStatus();

    // Mostrar notificação após 3 segundos
    const timer = setTimeout(() => {
      setShowNotification(true);
      
      // Auto-esconder após 10 segundos
      setTimeout(() => {
        setShowNotification(false);
      }, 10000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Verificar se é a primeira visita
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedTwitchSite');
    
    if (!hasVisitedBefore) {
      localStorage.setItem('hasVisitedTwitchSite', 'true');
      
      // Mostrar mensagem de boas-vindas após 5 segundos
      setTimeout(() => {
        alert('🎮 Bem-vindo ao site do canal pedromartss007! 🎯\n\nExplore todas as seções e não deixe de conversar com nosso assistente de IA no canto inferior direito! 🤖');
      }, 5000);
    }
  }, []);

  // Efeito de partículas no background
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Posição aleatória
      const left = Math.random() * 100;
      const size = Math.random() * 20 + 5;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      particle.style.left = `${left}vw`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      // Escolher cor aleatória do tema Frutiger Aero
      const colors = [
        'rgba(168, 230, 207, 0.3)',
        'rgba(220, 237, 193, 0.3)',
        'rgba(255, 211, 182, 0.3)',
        'rgba(255, 170, 165, 0.3)',
        'rgba(255, 139, 148, 0.3)',
        'rgba(92, 219, 149, 0.3)',
        'rgba(55, 150, 131, 0.3)'
      ];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      document.querySelector('.particles-container')?.appendChild(particle);
      
      // Remover após animação
      setTimeout(() => {
        particle.remove();
      }, (duration + delay) * 1000);
    };

    // Criar partículas periodicamente
    const particleInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance de criar partícula
        createParticle();
      }
    }, 1000);

    return () => clearInterval(particleInterval);
  }, []);

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <div className="app">
      {/* Container de partículas de background */}
      <div className="particles-container"></div>
      
      {/* Notificação flutuante */}
      {showNotification && (
        <div className="ai-notification">
          <div className="notification-content">
            <div className="notification-icon">
              <i className="fas fa-robot"></i>
            </div>
            <div className="notification-text">
              <h4>Assistente de IA Disponível! 🤖</h4>
              <p>Converse com nosso assistente especializado no canal pedromartss007!</p>
            </div>
            <button className="notification-close" onClick={handleNotificationClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="notification-progress"></div>
        </div>
      )}
      
      {/* Indicador de status do backend */}
      {backendStatus !== 'connected' && (
        <div className={`backend-status ${backendStatus}`}>
          <i className="fas fa-server"></i>
          <span>
            {backendStatus === 'checking' && 'Verificando backend da IA...'}
            {backendStatus === 'disconnected' && 'Backend da IA desconectado'}
            {backendStatus === 'error' && 'Backend da IA com problemas'}
          </span>
          {backendStatus === 'disconnected' && (
            <button 
              className="status-help-btn"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              Como configurar
            </button>
          )}
        </div>
      )}
      
      <Header />
      
      <main>
        {/* Banner de IA */}
        <div className="ai-banner">
          <div className="ai-banner-content">
            <div className="ai-banner-icon">
              <i className="fas fa-brain"></i>
              <div className="ai-banner-glow"></div>
            </div>
            <div className="ai-banner-text">
              <h3>Assistente de IA do Canal 🚀</h3>
              <p>Converse com nossa IA especializada! Ela sabe TUDO sobre horários, jogos, regras e muito mais!</p>
            </div>
            <button 
              className="ai-banner-btn"
              onClick={() => {
                const chatbotBtn = document.querySelector('.ai-chatbot-toggle');
                if (chatbotBtn) chatbotBtn.click();
              }}
            >
              <i className="fas fa-comments"></i> Experimentar Agora
            </button>
          </div>
          <div className="ai-banner-waves">
            <div className="ai-wave"></div>
            <div className="ai-wave"></div>
          </div>
        </div>
        
        <Hero />
        <About />
        <Schedule />
        <Links />
        <Rules />
        
        {/* Seção sobre a IA */}
        <section className="ai-features">
          <h2 className="section-title">Assistente de IA <span>Inteligente</span></h2>
          <p className="section-subtitle">Conheça todas as capacidades do nosso assistente especializado no canal</p>
          
          <div className="ai-features-grid">
            <div className="ai-feature-card">
              <div className="ai-feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h4>Horários em Tempo Real</h4>
              <p>Sabe exatamente quando será a próxima stream e te avisa de qualquer mudança!</p>
            </div>
            
            <div className="ai-feature-card">
              <div className="ai-feature-icon">
                <i className="fas fa-gamepad"></i>
              </div>
              <h4>Especialista em Jogos</h4>
              <p>Domina todos os jogos do canal: Valorant, Minecraft, Fortnite e muito mais!</p>
            </div>
            
            <div className="ai-feature-card">
              <div className="ai-feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h4>Conhece a Comunidade</h4>
              <p>Sabe tudo sobre a comunidade, eventos especiais e como participar!</p>
            </div>
            
            <div className="ai-feature-card">
              <div className="ai-feature-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h4>Dicas Personalizadas</h4>
              <p>Oferece dicas específicas sobre jogos e streaming baseadas no seu interesse!</p>
            </div>
            
            <div className="ai-feature-card">
              <div className="ai-feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h4>Análise de Dados</h4>
              <p>Analisa estatísticas do canal e oferece insights valiosos!</p>
            </div>
            
            <div className="ai-feature-card">
              <div className="ai-feature-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h4>Conversa Natural</h4>
              <p>Conversa de forma natural e humana, entendendo contexto e intenções!</p>
            </div>
          </div>
          
          <div className="ai-cta">
            <h3>Experimente Agora!</h3>
            <p>Clique no robô no canto inferior direito para começar a conversar!</p>
            <div className="ai-cta-buttons">
              <button 
                className="cta-btn primary"
                onClick={() => {
                  const chatbotBtn = document.querySelector('.ai-chatbot-toggle');
                  if (chatbotBtn) chatbotBtn.click();
                }}
              >
                <i className="fas fa-robot"></i> Falar com a IA
              </button>
              <button 
                className="cta-btn secondary"
                onClick={() => {
                  const rulesSection = document.getElementById('regras');
                  if (rulesSection) rulesSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fas fa-scroll"></i> Ver Regras do Canal
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <AIChatbot />
    </div>
  );
}

export default App;
