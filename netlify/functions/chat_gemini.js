

// Inicializa el cliente. Utiliza la variable de entorno API_KEY
// Netlify la inyectará automáticamente desde tu configuración.
const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
});

// Este es el manejador principal de la función
exports.handler = async (event) => {
    // 1. Verificar el método (solo acepta POST)
    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            body: "Método no permitido. Usa POST." 
        };
    }
    
    // 2. Extraer el prompt del cuerpo de la solicitud (enviado desde chat_gemini.js)
    const data = JSON.parse(event.body);
    const userPrompt = data.prompt;

    if (!userPrompt) {
        return { 
            statusCode: 400, 
            body: JSON.stringify({ error: "Falta el campo 'prompt'." }) 
        };
    }

    try {
        // 3. Llamar a la API de Gemini
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // Modelo rápido y eficiente
            contents: userPrompt,
            config: {
                systemInstruction: "Eres un experto en el Universo Marvel y proporcionas respuestas concisas y precisas sobre personajes, equipos e historias.",
                temperature: 0.7 
            }
        });

        const geminiResponse = result.text.trim();

        // 4. Devolver la respuesta al frontend
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ response: geminiResponse }),
        };

    } catch (error) {
        console.error("Error al llamar a Gemini:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error al comunicarse con la IA." }),
        };
    }
};
