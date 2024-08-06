import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const prompt = `
            Quiero que actúes como un experto en películas y series de televisión. 
            Cuando te envíe un texto entre comillas " " donde describa mis preferencias y gustos sobre la película o serie que quisiera ver, 
            me recomendarás al menos 10 películas o series similares a las que me gustaría ver. 
            La respuesta debe ser en formato JSON, excluyendo cualquier comentario adicional. 
            Aquí tienes un ejemplo de cómo debe ser la estructura de respuesta en formato JSON:
            json
            {
                "message": "Una respuesta tuya",
                "movies": [
                    {"name": "movie 1", "type": "tv"},
                    {"name": "movie 2", "type": "movie"}
                ],
                "error": false
            }
            Si el texto es erróneo y no hablo de películas o estoy hablando de otros temas, 
            tu respuesta debe indicar un error en formato JSON, cambiando el valor de "error" a true:
            json
            {
                "message": "Una respuesta tuya",
                "movies": [],
                "error": true
            }
`;

export async function POST(request: Request) {
  const response = await openai.createChatCompletion({
    model: "gpt-4-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: `"quiero que me recomiendes peliculas o series similares  a harry potter"`,
      },
    ],
    max_tokens: 256,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
