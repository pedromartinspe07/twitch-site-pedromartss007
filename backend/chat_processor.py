import json
import re
from typing import Dict, List, Any
from datetime import datetime

class ChatProcessor:
    def __init__(self):
        self.conversation_history = []
        self.user_contexts = {}
        
    def process_message(self, user_message: str, channel_data: Dict, context: Dict = None) -> Dict:
        """Processa mensagem do usuário e gera resposta"""
        
        # Adicionar ao histórico
        self.conversation_history.append({
            "user": user_message,
            "timestamp": datetime.now().isoformat()
        })
        
        # Manter apenas últimos 10 mensagens
        if len(self.conversation_history) > 10:
            self.conversation_history = self.conversation_history[-10:]
        
        # Analisar mensagem
        from twitch_analyzer import TwitchAnalyzer
        analyzer = TwitchAnalyzer()
        
        analysis = analyzer.analyze_question(user_message)
        response = analyzer.generate_response(
            question_type=analysis["type"],
            keywords=analysis["keywords"],
            intent=analysis["intent"]
        )
        
        # Adicionar contexto personalizado
        response = self._add_contextual_info(response, context, user_message)
        
        return response
    
    def _add_contextual_info(self, response: Dict, context: Dict, user_message: str) -> Dict:
        """Adiciona informações contextuais à resposta"""
        
        # Verificar se é primeira interação
        if context and context.get('is_first_message', False):
            response['answer'] = "👋 **Olá! Bem-vindo ao assistente do canal pedromartss007!**\n\n" + response['answer']
        
        # Verificar se usuário perguntou sobre próximo stream
        if 'próxima' in user_message.lower() or 'proxima' in user_message.lower():
            import datetime
            today = datetime.datetime.now()
            days_ahead = {
                'monday': 0, 'tuesday': 1, 'wednesday': 2, 
                'thursday': 3, 'friday': 4, 'saturday': 5, 'sunday': 6
            }
            
            today_name = today.strftime('%A').lower()
            days_to_add = days_ahead.get(today_name, 0)
            
            response['answer'] += f"\n\n📅 **Próxima stream:** Amanhã às 19:00 - Valorant!"
        
        return response
    
    def analyze_chat_sentiment(self, messages: List[str]) -> Dict:
        """Analisa sentimento das mensagens do chat"""
        positive_words = ["bom", "boa", "ótimo", "excelente", "incrível", "amei", "adoro", "legal", "divertido"]
        negative_words = ["ruim", "chato", "entediante", "péssimo", "horrível", "odeio", "fracasso"]
        
        positive_count = 0
        negative_count = 0
        neutral_count = 0
        
        for message in messages:
            message_lower = message.lower()
            has_positive = any(word in message_lower for word in positive_words)
            has_negative = any(word in message_lower for word in negative_words)
            
            if has_positive and not has_negative:
                positive_count += 1
            elif has_negative and not has_positive:
                negative_count += 1
            else:
                neutral_count += 1
        
        total = len(messages)
        if total > 0:
            return {
                "positive_percentage": (positive_count / total) * 100,
                "negative_percentage": (negative_count / total) * 100,
                "neutral_percentage": (neutral_count / total) * 100,
                "overall_sentiment": "positive" if positive_count > negative_count else "negative" if negative_count > positive_count else "neutral",
                "message_count": total
            }
        
        return {
            "positive_percentage": 0,
            "negative_percentage": 0,
            "neutral_percentage": 0,
            "overall_sentiment": "neutral",
            "message_count": 0
        }
    
    def get_chat_recommendations(self, chat_history: List[Dict]) -> List[str]:
        """Gera recomendações baseadas no histórico do chat"""
        recommendations = []
        
        # Analisar tópicos frequentes
        topics = []
        for msg in chat_history[-20:]:  # Últimas 20 mensagens
            text = msg.get('message', '').lower()
            if '?' in text:
                topics.append(text)
        
        # Gerar recomendações baseadas em tópicos
        if any('horário' in topic or 'hora' in topic for topic in topics):
            recommendations.append("Adicionar lembretes de stream nas redes sociais")
        
        if any('jogo' in topic for topic in topics):
            recommendations.append("Criar enquete para próxima stream")
        
        if any('dica' in topic for topic in topics):
            recommendations.append("Fazer vídeo com dicas dos jogos mais perguntados")
        
        return recommendations[:3]  # Retorna até 3 recomendações
