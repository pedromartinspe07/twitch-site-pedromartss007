from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from twitch_analyzer import TwitchAnalyzer
from chat_processor import ChatProcessor
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Inicializar analisadores
twitch_analyzer = TwitchAnalyzer()
chat_processor = ChatProcessor()

# Dados simulados do canal (substitua por dados reais da API da Twitch)
CHANNEL_DATA = {
    "channel_name": "pedromartss007",
    "followers": 5200,
    "total_views": 125000,
    "created_at": "2022-03-15",
    "stream_schedule": {
        "monday": "19:00-22:00 - Valorant",
        "tuesday": "20:00-23:00 - Minecraft",
        "wednesday": "18:00-21:00 - Fortnite",
        "thursday": "19:00-22:00 - Jogos Indies",
        "friday": "20:00-00:00 - Variedades",
        "saturday": "15:00-19:00 - Especial da Semana",
        "sunday": "Descanso"
    },
    "most_popular_games": ["Valorant", "Minecraft", "Fortnite", "The Finals", "CS2"],
    "avg_viewers": 85,
    "peak_viewers": 215,
    "content_type": "Gameplay variado com foco em FPS e jogos multiplayer",
    "community_vibe": "Descontraído, humorístico, interativo",
    "special_events": ["Sábado de Especiais", "Torneios com Viewers", "Maratonas Mensais"],
    "chat_rules": [
        "Respeito é obrigatório",
        "Sem preconceito",
        "Nada de spam",
        "Conteúdo NSFW proibido"
    ]
}

@app.route('/api/ai/chat', methods=['POST'])
def chat_with_ai():
    try:
        data = request.json
        user_message = data.get('message', '')
        context = data.get('context', {})
        
        # Processar a mensagem do usuário
        response = chat_processor.process_message(
            user_message=user_message,
            channel_data=CHANNEL_DATA,
            context=context
        )
        
        return jsonify({
            'success': True,
            'response': response['answer'],
            'suggestions': response.get('suggestions', []),
            'data': response.get('data', {}),
            'type': response.get('type', 'text')
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/channel/stats', methods=['GET'])
def get_channel_stats():
    """Retorna estatísticas do canal"""
    return jsonify({
        'success': True,
        'data': CHANNEL_DATA
    })

@app.route('/api/channel/upcoming', methods=['GET'])
def get_upcoming_streams():
    """Retorna próximas streams"""
    import datetime
    today = datetime.datetime.now().strftime('%A').lower()
    
    # Encontrar próximo stream
    days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    today_index = days.index(today)
    
    upcoming = []
    for i in range(7):
        day_index = (today_index + i) % 7
        day_name = days[day_index]
        if CHANNEL_DATA['stream_schedule'][day_name] != 'Descanso':
            upcoming.append({
                'day': day_name.capitalize(),
                'schedule': CHANNEL_DATA['stream_schedule'][day_name]
            })
            if len(upcoming) >= 3:
                break
    
    return jsonify({
        'success': True,
        'upcoming_streams': upcoming
    })

@app.route('/api/chat/analyze', methods=['POST'])
def analyze_chat_sentiment():
    """Analisa sentimento de mensagens do chat"""
    try:
        data = request.json
        messages = data.get('messages', [])
        
        # Simular análise de sentimento
        analysis = chat_processor.analyze_chat_sentiment(messages)
        
        return jsonify({
            'success': True,
            'analysis': analysis
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'Twitch AI Assistant'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
