import json
import re
from datetime import datetime
from typing import Dict, List, Any
import requests

class TwitchAnalyzer:
    def __init__(self):
        self.knowledge_base = self._load_knowledge_base()
    
    def _load_knowledge_base(self) -> Dict:
        """Carrega base de conhecimento sobre o canal"""
        return {
            "about_channel": {
                "name": "pedromartss007",
                "owner": "Pedro Martss",
                "content_focus": "Gameplay variado com ênfase em FPS e jogos multiplayer",
                "stream_style": "Interativo, humorístico e descontraído",
                "community_description": "Comunidade ativa e engajada que participa das decisões do stream"
            },
            "frequent_topics": [
                "Valorant dicas e estratégias",
                "Minecraft construções criativas",
                "Fortnite gameplay competitivo",
                "Novos lançamentos de jogos",
                "Setup de stream e equipamentos",
                "Interação com viewers"
            ],
            "common_questions": {
                "horario": "Quais são os horários das streams?",
                "jogos": "Quais jogos você mais joga?",
                "doacoes": "Como fazer doações?",
                "regras": "Quais são as regras do chat?",
                "discord": "Como entrar no Discord?",
                "especiais": "Você faz streams especiais?"
            },
            "personality_traits": [
                "Bem humorado",
                "Interativo com o chat",
                "Paciente com viewers novos",
                "Competitivo nos jogos",
                "Transparente com a comunidade"
            ]
        }
    
    def analyze_question(self, question: str) -> Dict[str, Any]:
        """Analisa a pergunta do usuário e determina o tipo"""
        question_lower = question.lower()
        
        # Mapeamento de palavras-chave para tipos de pergunta
        keyword_mapping = {
            "horário": "schedule",
            "horario": "schedule",
            "quando": "schedule",
            "dia": "schedule",
            "hora": "schedule",
            "stream": "schedule",
            "live": "schedule",
            
            "jogo": "games",
            "jogar": "games",
            "valorant": "games",
            "minecraft": "games",
            "fortnite": "games",
            "cs": "games",
            "fps": "games",
            
            "doar": "donations",
            "doação": "donations",
            "doacoes": "donations",
            "apoio": "donations",
            "sub": "donations",
            "bits": "donations",
            
            "regra": "rules",
            "proibido": "rules",
            "pode": "rules",
            "chat": "rules",
            
            "discord": "community",
            "comunidade": "community",
            "grupo": "community",
            "amigos": "community",
            
            "setup": "technical",
            "pc": "technical",
            "equipamento": "technical",
            "microfone": "technical",
            "câmera": "technical",
            
            "sobre": "about",
            "quem": "about",
            "canal": "about",
            "iniciou": "about",
            
            "dica": "tips",
            "ajuda": "tips",
            "como": "tips",
            "melhorar": "tips",
            
            "especial": "events",
            "evento": "events",
            "torneio": "events",
            "maratona": "events"
        }
        
        # Determinar tipo de pergunta
        question_type = "general"
        for keyword, q_type in keyword_mapping.items():
            if keyword in question_lower:
                question_type = q_type
                break
        
        return {
            "type": question_type,
            "keywords": self._extract_keywords(question),
            "intent": self._determine_intent(question)
        }
    
    def _extract_keywords(self, text: str) -> List[str]:
        """Extrai palavras-chave do texto"""
        # Remove palavras comuns
        common_words = {"o", "a", "os", "as", "de", "do", "da", "dos", "das", 
                       "em", "no", "na", "nos", "nas", "por", "para", "com",
                       "que", "é", "são", "um", "uma", "uns", "umas", "seu",
                       "sua", "seus", "suas", "meu", "minha", "meus", "minhas"}
        
        words = re.findall(r'\b\w+\b', text.lower())
        keywords = [word for word in words if word not in common_words and len(word) > 2]
        
        return list(set(keywords))[:10]
    
    def _determine_intent(self, question: str) -> str:
        """Determina a intenção por trás da pergunta"""
        question_lower = question.lower()
        
        intents = {
            "information": ["qual", "quando", "onde", "como", "quem", "o que", "que horas"],
            "confirmation": ["é verdade", "você joga", "tem", "faz", "pode"],
            "recommendation": ["recomenda", "sugere", "melhor", "prefere"],
            "explanation": ["por que", "como funciona", "explica", "significa"],
            "comparison": ["vs", "versus", "comparado", "diferença"],
            "history": ["começou", "iniciou", "desde quando", "história"]
        }
        
        for intent, triggers in intents.items():
            for trigger in triggers:
                if trigger in question_lower:
                    return intent
        
        return "general_inquiry"
    
    def generate_response(self, question_type: str, keywords: List[str], intent: str) -> Dict:
        """Gera resposta baseada no tipo de pergunta"""
        
        responses = {
            "schedule": self._get_schedule_response(),
            "games": self._get_games_response(keywords),
            "donations": self._get_donations_response(),
            "rules": self._get_rules_response(),
            "community": self._get_community_response(),
            "technical": self._get_technical_response(),
            "about": self._get_about_response(),
            "tips": self._get_tips_response(keywords),
            "events": self._get_events_response(),
            "general": self._get_general_response(keywords)
        }
        
        return responses.get(question_type, responses["general"])
    
    def _get_schedule_response(self) -> Dict:
        return {
            "answer": "📅 **Horário das Streams:**\n\n" +
                     "• **Segunda:** 19:00-22:00 - Valorant\n" +
                     "• **Terça:** 20:00-23:00 - Minecraft\n" +
                     "• **Quarta:** 18:00-21:00 - Fortnite\n" +
                     "• **Quinta:** 19:00-22:00 - Jogos Indies\n" +
                     "• **Sexta:** 20:00-00:00 - Variedades\n" +
                     "• **Sábado:** 15:00-19:00 - Especial da Semana\n" +
                     "• **Domingo:** Descanso\n\n" +
                     "Os horários podem variar, então é sempre bom seguir nas redes sociais para atualizações! 🎮",
            "suggestions": ["Próxima stream", "Jogos que mais jogo", "Streams especiais"],
            "type": "schedule"
        }
    
    def _get_games_response(self, keywords: List[str]) -> Dict:
        games_info = {
            "valorant": "🎯 **Valorant:** Jogo principal do canal! Foco em gameplay competitivo, dicas de agentes, estratégias de mapa e muito conteúdo educativo.",
            "minecraft": "⛏️ **Minecraft:** Para relaxar e ser criativo! Construções mega projetos, aventuras no modo sobrevivência e eventos com a comunidade.",
            "fortnite": "🏹 **Fortnite:** Gameplay focado em diversão e momentos engraçados. Não sou o melhor, mas me divirto muito!",
            "the finals": "💥 **The Finals:** Jogo novo que estou amando! Gameplay frenético e muito caótico - perfeito para conteúdo divertido.",
            "cs2": "🔫 **CS2:** O clássico dos FPS! Jogo principalmente para treinar aim e fazer conteúdo mais competitivo."
        }
        
        # Verificar se há jogo específico mencionado
        for keyword in keywords:
            for game, info in games_info.items():
                if game in keyword or keyword in game:
                    return {
                        "answer": info + "\n\nDica: Costumo jogar este jogo nas streams de segunda e quarta!",
                        "suggestions": ["Horário deste jogo", "Setup para jogar", "Dicas específicas"],
                        "type": "game_specific"
                    }
        
        # Resposta geral sobre jogos
        return {
            "answer": "🎮 **Jogos que mais transmito:**\n\n" +
                     "• **Valorant** (principal)\n" +
                     "• **Minecraft** (criatividade)\n" +
                     "• **Fortnite** (diversão)\n" +
                     "• **The Finals** (novidade)\n" +
                     "• **CS2** (clássico)\n\n" +
                     "Também jogo vários indies e lançamentos! Qual jogo você quer saber mais sobre?",
            "suggestions": ["Valorant", "Minecraft", "Fortnite", "The Finals", "CS2"],
            "type": "games_general"
        }
    
    def _get_donations_response(self) -> Dict:
        return {
            "answer": "❤️ **Apoie o Canal:**\n\n" +
                     "• **Twitch Bits:** Use bits no chat durante as lives\n" +
                     "• **Subs:** T1 (R$10), T2 (R$20), T3 (R$50)\n" +
                     "• **Presentes de Subs:** Presenteie subs para outros viewers\n" +
                     "• **Streamlabs:** Doações diretas via cartão/Pix\n\n" +
                     "Todo apoio é MUITO importante e ajuda a melhorar a qualidade do canal! 🙏",
            "suggestions": ["Recompensas por subs", "Como usar bits", "Metas de doação"],
            "type": "donations"
        }
    
    def _get_rules_response(self) -> Dict:
        return {
            "answer": "📜 **Regras do Chat:**\n\n" +
                     "1. **Respeito é obrigatório** - Sem xingamentos ou assédio\n" +
                     "2. **Sem preconceito** - Racismo, homofobia etc. resultam em ban\n" +
                     "3. **Nada de spam** - Links só com permissão\n" +
                     "4. **NSFW proibido** - Conteúdo impróprio não é permitido\n" +
                     "5. **Sem política/religião** - Foco nos jogos e diversão\n" +
                     "6. **Use o bom senso** - Se causar desconforto, não faça\n\n" +
                     "O objetivo é manter um ambiente saudável para todos! ✨",
            "suggestions": ["Consequências de quebrar regras", "Como reportar problemas", "Moderação"],
            "type": "rules"
        }
    
    def _get_community_response(self) -> Dict:
        return {
            "answer": "👥 **Comunidade & Discord:**\n\n" +
                     "• **Discord:** https://discord.gg/R5jmaFKK\n" +
                     "• **Canais:** #geral, #clipes, #memes, #ajuda\n" +
                     "• **Eventos:** Torneios, noites de jogos, watch parties\n" +
                     "• **Sugestões:** A comunidade ajuda a decidir jogos e eventos!\n\n" +
                     "Junte-se a nós para conversar fora das lives e participar de eventos exclusivos! 🎉",
            "suggestions": ["Regras do Discord", "Eventos recentes", "Como participar"],
            "type": "community"
        }
    
    def _get_technical_response(self) -> Dict:
        return {
            "answer": "🖥️ **Setup do Stream:**\n\n" +
                     "• **PC:** RTX 3060, Ryzen 5 5600X, 16GB RAM\n" +
                     "• **Microfone:** HyperX QuadCast\n" +
                     "• **Câmera:** Logitech C920\n" +
                     "• **Teclado:** Redragon Kumara\n" +
                     "• **Mouse:** Logitech G Pro X Superlight\n" +
                     "• **Monitor:** 144Hz 24\"\n\n" +
                     "Uso OBS Studio para streaming e Adobe Premiere para edição de clipes! 🎬",
            "suggestions": ["Configurações do OBS", "Iluminação", "Overlay do stream"],
            "type": "technical"
        }
    
    def _get_about_response(self) -> Dict:
        return {
            "answer": "ℹ️ **Sobre o Canal:**\n\n" +
                     "• **Criador:** Pedro Martss\n" +
                     "• **Início:** Março de 2022\n" +
                     "• **Foco:** Gameplay variado com interação máxima\n" +
                     "• **Estilo:** Descontraído, humorístico e educativo\n" +
                     "• **Comunidade:** +5.2K seguidores, chat ativo\n\n" +
                     "O objetivo é criar um espaço acolhedor onde todos possam curtir jogos e fazer amigos! 🤝",
            "suggestions": ["História do canal", "Metas futuras", "Conteúdo favorito"],
            "type": "about"
        }
    
    def _get_tips_response(self, keywords: List[str]) -> Dict:
        tips = {
            "valorant": "**Dicas de Valorant:**\n• Treine aim no Range\n• Aprenda callouts dos mapas\n• Jogue com diferentes agentes\n• Assista replays das suas partidas",
            "minecraft": "**Dicas de Minecraft:**\n• Sempre tenha tochas\n• Faça fazenda automática no início\n• Use elytra com fogos de artifício\n• Explore cavernas sistematicamente",
            "streaming": "**Dicas para Streamers:**\n• Interaja com o chat sempre\n• Tenha horários consistentes\n• Invista em áudio primeiro\n• Seja você mesmo!"
        }
        
        for keyword in keywords:
            if "valorant" in keyword:
                return {
                    "answer": tips["valorant"],
                    "suggestions": ["Agentes recomendados", "Crosshair settings", "Estratégias por mapa"],
                    "type": "tips"
                }
            elif "minecraft" in keyword:
                return {
                    "answer": tips["minecraft"],
                    "suggestions": ["Farm automáticas", "Redstone básica", "Construções criativas"],
                    "type": "tips"
                }
        
        return {
            "answer": "💡 **Dicas Gerais:**\n\n" +
                     "• **Para jogos:** Pratique consistentemente\n" +
                     "• **Para streaming:** Seja autêntico\n" +
                     "• **Para comunidade:** Participe ativamente\n\n" +
                     "Sobre qual jogo ou assunto você quer dicas específicas?",
            "suggestions": ["Valorant dicas", "Minecraft dicas", "Streaming dicas"],
            "type": "tips"
        }
    
    def _get_events_response(self) -> Dict:
        return {
            "answer": "🎪 **Eventos Especiais:**\n\n" +
                     "• **Sábado de Especiais:** Jogos diferentes toda semana\n" +
                     "• **Torneios com Viewers:** Competições com premiações\n" +
                     "• **Maratonas Mensais:** Streams prolongadas\n" +
                     "• **Aniversário do Canal:** Evento especial anual\n\n" +
                     "Fique de olho no Discord e Twitter para anunciar os próximos eventos! 📢",
            "suggestions": ["Próximo evento", "Como participar", "Eventos passados"],
            "type": "events"
        }
    
    def _get_general_response(self, keywords: List[str]) -> Dict:
        return {
            "answer": "🤖 **Assistente do Canal pedromartss007:**\n\n" +
                     "Posso te ajudar com:\n" +
                     "• Horários das streams\n" +
                     "• Jogos que transmito\n" +
                     "• Regras do chat\n" +
                     "• Informações do canal\n" +
                     "• Dicas e recomendações\n\n" +
                     "No que posso te ajudar hoje? 🎮",
            "suggestions": ["Horários", "Jogos", "Regras", "Discord", "Setup"],
            "type": "welcome"
        }
