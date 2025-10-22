document.getElementById('ai-query-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Detiene el envío normal del formulario (para evitar recarga)

    const userPromptElement = document.getElementById('user-prompt');
    const userPrompt = userPromptElement.value.trim();
    const chatContainer = document.getElementById('chat-container');
    const sendButton = document.getElementById('send-button');

    if (!userPrompt) return;

    // --- 1. Mostrar la pregunta del usuario ---
    chatContainer.innerHTML += `<p class="text-right text-blue-800"><strong>Tú:</strong> ${userPrompt}</p>`;
    userPromptElement.value = ''; // Limpiar campo de entrada
    
    // Desactivar el input y el botón mientras se procesa la solicitud
    userPromptElement.disabled = true;
    sendButton.disabled = true;
    sendButton.textContent = 'Procesando...';

    // Mostrar mensaje de carga de la IA
    const loadingMessage = document.createElement('p');
    loadingMessage.innerHTML = '<strong>Asistente:</strong> Escribiendo...';
    loadingMessage.id = 'loading-message';
    chatContainer.appendChild(loadingMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll al mensaje más reciente

    try {
        // --- 2. Llamada a tu servidor Backend Intermediario ---
        // ESTO ES UNA SIMULACIÓN. NECESITAS UN SERVIDOR REAL PARA ESTA URL.
        const response = await fetch('/api/gemini-chat', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Enviamos el mensaje del usuario al servidor
            body: JSON.stringify({ prompt: userPrompt })
        });

        if (!response.ok) {
            throw new Error('Error de servidor: ' + response.statusText);
        }

        const data = await response.json();
        
        // --- 3. Mostrar la respuesta de Gemini ---
        const gptResponse = data.response || "Lo siento, no pude obtener una respuesta de la IA.";

        // Reemplazar el mensaje de carga con la respuesta real
        const loader = document.getElementById('loading-message');
        if (loader) loader.remove(); 
        
        chatContainer.innerHTML += `<p><strong>Asistente:</strong> ${gptResponse}</p>`;

    } catch (error) {
        console.error('Error en la llamada a la API:', error);
        
        // Manejo de errores
        const loader = document.getElementById('loading-message');
        if (loader) loader.remove(); 
        
        chatContainer.innerHTML += `<p class="text-red-600"><strong>Error:</strong> No se pudo conectar con el servidor IA. ${error.message}</p>`;
    } finally {
        // --- 4. Restablecer el estado del formulario ---
        userPromptElement.disabled = false;
        sendButton.disabled = false;
        sendButton.textContent = 'Enviar';
        userPromptElement.focus(); // Devolver el foco al input
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll al final
    }
});