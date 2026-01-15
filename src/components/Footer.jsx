import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <div className="logo-icon">
              <i className="fas fa-gamepad"></i>
            </div>
            <h3>Meu Canal <span>Twitch</span></h3>
          </div>
          <p className="footer-description">
            Transmissões de jogos, diversão e muita interação com a comunidade. 
            Junte-se a nós para momentos incríveis!
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon">
              <i className="fab fa-twitch"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-discord"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Links Rápidos</h4>
          <ul className="footer-links">
            <li><a href="#inicio"><i className="fas fa-home"></i> Início</a></li>
            <li><a href="#sobre"><i className="fas fa-user"></i> Sobre</a></li>
            <li><a href="#programacao"><i className="fas fa-calendar-alt"></i> Programação</a></li>
            <li><a href="#links"><i className="fas fa-link"></i> Links</a></li>
            <li><a href="#regras"><i className="fas fa-scroll"></i> Regras</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Informações</h4>
          <ul className="footer-info">
            <li>
              <i className="fas fa-clock"></i>
              <span>Horário das lives: Seg-Sex 19h-22h</span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>contato@meucanaltwitch.com</span>
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>Transmitindo do Brasil</span>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Inscreva-se</h4>
          <p className="footer-newsletter">
            Receba notificações sobre as próximas lives e novidades!
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Seu e-mail" />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Meu Canal Twitch. Todos os direitos reservados.</p>
          <p>Este site não é afiliado à Twitch. Twitch é uma marca registrada da Twitch Interactive, Inc.</p>
        </div>
        
        <div className="footer-background">
          <div className="footer-bubble bubble-1"></div>
          <div className="footer-bubble bubble-2"></div>
          <div className="footer-bubble bubble-3"></div>
          <div className="footer-wave"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;