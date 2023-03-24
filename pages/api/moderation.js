import { useState } from 'react';

export default async function handler(req, res) {
  const { input } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/engines/content-filter-alpha-2/inputs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompts: [`Is the following text appropriate for a professional setting?`],
        examples: [
          [`This is a great product!`],
          [`Your work is amazing.`],
          [`I hate this so much.`],
          [`You are terrible at your job.`],
          [`I'm feeling really down today.`],
        ],
        query: input,
        max_examples: 3,
        search_model: 'ada',
        model: 'content-filter-alpha-2',
        temperature: 0,
      }),
    });
    const data = await response.json();

    res.status(200).json({
      results: data.data,
    });
  } catch (error) {
    console.error('Error in moderation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
