import React from 'react';
import './Links.css';

const Links = () => {
  const socialLinks = [
    { name: 'Twitch', icon: 'fab fa-twitch', url: 'https://m.twitch.tv/pedromartss007/home', color: '#6441a5' },
    { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://youtube.com/@pmartss007?si=LfoNWSUMwOJKkZ-j', color: '#ff0000' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://x.com/pedromartss007?s=21', color: '#1da1f2' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/pedromartss007?igsh=MXRkaGJid3JiNjlqMQ%3D%3D&utm_source=qr', color: '#e1306c' },
    { name: 'Discord', icon: 'fab fa-discord', url: 'https://discord.gg/R5jmaFKK', color: '#7289da' },
    { name: 'TikTok', icon: 'fab fa-tiktok', url: 'https://www.tiktok.com/@pmartss007?_r=1&_t=ZS-936Gi1dWANA', color: '#000000' },
    { name: 'Reddit', icon: 'fab fa-reddit', url: 'https://www.reddit.com/u/InitiativeWaste5143/s/OkBPtdyVH3', color: '#ff4500' },
    { name: 'Steam', icon: 'fab fa-steam', url: 'https://steamcommunity.com/profiles/76561198820525634/', color: '#171a21' },
  ];

  const quickLinks = [
    { name: 'Doação', icon: 'fas fa-heart', description: 'Apoie o canal', action: () => window.open('https://streamlabs.com/donate', '_blank') },
    { name: 'Loja', icon: 'fas fa-shopping-bag', description: 'Produtos exclusivos', action: () => alert('Em breve!') },
    { name: 'Clipes', icon: 'fas fa-film', description: 'Melhores momentos', action: () => window.open('https://twitch.tv/pedromartss007/clips', '_blank') },
    { name: 'Comandos', icon: 'fas fa-terminal', description: 'Comandos do bot', action: () => alert('Digite !comandos no chat') },
  ];

  const handleCommunityClick = () => {
    window.open('https://discord.gg/R5jmaFKK', '_blank');
  };

  return (
    <section className="links" id="links">
      <h2 className="section-title">Links <span>Importantes</span></h2>
      
      <div className="links-container">
        <div className="social-links">
          <h3>Redes Sociais</h3>
          <p className="section-description">Siga-me em outras plataformas para mais conteúdo!</p>
          
          <div className="social-grid">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-card"
                style={{ '--color': link.color }}
              >
                <div className="social-icon">
                  <i className={link.icon}></i>
                </div>
                <div className="social-name">{link.name}</div>
                <div className="social-hover">
                  <i className="fas fa-external-link-alt"></i>
                </div>
                <div className="social-glow"></div>
              </a>
            ))}
          </div>
        </div>
        
        <div className="quick-links">
          <h3>Acesso Rápido</h3>
          <p className="section-description">Links úteis para a comunidade</p>
          
          <div className="quick-grid">
            {quickLinks.map((link, index) => (
              <div key={index} className="quick-card">
                <div className="quick-icon">
                  <i className={link.icon}></i>
                </div>
                <div className="quick-info">
                  <h4>{link.name}</h4>
                  <p>{link.description}</p>
                </div>
                <button className="quick-action" onClick={link.action}>
                  <i className="fas fa-arrow-right"></i>
                </button>
                <div className="quick-wave"></div>
              </div>
            ))}
          </div>
          
          <div className="community-highlight">
            <div className="highlight-content">
              <h4>Comunidade Ativa</h4>
              <p>Junte-se a outros fãs e participe de eventos exclusivos!</p>
            </div>
            <button className="highlight-btn" onClick={handleCommunityClick}>
              Entrar na Comunidade
            </button>
          </div>
        </div>
      </div>
      
      <div className="links-background">
        <div className="link-orb orb-1"></div>
        <div className="link-orb orb-2"></div>
        <div className="link-orb orb-3"></div>
      </div>
    </section>
  );
};

export default Links;
