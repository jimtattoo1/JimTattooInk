// chatbot.js - Asistente Virtual Jim Tattoo Ink (MEJORADO)

// Objeto de configuración para las Preguntas Frecuentes (FAQs)
const FAQ_CONFIG = [
    {
        id: 1,
        keywords: ['hola', 'buenas', 'hi', 'hello', 'saludo'],
        response: "¡Hola! Soy Jim Tattoo Assistant. Puedo ayudarte con información sobre **precios**, **piercings**, **cuidados post-sesión**, o conectarte directamente con Jim. ¿Qué te interesa saber hoy? 😊",
        actions: [
            { text: "Precios Tatuajes", action: "precios_tatuajes" },
            { text: "Tipos de Piercing", action: "tipos_piercing" },
            { text: "Reservar Cita", action: "whatsapp" }
        ]
    },
    {
        id: 2,
        keywords: ['precio', 'cuánto', 'cuesta', 'valor', 'tarifa', 'presupuesto'],
        response: "Los precios de los tatuajes varían según el tamaño y la complejidad del diseño. Pequeños desde **40€**, medianos **80-150€**, y diseños grandes desde **200€**. Para un presupuesto exacto, por favor, envíanos tu idea.",
        actions: [
            { text: "📱 Pedir Presupuesto (WhatsApp)", action: "whatsapp" },
            { text: "Ver Tipos de Piercing", action: "tipos_piercing" }
        ]
    },
    {
        id: 3,
        keywords: ['piercing', 'perforación', 'perforar', 'hacen'],
        response: "Realizamos una amplia variedad de piercings con aguja estéril. Precios iniciales (incluye joya básica): **Nariz (15€)**, **Lengua (20€)**, **Ombligo (20€)**, **Pezón (25€)**, **Industrial (20€)**, **Microdermal (40€)**.",
        actions: [
            { text: "📍 Ver Cuidados Piercing", action: "cuidados_piercing" },
            { text: "Cambio de Joya", action: "cambio_joya" }
        ]
    },
    {
        id: 4,
        keywords: ['reserva', 'cita', 'appointment', 'agendar', 'apartar'],
        response: "Puedes reservar tu cita de forma rápida y segura por **WhatsApp al +34 615 796 188** o por **Instagram en @jimtattooink**. Trabajamos con cita previa para garantizar la mejor atención.",
        actions: [
            { text: "📱 Reservar por WhatsApp", action: "whatsapp" },
            { text: "Ver Horario", action: "horario" }
        ]
    },
    {
        id: 5,
        keywords: ['ubicación', 'dónde', 'dirección', 'local', 'estudio', 'barcelona'],
        response: "Estamos en **Barcelona, España**. Recuerda que trabajamos **únicamente con cita previa**. Por favor, contáctanos antes de visitarnos.",
        actions: [
            { text: "🗺️ Ver Contacto Completo", action: "contact" }
        ]
    },
    {
        id: 6,
        keywords: ['cuidado', 'curación', 'limpieza', 'post', 'piercing'],
        response: "Para el cuidado de tu piercing: Limpia **2-3 veces al día** con solución salina estéril. **No gires la joya** y evita piscinas. La curación toma de 6 semanas a 6 meses según la zona.",
        actions: [
            { text: "Productos de Limpieza", action: "productos_limpieza" },
            { text: "Síntomas de Irritación", action: "irritacion" }
        ]
    },
    {
        id: 7,
        keywords: ['cuidado', 'curación', 'limpieza', 'post', 'tattoo', 'tatuaje'],
        response: "Para el cuidado de tu tatuaje: Retira el vendaje tras 2-3 horas. Lava con jabón neutro, seca con toques y aplica crema específica **2-3 veces al día**. **Evita el sol y piscinas** por 2 semanas.",
        actions: [
            { text: "Infección Tatuaje", action: "infeccion_tatuaje" },
            { text: "Retoques", action: "retoques" }
        ]
    },
    {
        id: 8,
        keywords: ['irritación', 'hinchazón', 'rojo', 'molestia'],
        response: "Una hinchazón leve o enrojecimiento inicial es normal. Aplica compresas frías y solución salina. **Si tienes dolor intenso, pus o fiebre**, consulta a un médico inmediatamente. ¡Tu salud es lo primero!",
        actions: [
            { text: "Cuidados Piercing", action: "cuidados_piercing" },
            { text: "Contactar a Jim", action: "whatsapp" }
        ]
    },
    {
        id: 9,
        keywords: ['instagram', 'redes', 'social', '@', 'tiktok', 'facebook'],
        response: "¡Síguenos para ver nuestro trabajo! Estamos como **@jimtattooink** en Instagram y TikTok. ¡No te pierdas nuestros últimos diseños!",
        actions: [
            { text: "📸 Ir a Instagram", action: "instagram" }
        ]
    },
    {
        id: 10,
        keywords: ['horario', 'hora', 'abre', 'cierra', 'atención'],
        response: "Nuestro horario de atención es: Lunes a Viernes: **10:00-22:00**, Sábados: **11:00-22:00**, Domingos: **11:00-20:00**. Recuerda que **siempre es con cita previa**.",
        actions: [
            { text: "Reservar Cita", action: "whatsapp" }
        ]
    },
    // Nuevas respuestas añadidas para mejorar la cobertura
    {
        id: 11,
        keywords: ['depósito', 'reserva', 'pago inicial'],
        response: "Sí, requerimos un **depósito del 30%** para confirmar tu cita. Este monto se deduce del precio final y garantiza tu espacio, además de cubrir el tiempo de diseño personalizado.",
        actions: [
            { text: "Formas de Pago", action: "formas_pago" }
        ]
    },
    {
        id: 12,
        keywords: ['pago', 'pagar', 'efectivo', 'tarjeta', 'bizum'],
        response: "Aceptamos: **Efectivo**, **Tarjeta de Crédito/Débito** y **Bizum**. Para trabajos de gran envergadura, podemos considerar fraccionar el pago.",
        actions: [
            { text: "Pedir Presupuesto", action: "whatsapp" }
        ]
    },
    {
        id: 13,
        keywords: ['estilos', 'diseño', 'personalizado', 'copiar'],
        response: "Jim es un artista que prefiere crear diseños **únicos y personalizados** para ti. Podemos usar referencias, pero tu tatuaje será original. ¿Tienes una idea en mente?",
        actions: [
            { text: "Proceso de Diseño", action: "proceso_diseno" },
            { text: "Contactar a Jim", action: "whatsapp" }
        ]
    },
    {
        id: 14,
        keywords: ['higiene', 'seguridad', 'esterilización', 'materiales'],
        response: "Nuestra prioridad es tu seguridad. Usamos un **protocolo de higiene completo**: esterilización con autoclave, agujas y materiales **de un solo uso** y superficies desinfectadas rigurosamente.",
        actions: [
            { text: "Método de Perforación", action: "metodo_perforacion" }
        ]
    },
    {
        id: 15,
        keywords: ['dolor', 'duele', 'sensibilidad', 'anestesia'],
        response: "El dolor es subjetivo y varía por zona. Zonas como costillas o pies son más sensibles. Si te preocupa, podemos discutir el uso de **crema anestésica** en la consulta.",
        actions: [
            { text: "Preparación para la Cita", action: "preparacion_cita" }
        ]
    },
    {
        id: 16,
        keywords: ['retoques', 'reparar', 'tinta', 'arreglar'],
        response: "Ofrecemos **retoques menores GRATIS** dentro de los primeros 3 meses. Esto asegura que la intensidad del color sea óptima. Si necesitas un retoque, contáctanos para agendarlo.",
        actions: [
            { text: "Cuidados Tatuaje", action: "cuidados_tatuaje" }
        ]
    },
    {
        id: 17,
        keywords: ['joya', 'material', 'quirúrgico', 'titanio', 'propia'],
        response: "Para la perforación inicial, recomendamos **Acero Quirúrgico 316L** o **Bioflex**, ambos hipoalergénicos. **No se recomienda** traer tu propia joya, ya que usamos joyería profesional esterilizada.",
        actions: [
            { text: "¿Cuándo cambiar la joya?", action: "cambio_joya" }
        ]
    },
    {
        id: 18,
        keywords: ['pistola', 'aguja', 'método', 'perforar'],
        response: "Solo utilizamos **AGUJA ESTÉRIL tipo catéter**. **NUNCA** usamos pistolas, ya que pueden causar un daño innecesario al tejido y son menos higiénicas.",
        actions: [
            { text: "Esterilización", action: "higiene" }
        ]
    }
];

class ChatBot {

    constructor() {
        // 1. Crear el HTML si no existe (método refactorizado para ser más limpio)
        this.createChatbotHTML();

        // 2. Obtener referencias
        this.widget = document.getElementById('chatbotWidget');
        this.container = this.widget;
        this.toggle = document.getElementById('chatbotToggle');
        this.close = document.getElementById('chatbotClose');
        this.messages = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.send = document.getElementById('chatbotSend');
        
        // 3. Inicializar
        this.init();
    }

    createChatbotHTML() {
        if (document.getElementById('chatbotWidget')) return;
        
        const initialQuestionsHTML = `
            <button class="quick-question" data-question="¿Qué estilos de tatuaje manejas?">Estilos disponibles</button>
            <button class="quick-question" data-question="¿Cuánto cuesta un tatuaje?">Precios tatuajes</button>
            <button class="quick-question" data-question="¿Cómo agendo una cita?">Agendar cita</button>
        `;

        const initialBotMessage = `
            <div class="message bot-message">
                <p>¡Hola! Soy Jim Tattoo Assistant. ¿En qué puedo ayudarte hoy? 😊</p>
            </div>
            <div class="message bot-message">
                <p>Puedo ayudarte con:</p>
                <ul>
                    <li>💰 <strong>Precios y presupuestos</strong></li>
                    <li>📅 <strong>Citas y disponibilidad</strong></li>
                    <li>📍 <strong>Ubicación y horarios</strong></li>
                    <li>🩹 <strong>Cuidados post-tatuaje/piercing</strong></li>
                    <li>💎 <strong>Tipos de piercing</strong></li>
                </ul>
            </div>
        `;

        const chatbotHTML = `
            <div class="chatbot-widget" id="chatbotWidget">
                <div class="chatbot-header">
                    <div class="chatbot-avatar">
                        <img src="images/logos/chatbot.png" alt="Jim Tattoo Logo" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                    </div>
                    <div class="chatbot-info">
                        <h4>Jim Tattoo Assistant</h4>
                        <p>En línea</p>
                    </div>
                    <button class="chatbot-close" id="chatbotClose">×</button>
                </div>
                
                <div class="chatbot-messages" id="chatbotMessages">
                    ${initialBotMessage}
                </div>
                
                <div class="chatbot-input">
                    <input type="text" id="chatbotInput" placeholder="Escribe tu pregunta...">
                    <button id="chatbotSend">➤</button>
                </div>

                <div class="chatbot-quick-questions" id="chatbotQuickQuestions">
                    ${initialQuestionsHTML}
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
        
        if (!this.toggle || !this.widget) {
            console.error('❌ Error: Faltan elementos esenciales del chatbot.');
            return;
        }

        // Event listeners principales
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.close.addEventListener('click', () => this.closeChat());
        this.send.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Event listeners para las preguntas rápidas iniciales
        this.messages.addEventListener('click', (e) => this.handleMessageClick(e));
        document.getElementById('chatbotQuickQuestions').addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-question')) {
                const question = e.target.getAttribute('data-question');
                this.addUserMessage(question);
                this.processQuestion(question);
            }
        });

        // Asegurar que el menú responsive funcione en todas las páginas
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        console.log('✅ Chatbot y menú responsive inicializados correctamente');
    }

    toggleChat() {
        this.container.classList.toggle('active');
        // Asegurar que el scroll esté abajo al abrir
        if (this.container.classList.contains('active')) {
            this.scrollToBottom();
        }
    }

    closeChat() {
        this.container.classList.remove('active');
    }

    // Método para añadir mensajes de usuario
    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<p>${text}</p>`;
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    // Método para añadir mensajes del bot
    addBotMessage(text, actions = []) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        let contentHTML = `<p>${text}</p>`;
        
        if (actions.length > 0) {
            const actionsHTML = actions.map(action => 
                `<button class="action-button" data-action="${action.action}">${action.text}</button>`
            ).join('');
            contentHTML += `<div class="action-buttons-container">${actionsHTML}</div>`;
        }
        
        messageDiv.innerHTML = contentHTML;
        
        // Simular "typing" con un delay
        setTimeout(() => {
            this.messages.appendChild(messageDiv);
            this.scrollToBottom();
        }, 500);
    }
    
    // Manejar clics en botones de acción dentro de los mensajes
    handleMessageClick(e) {
        if (e.target.classList.contains('action-button')) {
            const action = e.target.getAttribute('data-action');
            this.handleAction(action);
        }
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

    // Lógica principal de procesamiento de preguntas
    processQuestion(question) {
        const q = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normalizar y quitar acentos
        let response = null;
        let actions = [];

        // Buscar en la configuración de FAQs
        for (const faq of FAQ_CONFIG) {
            const match = faq.keywords.some(keyword => q.includes(keyword));
            if (match) {
                response = faq.response;
                actions = faq.actions || [];
                break;
            }
        }

        // Si no hay respuesta específica, usar la respuesta por defecto
        if (!response) {
            response = "Lo siento, esa pregunta es muy específica. Puedo ayudarte con información básica. Para consultas detalladas, te recomiendo contactar a Jim directamente por WhatsApp al +34 615 796 188";
            actions = [
                { text: "📱 Contactar por WhatsApp", action: "whatsapp" },
                { text: "📸 Ver Instagram", action: "instagram" }
            ];
        }

        // Agregar respuesta del bot
        this.addBotMessage(response, actions);
    }

    // Manejo de acciones especiales (abrir enlaces, scroll, etc.)
    handleAction(action) {
        // Cerrar el chat después de la acción si es externa
        let closeAfterAction = true; 
        
        switch(action) {
            case 'whatsapp':
                window.open('https://wa.me/34615796188', '_blank');
                break;
            case 'instagram':
                window.open('https://instagram.com/jimtattooink', '_blank');
                break;
            case 'precios_tatuajes':
                this.processQuestion("precio tatuaje");
                closeAfterAction = false;
                break;
            case 'tipos_piercing':
                this.processQuestion("tipos piercing");
                closeAfterAction = false;
                break;
            case 'cuidados_piercing':
                this.processQuestion("cuidado piercing");
                closeAfterAction = false;
                break;
            case 'cuidados_tatuaje':
                this.processQuestion("cuidado tatuaje");
                closeAfterAction = false;
                break;
            case 'productos_limpieza':
                this.processQuestion("productos limpieza");
                closeAfterAction = false;
                break;
            case 'irritacion':
                this.processQuestion("irritación");
                closeAfterAction = false;
                break;
            case 'infeccion_tatuaje':
                this.processQuestion("infección tatuaje");
                closeAfterAction = false;
                break;
            case 'retoques':
                this.processQuestion("retoques");
                closeAfterAction = false;
                break;
            case 'horario':
                this.processQuestion("horario");
                closeAfterAction = false;
                break;
            case 'formas_pago':
                this.processQuestion("formas de pago");
                closeAfterAction = false;
                break;
            case 'proceso_diseno':
                this.processQuestion("proceso de diseño");
                closeAfterAction = false;
                break;
            case 'metodo_perforacion':
                this.processQuestion("método perforación");
                closeAfterAction = false;
                break;
            case 'higiene':
                this.processQuestion("higiene");
                closeAfterAction = false;
                break;
            case 'cambio_joya':
                this.processQuestion("cambio de joya");
                closeAfterAction = false;
                break;
            case 'preparacion_cita':
                this.processQuestion("preparación cita");
                closeAfterAction = false;
                break;
            case 'contact':
                // Simular scroll a la sección de contacto (asumiendo que existe en la página principal)
                const contactoSection = document.getElementById('contacto');
                if (contactoSection) {
                    contactoSection.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            default:
                console.warn(`Acción no reconocida: ${action}`);
        }
        
        if (closeAfterAction) {
            this.closeChat();
        }
    }
}

// Inicializar chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando ChatBot...');
    new ChatBot();
});