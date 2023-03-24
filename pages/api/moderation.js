import { useState } from 'react';

export default function ModerationPage() {
  const [inputText, setInputText] = useState('');
  const [moderationResults, setModerationResults] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/moderation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: inputText }),
    });
    
    const data = await response.json();
    setModerationResults(data.results[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <button type="submit">Check moderation</button>
      </form>

      {moderationResults && (
        <div>
          <p>Flagged: {moderationResults.flagged ? 'true' : 'false'}</p>
          <ul>
            {Object.entries(moderationResults.categories).map(([category, isViolated]) => (
              <li key={category}>
                {category}: {isViolated ? 'true' : 'false'}
              </li>
            ))}
          </ul>
          <ul>
            {Object.entries(moderationResults.category_scores).map(([category, score]) => (
              <li key={category}>
                {category}: {score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
