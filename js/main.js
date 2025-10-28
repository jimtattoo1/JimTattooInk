// chatbot.js - Asistente Virtual Jim Tattoo Ink
class ChatBot {
    constructor() {
        this.widget = document.getElementById('chatbotWidget');
        this.container = document.getElementById('chatbotContainer');
        this.toggle = document.getElementById('chatbotToggle');
        this.close = document.getElementById('chatbotClose');
        this.messages = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.send = document.getElementById('chatbotSend');
        this.quickQuestions = document.querySelectorAll('.quick-question');
        
        this.init();
    }
    
    init() {
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
    }
    
    toggleChat() {
        this.container.classList.toggle('active');
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
        // 8. IRRITACIÓN
        else if (q.includes('irritación') || q.includes('irrita') || q.includes('molestia')) {
            response = "Si hay enrojecimiento leve o hinchazón, es normal. Aplica compresas frías y solución salina. Si hay dolor intenso, pus o fiebre, consulta médico inmediatamente.";
        }
        // 9. REDES SOCIALES
        else if (q.includes('instagram') || q.includes('redes') || q.includes('social') || q.includes('@') || q.includes('tiktok')) {
            response = "¡Síguenos en @jimtattooink en Instagram y TikTok para ver nuestro trabajo!";
            actions.push({text: "📸 Seguir en Instagram", action: "instagram"});
        }
        // 10. MÉTODO PERFORACIÓN
        else if (q.includes('método') || q.includes('pistola') || q.includes('aguja') || q.includes('catéter')) {
            response = "Solo usamos AGUJA ESTÉRIL tipo catéter. NUNCA pistolas, que dañan el tejido. Técnica más precisa, menos dolorosa y más segura.";
        }
        // 11. DOLOR Y DURACIÓN PIERCING
        else if ((q.includes('dolor') || q.includes('duele')) && q.includes('piercing')) {
            response = "Dolor breve como un pellizco. La perforación dura segundos. Todo el proceso (preparación, marcado, perforación) unos 15-20 minutos.";
        }
        // 12. ESTERILIZACIÓN
        else if (q.includes('esteril') || q.includes('higiene') || q.includes('limpio') || q.includes('seguro')) {
            response = "SÍ. Todo material es ESTÉRIL y de UN SOLO USO. Agujas, tubos, guantes, contenedores... La máquina se forra completamente con material estéril desechable. Todo se descarta después de cada cliente.";
        }
        // 13. MATERIALES JOYERÍA
        else if (q.includes('material') || q.includes('joyería') || q.includes('acero') || q.includes('bioflex') || q.includes('titani')) {
            response = "Inicialmente: Acero quirúrgico 316L para la mayoría, Bioflex para zonas con flexibilidad. Ambos hipoalergénicos y de calidad profesional.";
        }
        // 14. JOYA PROPIA
        else if (q.includes('propia') || q.includes('llevar') || q.includes('traer') && q.includes('joya')) {
            response = "No recomendado. Usamos joyería profesional esterilizada específica para perforación inicial para garantizar seguridad y correcta curación.";
        }
        // 15. CAMBIO DE JOYA
        else if (q.includes('cambiar') || q.includes('cambio') && q.includes('joya')) {
            response = "Después de la curación completa: 6-8 semanas para nariz/oreja, 6-12 semanas para ombligo, 4-6 semanas para lengua. Te aconsejamos cuándo es seguro.";
        }
        // 16. TIEMPO CURACIÓN
        else if (q.includes('cura') || q.includes('sana') || q.includes('cicatriza') && q.includes('piercing')) {
            response = "Lóbulo: 6-8 semanas. Cartílago: 4-12 meses. Ombligo: 6-12 meses. Lengua: 4-6 semanas. Nariz: 2-4 meses.";
        }
        // 17. PRODUCTOS LIMPIEZA
        else if (q.includes('limpiar') || q.includes('producto') || q.includes('limpia') || q.includes('jabón')) {
            response = "Solución salina estéril o agua marina específica para piercings. NUNCA alcohol, peróxido o pomadas antibióticas.";
        }
        // 18. SÍNTOMAS NORMALES
        else if (q.includes('normal') || q.includes('preocup') || q.includes('síntoma')) {
            response = "NORMAL: Hinchazón leve, enrojecimiento, sensibilidad primera semana. PREOCUPANTE: Dolor intenso, pus amarillo/verde, fiebre, sangrado excesivo.";
        }
        // 19. PRESUPUESTOS
        else if (q.includes('presupuesto') || q.includes('cotización') || q.includes('presupu')) {
            response = "Envía tu idea por WhatsApp/Instagram con referencia de tamaño y ubicación. Jim te dará presupuesto personalizado.";
            actions.push({text: "📱 Enviar diseño", action: "whatsapp"});
        }
        // 20. PRECIO POR HORA
        else if (q.includes('hora') || q.includes('tiempo') && q.includes('precio')) {
            response = "Generalmente por diseño/pieza. Para trabajos muy extensos puede ser por sesión. Siempre presupuesto claro antes de empezar.";
        }
        // 21. DISEÑOS PERSONALIZADOS
        else if (q.includes('diseño') || q.includes('copiar') || q.includes('internet') || q.includes('personal')) {
            response = "¡Sí claro! Puedes traer tus diseños y nos adaptamos a ellos, aunque preferimos crear diseños ÚNICOS y personalizados. Podemos inspirarnos en referencias pero cada tatuaje es original y hecho específicamente para ti.";
        }
        // 22. PROCESO DISEÑO
        else if (q.includes('proceso') && q.includes('diseño')) {
            response = "Consulta → Boceto personalizado → Revisión y ajustes → Aprobación → Cita. Incluye 2 revisiones del diseño.";
        }
        // 23. MEDIDAS HIGIENE
        else if (q.includes('higiene') || q.includes('seguridad') || q.includes('limpieza')) {
            response = "Protocolo completo: TODO desechable (agujas, tubos, guantes, contenedores de tinta). La máquina se forra completamente con material estéril desechable. Todo se descarta después de cada cliente.";
        }
        // 24. DOLOR TATUAJE
        else if ((q.includes('dolor') || q.includes('duele')) && q.includes('tatuaje')) {
            response = "Varía según zona y tolerancia. Zonas con más terminaciones nerviosas (costillas, pies) son más sensibles. Puedes usar crema anestésica previa consulta.";
        }
        // 25. DURACIÓN SESIÓN
        else if (q.includes('dura') || q.includes('sesión') || q.includes('tiempo') && q.includes('tatuaje')) {
            response = "Pequeños: 30 minutos - 1 hora. Medianos: 1 - 2 horas. Grandes pueden requerir varias sesiones.";
        }
        // 26. PREPARACIÓN CITA
        else if (q.includes('prepara') || q.includes('antes') || q.includes('cita')) {
            response = "Descansar bien, comer ligero, hidratarse, no tomar alcohol 24h antes, llevar ropa cómoda.";
        }
        // 27. INFECCIÓN TATUAJE
        else if (q.includes('infección') || q.includes('infecta') || q.includes('infectado')) {
            response = "Señales: Enrojecimiento que empeora después de 3 días, pus, dolor intenso, fiebre. Si sospechas infección, consulta médico inmediatamente.";
        }
        // 28. RETOQUES
        else if (q.includes('retoque') || q.includes('retocar') || q.includes('arreglar')) {
            response = "SÍ. Retoques menores GRATIS dentro de los primeros 3 meses. Algunos colores pueden necesitar retoque para intensidad óptima.";
        }
        // 29. HORARIO
        else if (q.includes('horario') || q.includes('hora') || q.includes('abre') || q.includes('cierra')) {
            response = "Lunes a Viernes: 10:00-22:00, Sábados: 11:00-22:00, Domingos: 11:00-20:00. Siempre con cita previa.";
            actions.push({text: "🗺️ Ver contacto completo", action: "contact"});
        }
        // 30. DEPÓSITO
        else if (q.includes('depósito') || q.includes('seña') || q.includes('reserva')) {
            response = "SÍ, depósito del 30% para reservar cita. Se deduce del precio final. Garantiza tu espacio y cubre diseño personalizado.";
        }
        // 31. FORMAS DE PAGO
        else if (q.includes('pago') || q.includes('tarjeta') || q.includes('efectivo') || q.includes('bizum')) {
            response = "Bizum y efectivo. Para trabajos grandes se puede fraccionar pago.";
        }
        // 32. OTRAS PREGUNTAS
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
        quickQuestions.appendChild(button);
        this.scrollToBottom();
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
                window.location.href = '../index.html#contacto';
                break;
        }
        this.closeChat();
    }
}

// Inicializar chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});