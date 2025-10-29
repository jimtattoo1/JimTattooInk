// chatbot.js - Asistente Virtual Jim Tattoo Ink
class ChatBot {
    constructor() {
        // Primero crear el HTML si no existe
        this.createChatbotHTML();
        
        // Luego obtener referencias
        this.widget = document.getElementById('chatbotWidget');
        this.container = this.widget; // Usar el widget como container
        this.toggle = document.getElementById('chatbotToggle');
        this.close = document.getElementById('chatbotClose');
        this.messages = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.send = document.getElementById('chatbotSend');
        this.quickQuestions = document.querySelectorAll('.quick-question');
        
        this.init();
    }
    
    createChatbotHTML() {
        // Solo crear si no existe
        if (document.getElementById('chatbotWidget')) return;
        
        const chatbotHTML = `
            <div class="chatbot-widget" id="chatbotWidget">
                <div class="chatbot-header">
                    <div class="chatbot-avatar">
                        <span>🤖</span>
                    </div>
                    <div class="chatbot-info">
                        <h4>Jim Tattoo Assistant</h4>
                        <p>En línea</p>
                    </div>
                    <button class="chatbot-close" id="chatbotClose">×</button>
                </div>
                
                <div class="chatbot-messages" id="chatbotMessages">
                    <div class="message bot-message">
                        <p>¡Hola! Soy el asistente de Jim Tattoo Ink. ¿En qué puedo ayudarte hoy? 😊</p>
                    </div>
                    <div class="message bot-message">
                        <p>Puedo ayudarte con:</p>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            <li>💰 <strong>Precios y presupuestos</strong></li>
                            <li>📅 <strong>Citas y disponibilidad</strong></li>
                            <li>📍 <strong>Ubicación y horarios</strong></li>
                            <li>🩹 <strong>Cuidados post-tatuaje/piercing</strong></li>
                            <li>💎 <strong>Tipos de piercing</strong></li>
                        </ul>
                    </div>
                </div>
                
                <div class="chatbot-input">
                    <input type="text" id="chatbotInput" placeholder="Escribe tu pregunta...">
                    <button id="chatbotSend">➤</button>
                </div>

                <div class="chatbot-quick-questions">
                    <button class="quick-question" data-question="¿Qué estilos de tatuaje manejas?">Estilos disponibles</button>
                    <button class="quick-question" data-question="¿Cuánto cuesta un tatuaje?">Precios tatuajes</button>
                    <button class="quick-question" data-question="¿Cómo agendo una cita?">Agendar cita</button>
                </div>
            </div>
            
            <button class="chatbot-toggle" id="chatbotToggle">
                <span>💬</span>
            </button>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        console.log('✅ HTML del chatbot creado');
    }
    
    init() {
        console.log('✅ Chatbot inicializando...');
        
        // Verificar que todos los elementos existen
        if (!this.toggle) {
            console.error('❌ No se encontró el botón toggle');
            return;
        }
        if (!this.widget) {
            console.error('❌ No se encontró el widget del chatbot');
            return;
        }

        // Event listeners
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.close.addEventListener('click', () => this.closeChat());
        this.send.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Quick questions
        this.quickQuestions.forEach(button => {
            button.addEventListener('click', (e) => {
                const question = e.target.getAttribute('data-question');
                this.addUserMessage(question);
                this.processQuestion(question);
            });
        });

        console.log('✅ Chatbot inicializado correctamente');
    }
    
    toggleChat() {
        this.container.classList.toggle('active');
        console.log('Chatbot toggled:', this.container.classList.contains('active'));
    }
    
    closeChat() {
        this.container.classList.remove('active');
    }
    
    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<p>${text}</p>`;
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `<p>${text}</p>`;
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    sendMessage() {
        const text = this.input.value.trim();
        if (text) {
            this.addUserMessage(text);
            this.input.value = '';
            this.processQuestion(text);
        }
    }
    
    processQuestion(question) {
        const q = question.toLowerCase();
        let response = '';
        let actions = [];
        
        // 1. SALUDO
        if (q.includes('hola') || q.includes('buenas') || q.includes('hi') || q.includes('hello')) {
            response = "¡Hola! Soy el asistente de Jim Tattoo Ink. Puedo ayudarte con información sobre precios, piercings, cuidados, recomendaciones o conectar con Jim.";
        }
        // 2. PRECIOS TATUAJES
        else if (q.includes('precio') || q.includes('cuánto') || q.includes('cuesta') || q.includes('valor')) {
            if (q.includes('tatuaje')) {
                response = "Los tatuajes varían según tamaño: pequeños desde 40€, medianos 80-150€, grandes desde 200€. ¿Te interesa algún estilo en particular?";
                actions.push({text: "📱 Consultar diseño específico", action: "whatsapp"});
            } else if (q.includes('piercing')) {
                response = "Piercings desde 15€: Nariz (15€), Lengua (20€), Ombligo (20€), Pezón (25€), Industrial (20€), Microdermal (40€). Todos incluyen joyería inicial.";
                actions.push({text: "💎 Ver todos los piercings", action: "piercings"});
            } else {
                response = "Puedo ayudarte con precios de tatuajes o piercings. ¿Qué te interesa más?";
            }
        }
        // 3. TIPOS PIERCING
        else if (q.includes('piercing') || q.includes('perforación') || q.includes('perforar')) {
            response = "Hacemos: Nariz Desde (15€), Lengua Desde (20€), Ombligo (20€), Pezón (25€), Industrial (20€), Microdermal (40€)";
            actions.push({text: "📍 Ver todos los piercings", action: "piercings"});
        }
        // 4. RESERVAS
        else if (q.includes('reserva') || q.includes('cita') || q.includes('appointment') || q.includes('agendar')) {
            response = "Puedes reservar por WhatsApp al +34 615 796 188 o por Instagram en @jimtattooink. También nos puedes visitar en Barcelona con cita previa.";
            actions.push({text: "📱 Reservar por WhatsApp", action: "whatsapp"});
        }
        // 5. UBICACIÓN
        else if (q.includes('ubicación') || q.includes('dónde') || q.includes('dirección') || q.includes('local') || q.includes('estudio')) {
            response = "Estamos en Barcelona, España. Trabajamos con cita previa para mejor atención.";
            actions.push({text: "🗺️ Ver información de contacto", action: "contact"});
        }
        // 6. CUIDADOS PIERCING
        else if (q.includes('cuidado') && q.includes('piercing')) {
            response = "Limpia 2-3 veces al día con solución salina estéril. No gires la joya, evita piscinas y manipulación. Usa ropa holgada si es corporal. La curación toma 6 semanas a 6 meses según ubicación.";
        }
        // 7. CUIDADOS TATUAJE
        else if (q.includes('cuidado') && q.includes('tattoo') || q.includes('tatuaje')) {
            response = "Retira el vendaje después de 2-3 horas. Lava suavemente con jabón neutro, seca con toques y aplica crema específica 2-3 veces al día. Evita sol, piscinas y rascado durante 2 semanas.";
        }
        // 8. REDES SOCIALES
        else if (q.includes('instagram') || q.includes('redes') || q.includes('social') || q.includes('@') || q.includes('tiktok')) {
            response = "¡Síguenos en @jimtattooink en Instagram y TikTok para ver nuestro trabajo!";
            actions.push({text: "📸 Seguir en Instagram", action: "instagram"});
        }
        // 9. HORARIO
        else if (q.includes('horario') || q.includes('hora') || q.includes('abre') || q.includes('cierra')) {
            response = "Lunes a Viernes: 10:00-22:00, Sábados: 11:00-22:00, Domingos: 11:00-20:00. Siempre con cita previa.";
            actions.push({text: "🗺️ Ver contacto completo", action: "contact"});
        }
        // 10. OTRAS PREGUNTAS
        else {
            response = "Puedo ayudarte con información básica. Para consultas específicas, te recomiendo contactar a Jim directamente por WhatsApp al +34 615 796 188";
            actions.push({text: "📱 Contactar por WhatsApp", action: "whatsapp"});
            actions.push({text: "📸 Ver Instagram", action: "instagram"});
        }
        
        // Agregar respuesta con delay para simular typing
        setTimeout(() => {
            this.addBotMessage(response);
            
            // Agregar botones de acción si existen
            if (actions.length > 0) {
                setTimeout(() => {
                    actions.forEach(action => {
                        this.addActionButton(action.text, action.action);
                    });
                }, 500);
            }
        }, 1000);
    }
    
    addActionButton(text, action) {
        const button = document.createElement('button');
        button.className = 'quick-question action-button';
        button.textContent = text;
        button.addEventListener('click', () => this.handleAction(action));
        
        const quickQuestions = document.querySelector('.chatbot-quick-questions');
        if (quickQuestions) {
            quickQuestions.appendChild(button);
            this.scrollToBottom();
        }
    }
    
    handleAction(action) {
        switch(action) {
            case 'whatsapp':
                window.open('https://wa.me/34615796188', '_blank');
                break;
            case 'instagram':
                window.open('https://instagram.com/jimtattooink', '_blank');
                break;
            case 'piercings':
                window.location.href = 'pages/piercings.html';
                break;
            case 'contact':
                // Scroll to contacto section
                const contactoSection = document.getElementById('contacto');
                if (contactoSection) {
                    contactoSection.scrollIntoView({ behavior: 'smooth' });
                }
                this.closeChat();
                break;
        }
        this.closeChat();
    }
}

// Inicializar chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando ChatBot...');
    new ChatBot();
});