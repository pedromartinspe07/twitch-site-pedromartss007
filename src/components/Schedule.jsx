import React from 'react';
import './Schedule.css';

const Schedule = () => {
  const scheduleData = [
    { day: 'Segunda', time: '19:00 - 22:00', game: 'Valorant', icon: 'fas fa-crosshairs' },
    { day: 'Terça', time: '20:00 - 23:00', game: 'Minecraft', icon: 'fas fa-cube' },
    { day: 'Quarta', time: '18:00 - 21:00', game: 'Fortnite', icon: 'fas fa-skull-crossbones' },
    { day: 'Quinta', time: '19:00 - 22:00', game: 'Jogos Indies', icon: 'fas fa-gamepad' },
    { day: 'Sexta', time: '20:00 - 00:00', game: 'Variedades', icon: 'fas fa-random' },
    { day: 'Sábado', time: '15:00 - 19:00', game: 'Especial da Semana', icon: 'fas fa-star' },
    { day: 'Domingo', time: 'Descanso', game: 'Offline', icon: 'fas fa-moon', inactive: true },
  ];

  return (
    <section className="schedule" id="programacao">
      <h2 className="section-title">Programação <span>Semanal</span></h2>
      <p className="section-subtitle">Confira os horários das lives e planeje sua participação!</p>
      
      <div className="schedule-container">
        <div className="timeline">
          <div className="timeline-line"></div>
          {scheduleData.map((item, index) => (
            <div 
              key={index} 
              className={`schedule-item ${item.inactive ? 'inactive' : ''}`}
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <div className="schedule-marker">
                <div className="marker-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="marker-glow"></div>
              </div>
              
              <div className="schedule-content">
                <div className="schedule-day">{item.day}</div>
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-game">{item.game}</div>
                {!item.inactive && (
                  <div className="schedule-status">
                    <span className="live-dot"></span>
                    AO VIVO
                  </div>
                )}
              </div>
              
              {!item.inactive && (
                <div className="schedule-hover">
                  <p>Clique para receber lembrete!</p>
                  <button className="reminder-btn">
                    <i className="fas fa-bell"></i> Lembrete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="current-stream">
          <div className="current-header">
            <h3>Próxima Live</h3>
            <div className="countdown">
              <i className="fas fa-clock"></i>
              <span>Em 2 horas</span>
            </div>
          </div>
          
          <div className="current-content">
            <div className="current-game">
              <div className="game-icon">
                <i className="fas fa-crosshairs"></i>
              </div>
              <div className="game-info">
                <h4>Valorant</h4>
                <p>Competitivo com viewers</p>
              </div>
            </div>
            
            <div className="current-details">
              <div className="detail">
                <i className="fas fa-calendar"></i>
                <span>Segunda-feira</span>
              </div>
              <div className="detail">
                <i className="fas fa-clock"></i>
                <span>19:00 - 22:00</span>
              </div>
              <div className="detail">
                <i className="fas fa-users"></i>
                <span>+50 participantes</span>
              </div>
            </div>
            
            <button className="watch-btn">
              <i className="fab fa-twitch"></i>
              Assistir Agora
            </button>
          </div>
          
          <div className="current-background">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;