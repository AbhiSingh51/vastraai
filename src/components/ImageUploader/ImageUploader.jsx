import { useRef, useState } from 'react';

export default function ImageUploader({ image, busy, error, onFile, onClear }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const drop = (event) => {
    event.preventDefault();
    setDragging(false);
    onFile(event.dataTransfer.files[0]);
  };
  return (
    <div
      className={`uploader ${dragging ? 'drag' : ''} ${image ? 'has-image' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={drop}
    >
      {image ? (
        <>
          <img src={image} alt="Your uploaded photo" />
          <button className="btn btn-outline btn-sm" onClick={onClear}>Change photo</button>
        </>
      ) : (
        <>
          <span className="uploader-icon" aria-hidden="true">📷</span>
          <h3>{busy ? 'Reading your photo...' : 'Upload Your Photo'}</h3>
          <p className="muted">Full-body photo works best</p>
          <button className="btn btn-primary" onClick={() => inputRef.current.click()} disabled={busy}>Upload Photo</button>
        </>
      )}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => { onFile(e.target.files[0]); e.target.value = ''; }} aria-label="Choose your photo" />
      {error && <p className="error" role="alert">{error}</p>}
    </div>
  );
}
