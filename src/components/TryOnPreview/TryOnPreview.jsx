import { useState } from 'react';

export default function TryOnPreview({ original, generated }) {
  const [mode, setMode] = useState('slider');
  const [position, setPosition] = useState(50);
  return (
    <div className="preview">
      {mode === 'slider' ? (
        <div className="compare">
          <img src={generated} alt="AI try-on result" />
          <img className="compare-top" src={original} alt="Your original photo" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} />
          <span className="compare-line" style={{ left: `${position}%` }} aria-hidden="true"><b>↔</b></span>
          <input type="range" min="0" max="100" value={position} onChange={(e) => setPosition(Number(e.target.value))} aria-label="Compare original and AI preview" />
          <span className="tag left">Original</span><span className="tag right">AI Preview</span>
        </div>
      ) : (
        <div className="side-by-side">
          <figure><img src={original} alt="Your original photo" /><figcaption>Original</figcaption></figure>
          <figure><img src={generated} alt="AI try-on result" /><figcaption>AI Preview</figcaption></figure>
        </div>
      )}
      <button className="btn btn-outline" onClick={() => setMode(mode === 'slider' ? 'side' : 'slider')}>
        Compare: {mode === 'slider' ? 'view side by side' : 'use slider'}
      </button>
    </div>
  );
}
