import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-icon">
            <i className="fas fa-gamepad"></i>
            <div className="logo-pulse"></div>
          </div>
          <h1 className="logo-text">Meu Canal <span>Twitch</span></h1>
        </div>
        
        <nav className="nav">
          <ul>
            <li><a href="#sobre"><i className="fas fa-user"></i> Sobre</a></li>
            <li><a href="#programacao"><i className="fas fa-calendar-alt"></i> Programação</a></li>
            <li><a href="#links"><i className="fas fa-link"></i> Links</a></li>
            <li><a href="#regras"><i className="fas fa-scroll"></i> Regras</a></li>
          </ul>
        </nav>
        
        <button className="live-indicator">
          <span className="live-pulse"></span>
          <i className="fas fa-circle"></i>
          <span>AO VIVO</span>
        </button>
      </div>
      
      <div className="header-background">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>
    </header>
  );
};

export default Header;