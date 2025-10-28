// chatbot.js - Asistente virtual Jim Tattoo Ink
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.bindEvents();
        this.loadSession();
    }

    createChatbotHTML() {
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
                        <p>¡Hola! Soy tu asistente virtual de Jim Tattoo Ink. ¿En qué puedo ayudarte hoy? 😊</p>
                    </div>
                    <div class="message bot-message">
                        <p>Puedes preguntarme sobre:</p>
                        <ul>
                            <li>💼 <strong>Tipos de tatuajes</strong></li>
                            <li>💰 <strong>Precios y presupuestos</strong></li>
                            <li>📅 <strong>Citas y disponibilidad</strong></li>
                            <li>📍 <strong>Ubicación y horarios</strong></li>
                            <li>🩹 <strong>Cuidados y proceso</strong></li>
                        </ul>
                    </div>
                </div>
                
                <div class="chatbot-input">
                    <input type="text" id="chatbotInput" placeholder="Escribe tu pregunta...">
                    <button id="chatbotSend">➤</button>
                </div>

                <div class="chatbot-quick-questions">
                    <button class="quick-question" data-question="¿Qué estilos de tatuaje manejas?">Estilos disponibles</button>
                    <button class="quick-question" data-question="¿Cuánto cuesta un tatuaje?">Precios</button>
                    <button class="quick-question" data-question="¿Cómo agendo una cita?">Agendar cita</button>
                </div>
            </div>
            
            <button class="chatbot-toggle" id="chatbotToggle">
                <span>💬</span>
            </button>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        // Toggle chatbot
        document.getElementById('chatbotToggle').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Cerrar chatbot
        document.getElementById('chatbotClose').addEventListener('click', () => {
            this.closeChatbot();
        });

        // Enviar mensaje
        document.getElementById('chatbotSend').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enviar con Enter
        document.getElementById('chatbotInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Preguntas rápidas
        document.querySelectorAll('.quick-question').forEach(button => {
            button.addEventListener('click', (e) => {
                const question = e.target.getAttribute('data-question');
                document.getElementById('chatbotInput').value = question;
                this.sendMessage();
            });
        });
    }

    toggleChatbot() {
        const widget = document.getElementById('chatbotWidget');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            widget.classList.add('active');
            document.getElementById('chatbotInput').focus();
        } else {
            widget.classList.remove('active');
        }
    }

    closeChatbot() {
        document.getElementById('chatbotWidget').classList.remove('active');
        this.isOpen = false;
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();

        if (message === '') return;

        // Agregar mensaje del usuario
        this.addMessage(message, 'user');
        input.value = '';

        // Respuesta del bot
        setTimeout(() => {
            const response = this.getBotResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageText = document.createElement('p');
        messageText.innerHTML = text;
        
        messageDiv.appendChild(messageText);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getBotResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Estilos de tatuaje
        if (lowerMessage.includes('estilo') || lowerMessage.includes('tipo') || lowerMessage.includes('blackwork')) {
            return `🎨 <strong>Especialista en Blackwork</strong> con más de 18 años de experiencia. También trabajo:<br><br>
            • <strong>Blackwork</strong> - Mi especialidad principal<br>
            • <strong>Minimalista</strong> - Líneas finas y diseños sutiles<br>
            • <strong>Geométrico</strong> - Patrones y formas precisas<br>
            • <strong>Realismo Black & Grey</strong><br>
            • <strong>Fine Line</strong> - Detalles delicados<br>
            • <strong>Color</strong> - Watercolor y neotradicional<br><br>
            ¿Te interesa algún estilo en particular?`;
        }

        // Precios
        if (lowerMessage.includes('precio') || lowerMessage.includes('cuesta') || lowerMessage.includes('cuánto') || lowerMessage.includes('valor')) {
            return `💰 <strong>Los precios varían según:</strong><br><br>
            • <strong>Tamaño y complejidad</strong><br>
            • <strong>Ubicación en el cuerpo</strong><br>
            • <strong>Estilo del diseño</strong><br>
            • <strong>Tiempo requerido</strong><br><br>
            <strong>Precio mínimo:</strong> 80€<br>
            <strong>Promedio por sesión (3-4 horas):</strong> 200-300€<br>
            <strong>Proyectos grandes:</strong> Presupuesto personalizado<br><br>
            Para un precio exacto, recomiendo agendar una consulta. ¿Tienes algún diseño en mente?`;
        }

        // Citas
        if (lowerMessage.includes('cita') || lowerMessage.includes('agendar') || lowerMessage.includes('disponibilidad') || lowerMessage.includes('reserva')) {
            return `📅 <strong>Para agendar tu cita:</strong><br><br>
            1. <strong>Consulta inicial</strong> - Discutimos tu idea<br>
            2. <strong>Diseño personalizado</strong> - Creo el boceto<br>
            3. <strong>Sesión de tatuaje</strong><br><br>
            <strong>Horarios disponibles:</strong><br>
            Lunes a Viernes: 10:00 - 22:00<br>
            Sábados: 11:00 - 22:00<br><br>
            📱 <strong>Contacto directo:</strong><br>
            • WhatsApp: +34 615 796 188<br>
            • Instagram: @jimtattooink<br>
            • Email: jimtattootatuajes@gmail.com<br><br>
            ¿Te gustaría que te contacte?`;
        }

        // Ubicación
        if (lowerMessage.includes('dónde') || lowerMessage.includes('ubicación') || lowerMessage.includes('dirección') || lowerMessage.includes('barcelona')) {
            return `📍 <strong>Estudio en Barcelona</strong><br><br>
            <strong>Zona:</strong> Centro de Barcelona<br>
            <strong>Dirección exacta:</strong> Se proporciona al confirmar la cita<br>
            <strong>Transporte:</strong> Fácil acceso en metro y bus<br><br>
            El estudio es <strong>privado y profesional</strong>, con máximo enfoque en higiene y comodidad. ¿Necesitas indicaciones específicas?`;
        }

        // Cuidados
        if (lowerMessage.includes('cuidado') || lowerMessage.includes('curar') || lowerMessage.includes('proceso') || lowerMessage.includes('sanar')) {
            return `🩹 <strong>Cuidados post-tatuaje:</strong><br><br>
            • <strong>Primeras horas:</strong> Mantener vendaje 2-4 horas<br>
            • <strong>Limpieza:</strong> Lavar suavemente con jabón neutro<br>
            • <strong>Hidratación:</strong> Aplicar crema especializada 3-4 veces al día<br>
            • <strong>Evitar:</strong> Piscina, sol directo, rascar durante 2 semanas<br>
            • <strong>Tiempo de curación:</strong> 2-4 semanas<br><br>
            Proporciono <strong>instrucciones detalladas</strong> y seguimiento después de cada sesión. ¿Tienes alguna preocupación específica?`;
        }

        // Piercings
        if (lowerMessage.includes('piercing') || lowerMessage.includes('perforación')) {
            return `📌 <strong>Servicio de Piercing Profesional</strong><br><br>
            <strong>Precios desde:</strong><br>
            • Nariz/Surface: 15€<br>
            • Lengua/Oreja/Ombligo: 20€<br>
            • Pezón: 25€<br>
            • Microdermal: 30€<br><br>
            <strong>Materiales premium:</strong> Acero quirúrgico y Bioflex<br>
            <strong>Técnica segura:</strong> Siempre con aguja, NUNCA con pistola<br><br>
            ¿Te interesa algún tipo específico de piercing?`;
        }

        // Tiempo de sesión
        if (lowerMessage.includes('tiempo') || lowerMessage.includes('dura') || lowerMessage.includes('sesión') || lowerMessage.includes('horas')) {
            return `⏰ <strong>Duración de las sesiones:</strong><br><br>
            • <strong>Pequeños:</strong> 1-2 horas<br>
            • <strong>Medianos:</strong> 3-4 horas<br>
            • <strong>Grandes proyectos:</strong> Múltiples sesiones de 4-5 horas<br><br>
            Recomiendo <strong>sesiones de máximo 4 horas</strong> para mejor tolerancia y óptima calidad del trabajo. ¿Qué tamaño tienes en mente?`;
        }

        // Dolor
        if (lowerMessage.includes('duele') || lowerMessage.includes('dolor') || lowerMessage.includes('molestia')) {
            return `😊 <strong>Sobre el "dolor":</strong><br><br>
            • Es <strong>manejable</strong> para la mayoría de personas<br>
            • Depende de la <strong>ubicación</strong> y tu tolerancia<br>
            • Zonas más sensibles: Costillas, pies, manos<br>
            • Zonas menos sensibles: Brazos, piernas, espalda<br><br>
            Uso técnicas para <strong>minimizar molestias</strong> y el estudio tiene ambiente relajado. ¿Tienes alguna zona específica en mente?`;
        }

        // Diseño personalizado
        if (lowerMessage.includes('diseño') || lowerMessage.includes('idea') || lowerMessage.includes('personalizado') || lowerMessage.includes('boceto')) {
            return `✏️ <strong>Proceso de diseño:</strong><br><br>
            1. <strong>Consulta</strong> - Hablamos de tu idea<br>
            2. <strong>Inspiración</strong> - Referencias y conceptos<br>
            3. <strong>Boceto</strong> - Creo diseño personalizado<br>
            4. <strong>Ajustes</strong> - Modificamos hasta que ames el diseño<br><br>
            Todos mis trabajos son <strong>100% personalizados</strong> y originales. ¿Tienes alguna referencia o concepto?`;
        }

        // Default response
        return `🤔 No estoy seguro de entender tu pregunta. Puedo ayudarte con:<br><br>
        • <strong>Estilos y diseños de tatuaje</strong><br>
        • <strong>Precios y presupuestos</strong><br>
        • <strong>Agendamiento de citas</strong><br>
        • <strong>Ubicación y horarios</strong><br>
        • <strong>Cuidados post-tatuaje</strong><br>
        • <strong>Servicios de piercing</strong><br><br>
        ¿En qué más puedo asistirte?`;
    }

    loadSession() {
        // Cargar historial de sesión si existe
        const savedSession = localStorage.getItem('chatbotSession');
        if (savedSession) {
            // Implementar carga de sesión si es necesario
        }
    }

    saveSession() {
        // Guardar historial de sesión
        localStorage.setItem('chatbotSession', JSON.stringify({
            lastInteraction: new Date().toISOString()
        }));
    }
}

// Inicializar chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new Chatbot();
});