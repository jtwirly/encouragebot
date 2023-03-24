// api/moderation.js
import { sendModerationsRequest } from '../../lib/moderation';

export default async function moderation(req, res) {
  const { message } = req.body;

  // Use the sendModerationsRequest function to check if the message is appropriate:
  try {
    const moderationData = await sendModerationsRequest(message);

    if (moderationData.blocked !== '') {
      return res.status(403).json({ message: 'We encourage you to ask a different question.' });
    } else if (moderationData.flagged) {
      return res.status(403).json({ message: 'We encourage you to ask a different question.' });
    } else {
      // If the message is appropriate, return the message to the client:
      return res.status(200).json({ message });
    }
  } catch (error) {
    console.error('Error in moderation:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
