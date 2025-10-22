document.getElementById('ai-query-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita que la página se recargue

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
    sendButton.textContent = 'Buscando en IA...';

    // Mostrar mensaje de carga de la IA
    const loadingMessage = document.createElement('p');
    loadingMessage.innerHTML = '<strong>Asistente:</strong> Escribiendo...';
    loadingMessage.id = 'loading-message';
    chatContainer.appendChild(loadingMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll al final

    try {
        // --- 2. LLAMADA A LA FUNCIÓN SERVERLESS DE NETLIFY ---
        // Esta es la URL estándar de Netlify para tu función gemini-chat.js
        const url = '/.netlify/functions/gemini-chat'; 
        
        const response = await fetch(url, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Enviamos el mensaje del usuario al servidor
            body: JSON.stringify({ prompt: userPrompt })
        });

        // 3. Manejo de Errores de Conexión y HTTP
        if (!response.ok) {
            // Captura errores de red o códigos de estado 4xx/5xx de la función
            throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // --- 4. Mostrar la respuesta de Gemini ---
        // Asumimos que la función serverless devuelve { response: "..." }
        const gptResponse = data.response || "Lo siento, la IA devolvió una respuesta vacía.";

        // Reemplazar el mensaje de carga con la respuesta real
        const loader = document.getElementById('loading-message');
        if (loader) loader.remove(); 
        
        chatContainer.innerHTML += `<p><strong>Asistente:</strong> ${gptResponse}</p>`;

    } catch (error) {
        console.error('Error en la comunicación con el servidor IA:', error);
        
        // Manejo de errores visibles para el usuario
        const loader = document.getElementById('loading-message');
        if (loader) loader.remove(); 
        
        // El mensaje de error visible
        chatContainer.innerHTML += `<p class="text-red-600">
            <strong>Error:</strong> No se pudo conectar con el servidor IA. 
            Detalle: ${error.message}. (Verifique logs de Netlify si el error persiste).
        </p>`;
    } finally {
        // --- 5. Restablecer el estado del formulario ---
        userPromptElement.disabled = false;
        sendButton.disabled = false;
        sendButton.textContent = 'Enviar';
        userPromptElement.focus(); // Devolver el foco al input
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll al final
    }
});