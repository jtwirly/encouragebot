import { Configuration, OpenAIApi } from 'openai';

// Set up the OpenAI API key
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;
    console.log('text ===', text, process.env.OPENAI_API_KEY);

    try {
      const prompt = `If the content in "${text}" is inappropriate or offensive, please provide a message saying "We encourage you to ask a different question.". If the content is not appropriate or offensive, please Give me some encouragement as if you were a kind, supportive and ethical friend on ${text}`;

      // const response = await openai.createCompletion({
      //   // engine: 'davinci-codex', // You can use other engines like 'davinci', 'curie', or 'curie-codex'
      //   prompt: prompt,
      //   model: "text-davinci-003",
      //   // max_tokens: 100,
      //   // n: 1,
      //   // stop: null,
      //   // temperature: 1,
      // });

      // const output = response.choices[0].text.trim();
      try {
        const completion = await openai.createCompletion({
            prompt: prompt,
            model: "text-davinci-003",
            max_tokens: 200,
            // n: 1,
            // stop: null,
            // temperature: 1,
        });
        console.log(completion.data.choices[0].text);
        const output = completion.data.choices[0].text.trim();
        res.status(200).json({ output });
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }

      // res.status(200).json({ output });
    } catch (error) {
      console.error('Error in moderation:', error);
      res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
