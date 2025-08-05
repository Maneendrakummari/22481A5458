import React, { useState } from 'react';
import './Styles.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleShorten = () => {
    if (longUrl.trim() === '') return;

    setIsDisabled(true); // Disable inputs

    const fakeShortUrl = 'https://short.ly/' + Math.random().toString(36).substring(7);

    setShortenedUrls([
      ...shortenedUrls,
      { original: longUrl, short: fakeShortUrl }
    ]);

    setLongUrl('');
    setIsDisabled(false); // Optional: re-enable input/button if you want multiple URLs
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          disabled={isDisabled}
        />
        <button onClick={handleShorten} disabled={isDisabled}>Shorten</button>
      </div>

      {shortenedUrls.map((item, index) => (
        <div className="url-box" key={index}>
          <p><strong>Original:</strong> <a href={item.original} target="_blank" rel="noopener noreferrer">{item.original}</a></p>
          <p><strong>Shortened:</strong> <a href={item.short} target="_blank" rel="noopener noreferrer">{item.short}</a></p>
        </div>
      ))}
    </div>
  );
}

export default App;
