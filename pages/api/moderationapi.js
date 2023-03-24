import backoff from 'backoff';
import fetch from 'node-fetch';

class ModerationApi {
  constructor(openaiKey) {
    this.openaiKey = openaiKey;
  }

  // Define backoff handler function
  backoffHandlerHttp(details) {
    console.warn(
      `Error in sendModerationsRequest. Retrying in ${details?.wait.toFixed(
        1
      )} seconds. Error details: `,
      details
    );
  }

  // Define function to send a request to OpenAI Moderation API
  async sendModerationsRequest(text) {
    // Use backoff and node-fetch to send the request with retry
    const sendModerationsRequestWithRetry = backoff.call(
      this.sendModerationsRequestInternal.bind(this),
      text
    );
    return await sendModerationsRequestWithRetry();
  }

  // Internal function to send a request to OpenAI Moderation API
  async sendModerationsRequestInternal(text) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.openaiKey}`,
    };
    const payload = { input: text };

    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${await response.text()}`
      );
    }

    return await response.json();
  }
}

export default ModerationApi;
