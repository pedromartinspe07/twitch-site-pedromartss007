import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about" id="sobre">
      <h2 className="section-title">Sobre <span>Mim</span></h2>
      
      <div className="about-content">
        <div className="about-text">
          <div className="about-card">
            <h3>Quem sou eu?</h3>
            <p>
              Sou um streamer apaixonado por jogos e criação de conteúdo. Minhas lives são focadas em 
              diversão, interação com a comunidade e momentos memoráveis. Adoro jogos de todos os tipos, 
              desde indies até os grandes lançamentos.
            </p>
            <p>
              Meu objetivo é criar um espaço acolhedor onde todos possam se divertir, fazer amigos e 
              compartilhar momentos incríveis juntos.
            </p>
          </div>
          
          <div className="about-card">
            <h3>Conteúdo das Lives</h3>
            <div className="content-list">
              <div className="content-item">
                <div className="content-icon">
                  <i className="fas fa-gamepad"></i>
                </div>
                <div className="content-info">
                  <h4>Gameplay Variado</h4>
                  <p>Jogos desde RPGs até FPS, sempre com muita interação</p>
                </div>
              </div>
              
              <div className="content-item">
                <div className="content-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="content-info">
                  <h4>Comunidade Ativa</h4>
                  <p>Chat sempre participativo e eventos especiais para viewers</p>
                </div>
              </div>
              
              <div className="content-item">
                <div className="content-icon">
                  <i className="fas fa-laugh-beam"></i>
                </div>
                <div className="content-info">
                  <h4>Humor e Diversão</h4>
                  <p>Ambiente descontraído e cheio de momentos engraçados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-visual">
          <div className="visual-container">
            <div className="surreal-element surreal-1">
              <i className="fas fa-cloud"></i>
            </div>
            <div className="surreal-element surreal-2">
              <i className="fas fa-meteor"></i>
            </div>
            <div className="surreal-element surreal-3">
              <i className="fas fa-satellite"></i>
            </div>
            
            <div className="about-image">
              <div className="image-frame">
                <div className="image-content">
                  <i className="fas fa-video"></i>
                  <div className="image-text">AO VIVO</div>
                </div>
                <div className="image-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
