import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      const prompt = `Determine if the following text is inappropriate or offensive: "${text}". Respond with "inappropriate" if it is, otherwise respond with "appropriate".`;

      const completion = await openai.createCompletion({
        prompt: prompt,
        model: 'text-davinci-003',
        max_tokens: 10,
      });

      const output = completion.data.choices[0].text.trim().toLowerCase();
      res.status(200).json({ output });
    } catch (error) {
      console.error('Error in NLP processing:', error);
      res.status(500).json({ message: 'An error occurred while processing the request.' });
      }
      } else {
      res.status(405).json({ message: 'Method not allowed.' });
      }
      }