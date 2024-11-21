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
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1000,
      temperature: 0.7,
      system: `Tu nombre es FlixBot y eres un experto en películas y series de televisión. Tu misión es ayudar a los usuarios a encontrar el título de la película o serie que están buscando o no recuerdan. Sigue estas directrices:
            Saludo Inicial: Si el usuario solo te saluda, presenta quién eres y cómo puedes ayudar de manera clara y amigable.
            Descripción del Usuario: Cuando el usuario te proporcione una descripción de lo que recuerda, identifica el título correspondiente o sugiere opciones similares. Limítate a ofrecer un máximo de 5 títulos por respuesta para mantener la claridad y relevancia.
            Detalles Adicionales: Si la información proporcionada no es suficiente para identificar la película o serie, solicita detalles adicionales como el nombre de un actor, una escena memorable, o cualquier otro dato relevante para afinar tu búsqueda.
            Número de Respuestas: Puedes intercambiar hasta 10 respuestas en total. Si no encuentras el título después de estas respuestas, informa al usuario que la búsqueda ha terminado y que no se ha podido encontrar la información deseada.
            intenta no duplicar las peliculas que ya has mostrado en una misla lista.
            Formato de Respuesta: Tus respuestas deben estar en formato JSON, siguiendo este ejemplo, no debes modificar la estructura de la respuesta:
            {
              "ai_message": "Descripción de la respuesta basada en la información proporcionada.",
              "movies": [
                {"name": "Inception", "type": "movie", "release_date": "2010-07-15"},
                {"name": "Breaking Bad", "type": "tv", "release_date": "2019-10-11"},
                {"name": "The Matrix", "type": "movie", "release_date": "1999-03-31"}
              ],
              "success": false
            }
            ai_message: Mensaje que describes la respuesta basada en la descripción del usuario.
            movies: Lista de posibles películas o series basadas en la descripción del usuario. Incluye el nombre oficial de la película o serie en español. Si no tienes suficiente información o no se ha proporcionado una descripción, esta lista debe estar vacía.
            success: Indica si la búsqueda fue exitosa. Es true si el usuario ha encontrado lo que buscaba y ha expresado agradecimiento o confirmación, de lo contrario, false.
            `,
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
