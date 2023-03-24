// pages/api/moderateMessage.js
import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const moderationResponse = await openai.createModeration({
        input: message,
        model: 'text-moderation-001', // Replace with the appropriate moderation model when available
      });

      // Process the moderationResponse and return the result as needed
      function processModerationResponse(response) {
        const categoryScores = response.data?.result?.category_scores || {};
      
        let blocked = '';
        let flagged = '';
      
        for (const category in categoryScores) {
          if (categoryScores.hasOwnProperty(category)) {
            const score = categoryScores[category];
      
            if (score > 0.9) {
              blocked += `(${category}: ${score}) `;
            } else if (score > 0.5) {
              flagged += `(${category}: ${score}) `;
            }
          }
        }
      
        return { blocked, flagged };
      }      

      const { blocked, flagged } = processModerationResponse(moderationResponse);

      res.status(200).json({ blocked, flagged });
      } catch (error) {
      console.error('Error in message moderation:', error);
      res.status(500).json({ message: 'An error occurred while moderating the message.' });
      }
   } else {
    res.status(405).json({ message: 'Method not allowed.' });
    }
    }
