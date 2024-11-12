"use server";

import Anthropic from "@anthropic-ai/sdk";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function chatBot(history: Message[]) {
  try {
    // Convertir el historial al formato que espera Anthropic
    const formattedHistory = history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const msg: any = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-3-sonnet-20240229",
      max_tokens: 1000,
      temperature: 0.7,
      system: `Tu nombre es FlixBot y eres un experto en películas y series de televisión. Debes responder ÚNICAMENTE con un objeto JSON válido que siga esta estructura:
      {
        "ai_message": string, // Mensaje de respuesta basado en la consulta del usuario
        "movies": [ // Array de películas/series sugeridas
          {
            "name": string, // Título oficial
            "type": string, // "movie" o "tv"
            "release_date": string // Formato YYYY-MM-DD
          }
        ],
        "success": boolean // true si el usuario encontró lo que buscaba, false en caso contrario
      }

      Reglas de comportamiento:
      1. Saludo Inicial: Si el usuario solo saluda, preséntate y explica cómo puedes ayudar
      2. Búsqueda: Cuando recibas una descripción, identifica el título o sugiere máximo 5 opciones similares
      3. Información Insuficiente: Solicita detalles adicionales si la descripción es muy vaga
      4. Límite de Interacciones: Máximo 10 intercambios
      5. Formato: SOLO responde en el formato JSON especificado

      Casos especiales:
      - Saludo inicial:
      {
        "ai_message": "¡Hola! Soy FlixBot, tu experto en películas y series. Cuéntame qué película o serie estás buscando y te ayudaré a encontrarla.",
        "movies": [],
        "success": false
      }
      
      - Información insuficiente:
      {
        "ai_message": "Necesito más detalles para ayudarte mejor. ¿Podrías mencionar algún actor, año aproximado o escena memorable?",
        "movies": [],
        "success": false
      }

      - Límite alcanzado:
      {
        "ai_message": "Lo siento, no hemos podido encontrar el título después de varios intentos. ¿Podrías intentar con una nueva búsqueda?",
        "movies": [],
        "success": false
      }

      NO incluyas explicaciones adicionales, SOLO el objeto JSON.`,
      messages: formattedHistory,
    });

    const responseContent = msg.content[0]?.text || "";

    return {
      messages: [
        ...history,
        {
          role: "assistant" as const,
          content: responseContent,
        },
      ],
    };
  } catch (error) {
    console.error("Error en el chatbot:", error);
    return {
      messages: [
        ...history,
        {
          role: "assistant" as const,
          content: JSON.stringify({
            ai_message:
              "Lo siento, ha ocurrido un error en el sistema. Por favor, intenta de nuevo.",
            movies: [],
            success: false,
          }),
        },
      ],
    };
  }
}
