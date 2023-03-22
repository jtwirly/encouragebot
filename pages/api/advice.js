const { Configuration, OpenAIApi } = require("openai");

// Setup OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// List of banned words and phrases
const bannedWords = ["kill", "hurt", "steal", "cheat", "lie", "murder", "suicide", "bully"];

// Filter function to replace banned words and phrases
const filterResponse = (text) => {
    bannedWords.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        text = text.replace(regex, "do something else");
    });
    return text;
};

const handler = async (req, res) => {
    const prompt = req.query.prompt;
    console.log(`Received a request with query: ${JSON.stringify(req.query)}`);
    try {
        switch (req.method) {
            case 'GET':
                await getAdvice(req, res);
                break;
            default:
                res.setHeader('Allow', ['GET'])
                res.status(405).end(`Method ${req.method} Not Allowed`)
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const getAdvice = async (req, res) => {
    try {
        console.log(`Received a request with query: ${JSON.stringify(req.query)}`);
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: `Dear AIbby, give me some polite and family-friendly advice on ${req.query.prompt}. Thank you in advance. Tone: polite, family-friendly`,
            max_tokens: 200,
            n: 1,
            stop: null,
        });
        const response = filterResponse(completion.data.choices[0].text);
        console.log(`Sending response: ${response}`);
        res.status(200).json({ text: `Here's some advice: ${response}. Remember, this advice is for informational purposes only and should not be taken as professional advice.` });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send(error.message);
        }
    }
};

export default handler;
