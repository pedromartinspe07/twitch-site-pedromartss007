import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <div className="hero-text">
          <h2 className="hero-title">
            Bem-vindo ao <span className="gradient-text">meu universo</span>
          </h2>
          <p className="hero-subtitle">
            Transmissões de jogos, diversão e muita interação com a comunidade!
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-icon"><i className="fas fa-users"></i></div>
              <div className="stat-info">
                <h3>5.2K</h3>
                <p>Seguidores</p>
              </div>
            </div>
            <div className="stat">
              <div className="stat-icon"><i className="fas fa-video"></i></div>
              <div className="stat-info">
                <h3>120+</h3>
                <p>Streams</p>
              </div>
            </div>
            <div className="stat">
              <div className="stat-icon"><i className="fas fa-heart"></i></div>
              <div className="stat-info">
                <h3>98%</h3>
                <p>Avaliação Positiva</p>
              </div>
            </div>
          </div>
          <div className="hero-buttons">
            <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <i className="fab fa-twitch"></i> Assistir Agora
            </a>
            <a href="#sobre" className="btn btn-secondary">
              <i className="fas fa-info-circle"></i> Conheça Mais
            </a>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="floating-objects">
            <div className="object object-1">
              <i className="fas fa-cloud"></i>
            </div>
            <div className="object object-2">
              <i className="fas fa-gamepad"></i>
            </div>
            <div className="object object-3">
              <i className="fas fa-star"></i>
            </div>
            <div className="object object-4">
              <i className="fas fa-comment"></i>
            </div>
          </div>
          <div className="avatar-container">
            <div className="avatar-frame">
              <div className="avatar">
                <i className="fas fa-user-astronaut"></i>
              </div>
              <div className="avatar-glow"></div>
            </div>
            <div className="avatar-platform"></div>
          </div>
        </div>
      </div>
      
      <div className="hero-background">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
      </div>
    </section>
  );
};

export default Hero;