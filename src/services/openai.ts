import { Configuration, OpenAIApi } from "openai-edge";

export async function verifyToken(token: string) {
  const configuration = new Configuration({
    apiKey: token,
  });
  const openai = new OpenAIApi(configuration);
  const data = await openai.createCompletion({
    model: "davinci-002",
    prompt: "cuanto es 1 + 1?",
  });

  return data;
}
