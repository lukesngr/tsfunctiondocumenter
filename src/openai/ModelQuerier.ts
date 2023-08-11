import { Configuration, OpenAIApi } from 'openai';
export default class OpenAI {
    private openai: OpenAIApi
    constructor(apiKey: string) {
        this.openai = new OpenAIApi(new Configuration({ apiKey }));
    }

    async documentFunction(tsFunction: string): Promise<string> {
        try {
            const response = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    "role": "system",
                    "content": "Can you document this TypeScript function in a JavaDoc style way? "
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
              });;
            console.log(`request cost: ${response.data.usage.total_tokens} tokens`);
            console.log(response);
            return response.data.choices[0].text;
        } catch (error) {
            throw error;
        }
    }
}