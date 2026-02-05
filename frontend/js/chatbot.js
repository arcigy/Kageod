document.addEventListener('DOMContentLoaded', () => {
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotLauncher = document.getElementById('chatbot-launcher');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotWidget = document.querySelector('.chatbot-widget');

    // Reveal the widget exactly when preloader animation finishes
    const revealWidget = () => {
        if (chatbotWidget) chatbotWidget.classList.add('visible');
    };

    window.addEventListener('preloaderFinished', revealWidget);
    
    // Safety fallback - trigger faster if preloader is slow or missing
    setTimeout(revealWidget, 1000);

    let isGreetingSent = false;

    // Toggle Chatbot Window
    const toggleChat = (force = null) => {
        const isActive = chatbotWindow.classList.contains('active');
        const nextState = force !== null ? force : !isActive;
        
        if (nextState) {
            chatbotWindow.classList.add('active');
            chatbotLauncher.classList.add('hidden'); // Hide launcher when open
            
            // Trigger Greeting only ONCE when opened
            if (!isGreetingSent) {
                isGreetingSent = true;
                setTimeout(() => {
                    addBotMessageWithDelay('Dobrý deň! 👋 Vitajte v Kageod.<br>Ako vám pomôžem ?');
                }, 500);
            }
        } else {
            chatbotWindow.classList.remove('active');
            chatbotLauncher.classList.remove('hidden'); // Show launcher when closed
        }
    };

    chatbotLauncher.addEventListener('click', () => toggleChat());
    chatbotClose.addEventListener('click', () => toggleChat(false));

    // Automated POP-UP removed per user request - Chat now only opens on click

    // Simulation of typing and message popup
    const addBotMessageWithDelay = (htmlContent, delay = 1500) => {
        const msgContainer = document.querySelector('.chatbot-messages');
        
        // 1. Show Typing Indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        msgContainer.appendChild(typingIndicator);
        msgContainer.scrollTop = msgContainer.scrollHeight;

        // 2. Replace with real message after delay
        setTimeout(() => {
            typingIndicator.remove();
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message-bot';
            messageDiv.innerHTML = htmlContent;
            msgContainer.appendChild(messageDiv);
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }, delay);
    };

    const handleSend = async () => {
        const text = chatbotInput.value.trim();
        if (!text) return;

        // Add User message visually
        const msgContainer = document.querySelector('.chatbot-messages');
        const userMsg = document.createElement('div');
        userMsg.className = 'message-bot';
        userMsg.style.alignSelf = 'flex-end';
        userMsg.style.background = 'rgba(255, 255, 255, 0.2)';
        userMsg.style.borderRadius = '15px 15px 2px 15px';
        userMsg.textContent = text;
        msgContainer.appendChild(userMsg);

        chatbotInput.value = '';
        msgContainer.scrollTop = msgContainer.scrollHeight;

        // Bot Response with real Backend Call (Gemini Flash 2.0)
        try {
            // Show typing indicator immediately
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
            msgContainer.appendChild(typingIndicator);
            msgContainer.scrollTop = msgContainer.scrollHeight;

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();
            typingIndicator.remove();
            
            if (data.reply) {
                let replyText = data.reply;
                const navigateMatch = replyText.match(/\[NAVIGATE:(.+?)\]/);
                
                if (navigateMatch) {
                    const targetUrl = navigateMatch[1];
                    replyText = replyText.replace(/\[NAVIGATE:.+?\]/, '').trim();
                    
                    addBotMessageWithDelay(replyText, 0);
                    
                    // Auto-redirect after a short delay so user can read the message
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 800);
                } else {
                    addBotMessageWithDelay(replyText, 0);
                }
            } else {
                console.error('API did not return a reply:', data);
                addBotMessageWithDelay('Ospravedlňujem sa, ale momentálne neviem vygenerovať odpoveď. Skúste to prosím neskôr.', 500);
            }
        } catch (error) {
            console.error('Chat Error:', error);
            const typing = document.querySelector('.typing-indicator');
            if (typing) typing.remove();
            addBotMessageWithDelay('Ospravedlňujem sa, ale momentálne mám technické ťažkosti. Skúste to prosím neskôr.', 500);
        }
    };

    chatbotSend.addEventListener('click', handleSend);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
