import React from 'react';
import './Rules.css';

const Rules = () => {
  const rules = [
    { 
      title: "Respeito é obrigatório", 
      description: "Não serão tolerados xingamentos, ameaças, assédio ou discurso de ódio.",
      icon: "fas fa-handshake"
    },
    { 
      title: "Sem preconceito", 
      description: "Racismo, machismo, homofobia, xenofobia ou qualquer forma de discriminação é proibida.",
      icon: "fas fa-ban"
    },
    { 
      title: "Nada de spam", 
      description: "Não divulgue links, redes sociais ou outros canais sem permissão da moderação.",
      icon: "fas fa-exclamation-circle"
    },
    { 
      title: "Conteúdo NSFW é proibido", 
      description: "Sem pornografia, gore ou qualquer material impróprio.",
      icon: "fas fa-eye-slash"
    },
    { 
      title: "Sem política ou religião", 
      description: "Evite discussões políticas, ideológicas ou religiosas.",
      icon: "fas fa-comment-slash"
    },
    { 
      title: "Sem spoilers", 
      description: "Não estrague a experiência de jogos, séries ou filmes.",
      icon: "fas fa-surprise"
    },
    { 
      title: "Respeite a moderação", 
      description: "Decisões dos moderadores devem ser respeitadas.",
      icon: "fas fa-user-shield"
    },
    { 
      title: "Nada de CAPS LOCK excessivo ou flood", 
      description: "Mensagens em caixa alta ou repetitivas não são permitidas.",
      icon: "fas fa-keyboard"
    },
    { 
      title: "Atividades ilegais", 
      description: "Proibido incentivo a qualquer atividade ilegal.",
      icon: "fas fa-gavel"
    },
    { 
      title: "Use o bom senso", 
      description: "Se algo pode causar desconforto, provavelmente não é apropriado.",
      icon: "fas fa-brain"
    },
  ];

  const handleDownloadPDF = () => {
    // Em um ambiente real, isso faria o download do PDF
    // Aqui é apenas uma simulação
    alert("PDF das regras seria baixado. Em um site real, você deve colocar o arquivo PDF na pasta public/ e atualizar o link.");
  };

  return (
    <section className="rules" id="regras">
      <h2 className="section-title">Regras do <span>Canal</span></h2>
      <p className="section-subtitle">
        Para manter um ambiente saudável, divertido e respeitoso para todos. 
        O descumprimento pode resultar em timeout ou banimento.
      </p>
      
      <div className="rules-container">
        <div className="rules-content">
          <div className="rules-intro">
            <div className="rules-icon-main">
              <i className="fas fa-scroll"></i>
            </div>
            <h3>Regras Oficiais do Canal na Twitch</h3>
            <p>
              Bem-vindo(a) ao canal! Para manter um ambiente saudável, divertido e respeitoso para todos, é
              obrigatório seguir as regras abaixo. As regras podem ser atualizadas a qualquer momento sem aviso prévio.
              Ao participar do chat, você concorda automaticamente com todas elas.
            </p>
            <div className="rules-actions">
              <button className="rules-btn primary" onClick={handleDownloadPDF}>
                <i className="fas fa-download"></i> Baixar Regras (PDF)
              </button>
              <button className="rules-btn secondary">
                <i className="fas fa-check-circle"></i> Li e Concordo
              </button>
            </div>
          </div>
          
          <div className="rules-grid">
            {rules.map((rule, index) => (
              <div 
                key={index} 
                className="rule-card"
                style={{ '--delay': `${index * 0.05}s` }}
              >
                <div className="rule-number">{index + 1}</div>
                <div className="rule-icon">
                  <i className={rule.icon}></i>
                </div>
                <div className="rule-content">
                  <h4>{rule.title}</h4>
                  <p>{rule.description}</p>
                </div>
                <div className="rule-glow"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rules-sidebar">
          <div className="sidebar-card">
            <h4>Observações Importantes</h4>
            <ul>
              <li>
                <i className="fas fa-exclamation-triangle"></i>
                <span>As regras podem ser atualizadas a qualquer momento sem aviso prévio.</span>
              </li>
              <li>
                <i className="fas fa-user-check"></i>
                <span>Ao participar do chat, você concorda automaticamente com todas as regras.</span>
              </li>
              <li>
                <i className="fas fa-gavel"></i>
                <span>Decisões da moderação são finais e devem ser respeitadas.</span>
              </li>
              <li>
                <i className="fas fa-laugh-beam"></i>
                <span>Divirta-se, respeite todos e aproveite a live!</span>
              </li>
            </ul>
            
            <div className="moderation-info">
              <h5>Moderação do Canal</h5>
              <p>
                Em caso de dúvidas ou problemas, contate um moderador diretamente no chat 
                ou através do Discord da comunidade.
              </p>
              <button className="moderation-btn">
                <i className="fab fa-discord"></i> Discord da Comunidade
              </button>
            </div>
          </div>
          
          <div className="sidebar-card warning">
            <div className="warning-header">
              <i className="fas fa-exclamation-circle"></i>
              <h4>Consequências</h4>
            </div>
            <div className="warning-content">
              <div className="consequence">
                <div className="consequence-level timeout">Timeout</div>
                <p>Para infrações menores ou primeiras ofensas</p>
              </div>
              <div className="consequence">
                <div className="consequence-level ban">Banimento</div>
                <p>Para infrações graves ou reincidências</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rules-background">
        <div className="rules-abstract abstract-1"></div>
        <div className="rules-abstract abstract-2"></div>
        <div className="rules-abstract abstract-3"></div>
      </div>
    </section>
  );
};

export default Rules;
