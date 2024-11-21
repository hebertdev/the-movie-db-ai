"use server";

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function forYouAI(input: string) {
  try {
    const msg: any = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1000,
      temperature: 0.5,
      system: `Tu nombre es FlixBot y eres un experto en recomendaciones de películas y series de televisión. Debes responder ÚNICAMENTE con un objeto JSON válido que siga esta estructura:
      {
        "ai_message": string, // Mensaje explicativo del análisis y recomendaciones
        "categories": [ // Array de categorías
          {
            "category": string, // Nombre de la categoría
            "movies": [ // Array de películas/series en esta categoría
              {
                "name": string, // Título oficial
                "type": string, // "movie" o "tv"
                "release_date": string // Formato YYYY-MM-DD
              }
            ]
          }
        ],
        "error": boolean // true si hay error, false si es respuesta válida
      }
      Reglas:
      1. Analiza el objeto de preferencias del usuario para entender sus gustos
      2. Proporciona al menos 3 categorías diferentes de recomendaciones
      3. Incluye mínimo 5 películas/series combinadas por categoría
      4. Usa solo títulos oficiales y fechas precisas
      5. Si no hay preferencias, proporciona recomendaciones generales de calidad
      6. En caso de no poder procesar la solicitud, devuelve:
      {
        "ai_message": "Lo siento, no puedo procesar esa solicitud. Por favor, proporciona información sobre tus preferencias.",
        "categories": [],
        "error": true
      }
      NO incluyas explicaciones adicionales, SOLO el objeto JSON.`,
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
    });

    const responseData: any =
      msg.content && msg.content[0]?.text
        ? JSON.parse(msg.content[0].text)
        : {
            ai_message: "Lo siento, hubo un error al procesar tu solicitud.",
            categories: [],
            error: true,
          };

    return responseData;
  } catch (error) {
    console.error("Error al obtener recomendaciones:", error);
    return {
      ai_message: "Lo siento, hubo un error al procesar tu solicitud.",
      categories: [],
      error: true,
    };
  }
}
