import { Configuration, OpenAIApi } from 'openai';
export default class OpenAI {
    private openai: OpenAIApi
    constructor(apiKey: string) {
        this.openai = new OpenAIApi(new Configuration({ apiKey }));
    }

    async queryModel(tsFunction: string, question: string): Promise<string> {
        try {
            const response = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    "role": "system",
                    "content": question
                  },
                  {
                    "role": "user",
                    "content": tsFunction
                  }
                ],
                temperature: 0,
                max_tokens: 1024,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              });
            return response.data.choices[0].message?.content ?? '';
        } catch (error) {
            throw error;
        }
    }
}