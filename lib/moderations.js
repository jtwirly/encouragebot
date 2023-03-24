// lib/moderation.js
import backoff from 'backoff';
import fetch from 'node-fetch';

export async function sendModerationsRequest(text) {
  // Use backoff to handle any errors that occur:
  const backoffHandler = backoff.exponential({
    initialDelay: 500,
    maxDelay: 30000,
  });

  return new Promise((resolve, reject) => {
    backoffHandler.failAfter(5);

    backoffHandler.on('backoff', () => {
      console.warn('Moderation API failed, backing off and retrying...');
    });

    backoffHandler.on('ready', async (number, delay) => {
      try {
        // Use fetch to send the above request to the OpenAI Moderations API:
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`,
        };
        const payload = { input: text };
        const response = await fetch('https://api.openai.com/v1/moderations', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }

        const data = await response.json();
        resolve(data);
      } catch (error) {
        console.warn(`Moderation API request failed: ${error.message}`);
        backoffHandler.back
