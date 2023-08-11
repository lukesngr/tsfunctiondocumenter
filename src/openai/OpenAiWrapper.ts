import { Configuration, OpenAIApi } from 'openai';
export default class OpenAI {
    private openai: OpenAIApi
    constructor(apiKey: string) {
        this.openai = new OpenAIApi(new Configuration({ apiKey }));
    }
    async generateText(prompt: string, model: string, max_tokens: number, temperature: number = 0.85): Promise<string> {
        try {
            const res = await this.openai.createCompletion({model,
                prompt,
                max_tokens,
                n: 1,
                temperature,
            });
            console.log(`request cost: ${res.data.usage.total_tokens} tokens`);
            console.log(res);
            return res.data.choices[0].text;
        } catch (error) {
            throw error;
        }
    }
}