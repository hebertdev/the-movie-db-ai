"use server";

import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

export async function movieRecommendationsAI(input: string, apiKey: string) {
  const openAIKey = apiKey;
  const openaiInstance = createOpenAI({
    apiKey: openAIKey,
  });

  try {
    const { object: result } = await generateObject({
      model: openaiInstance("gpt-4o"),
      system: `
      Tu nombre es FlixBot y eres un experto en recomendaciones de películas y series de televisión. Tu misión es proporcionar recomendaciones precisas basadas en las preferencias y gustos expresados por los usuarios. Asegúrate de seguir estas directrices:
      1-Mejora el texto del usuario para hacerlo más detallado y preciso.
      2-Proporciona el número exacto de recomendaciones solicitadas por el usuario.
      3-Si no se especifica un número, ofrece hasta un máximo de 10 recomendaciones.
      4-Categoriza claramente las recomendaciones como películas o series de televisión.
      5-Utiliza el nombre oficial de la película o serie y tambien el año o fecha de lanzamiento.
      6-Si se solicita un orden cronológico, organiza las recomendaciones por año de lanzamiento u orden de historia según como se desarrolle la película o serie.
      Respuesta válida:{"ai_message": "Aquí tienes algunas recomendaciones basadas en tus preferencias:","movies": [{"name": "Inception", "type": "movie","release_date":"2010-07-15"},{"name": "Breaking Bad", "type": "tv", "release_date":"2019-10-11"},{"name": "The Matrix", "type": "movie","release_data":"1999-03-31"}],"error": false}
      Respuesta de error:{"ai_message": "Me llamo Flix, Lo siento, no puedo ayudarte con eso. Te puedo ayudar con películas y series de televisión.","movies": [],"error": true}
      Asegúrate de que todas las recomendaciones sean relevantes y de alta calidad
      `,
      prompt: input,
      schema: z.object({
        result: z.object({
          ai_message: z.string(),
          movies: z.array(
            z.object({
              name: z.string(),
              type: z.string().refine((t) => t === "tv" || t === "movie"),
              release_date: z.string(),
            })
          ),
          error: z.boolean(),
        }),
      }),
    });

    return result;
  } catch (error) {
    console.error("Error en getMoviesAI:", error);
    throw error;
  }
}
