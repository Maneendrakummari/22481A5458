import React, { useState, useEffect } from 'react';
import './Styles.css'; 


function App() {
  const [longUrl, setLongUrl] = useState('');
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    setUrls(storedUrls);
  }, []);

  const generateShortCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const handleShorten = () => {
    if (!longUrl.trim()) return;

    const shortCode = generateShortCode();
    const shortUrl = `https://short.ly/${shortCode}`;
    const newEntry = { original: longUrl, short: shortUrl };

    const updatedUrls = [newEntry, ...urls];
    setUrls(updatedUrls);
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
    setLongUrl('');
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={handleShorten}>Shorten</button>
      </div>

      <div className="url-list">
        {urls.map((url, index) => (
          <div key={index} className="url-item">
            <p><strong>Original:</strong> <a href={url.original} target="_blank" rel="noopener noreferrer">{url.original}</a></p>
            <p><strong>Shortened:</strong> <a href={url.original} target="_blank" rel="noopener noreferrer">{url.short}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
