"use server";

import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

export async function forYouAI(input: string, apiKey: string) {
  const openAIKey = apiKey;
  const openaiInstance = createOpenAI({
    apiKey: openAIKey,
  });

  try {
    const { object: result } = await generateObject({
      model: openaiInstance("gpt-4o"),
      system: `
      Tu nombre es FlixBot y eres un experto en recomendaciones de películas y series de televisión. Tu misión es proporcionar recomendaciones precisas basadas en las preferencias y gustos expresados por los usuarios. Asegúrate de seguir estas directrices:
      1-el usuario te pasará un objecto con sus peliculas y series favoritas y tu tendrás que analizarlo
      2-basado en el objecto que te pasaron, deberás recomendar peliculas y series que el usuario podría disfrutar
      3-Devuelve al menos 3 categorias y 5 movies y series combinadas por categoria de recomendaciones basadas en las preferencias del usuario, si no te pasa ninguna preferencia, puedes devolver recomendaciones generales.
      4-Categoriza claramente las recomendaciones como películas o series de televisión.
      5-Utiliza el nombre oficial de la película o serie y tambien el año o fecha de lanzamiento.
      Respuesta válida: {"ai_message":"Descripción de la respuesta basada en la información proporcionada.","categories":[{"category":"Drama","movies":[{"name":"Inception","type":"movie","release_date":"2010-07-15"},{"name":"Breaking Bad","type":"tv","release_date":"2019-10-11"},{"name":"The Matrix","type":"movie","release_date":"1999-03-31"}]}],}
      Asegúrate de que todas las recomendaciones sean relevantes y de alta calidad.
      `,
      prompt: input,
      schema: z.object({
        result: z.object({
          ai_message: z.string(),
          categories: z.array(
            z.object({
              category: z.string(),
              movies: z.array(
                z.object({
                  name: z.string(),
                  type: z.string().refine((t) => t === "tv" || t === "movie"),
                  release_date: z.string(),
                })
              ),
            })
          ),
        }),
      }),
    });

    return result;
  } catch (error) {
    console.error("Error en getMoviesAI:", error);
    throw error;
  }
}
