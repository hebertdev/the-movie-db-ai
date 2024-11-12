"use server";

import Anthropic from "@anthropic-ai/sdk";

// Inicialización del cliente de Anthropic con tu API Key
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function movieRecommendationsAI(input: string) {
  try {
    // Llamada a la API de Anthropic para generar el objeto
    const msg: any = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-3-sonnet-20240229",
      max_tokens: 1000,
      temperature: 0.5, // Ajusta la temperatura si deseas más creatividad
      system:
        'Tu nombre es FlixBot y eres un experto en recomendaciones de películas y series de televisión. Debes responder ÚNICAMENTE con un objeto JSON válido que siga esta estructura:\n              {\n                "ai_message": string, // Mensaje explicativo de las recomendaciones\n                "movies": [ // Array de películas/series recomendadas\n                  {\n                    "name": string, // Título oficial\n                    "type": string, // "movie" o "tv"\n                    "release_date": string, // Formato YYYY-MM-DD\n                    "genre": string, // Género principal\n                    "rating": number // Puntuación de 1 a 10\n                  }\n                ],\n                "error": boolean // true si hay error, false si es respuesta válida\n              }\n              Reglas:\n              1. Analiza y mejora la consulta del usuario para hacerla más específica\n              2. Proporciona el número exacto de recomendaciones solicitadas\n              3. Si no se especifica cantidad, incluye máximo 10 recomendaciones\n              4. Usa solo títulos oficiales y fechas precisas\n              5. Si se pide orden cronológico, ordena por release_date\n              6. En caso de no poder procesar la solicitud, devuelve objeto de error:\n              {\n                "ai_message": "Lo siento, no puedo procesar esa solicitud. Por favor, pregunta por películas o series.",\n                "movies": [],\n                "error": true\n              }\n              NO incluyas explicaciones adicionales, SOLO el objeto JSON.',
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
    });

    // Aquí utilizamos `any` para evitar el error de tipo.
    const responseData: any =
      msg.content && msg.content[0]?.text
        ? JSON.parse(msg.content[0].text)
        : {
            ai_message: "Lo siento, hubo un error al procesar tu solicitud.",
            movies: [],
            error: true,
          };

    return responseData;
  } catch (error) {
    console.error("Error al obtener recomendaciones de películas:", error);
    return {
      ai_message: "Lo siento, hubo un error al procesar tu solicitud.",
      movies: [],
      error: true,
    };
  }
}
