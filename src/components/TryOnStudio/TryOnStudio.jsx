import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../ImageUploader/ImageUploader.jsx';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation.jsx';
import TryOnPreview from '../TryOnPreview/TryOnPreview.jsx';
import useTryOn from '../../hooks/useTryOn.js';
import { useStore } from '../../context/StoreContext.jsx';
import { getProduct, products } from '../../data/products.js';
import { formatPrice } from '../../utils/format.js';

export default function TryOnStudio({ initialProductId }) {
  const [productId, setProductId] = useState(Number(initialProductId) || null);
  const product = getProduct(productId);
  const { status, stage, userImage, result, error, upload, generate, reset, clearPhoto } = useTryOn();
  const { saveLook, addToCart, toast } = useStore();
  const navigate = useNavigate();

  const busy = status === 'processing';
  const onGenerate = async () => {
    toast('Your look is being created...');
    if (await generate(product)) toast('Your AI try-on is ready!');
  };
  const onSave = () => saveLook({ title: `${product.name} Look`, image: result, productId: product.id });
  const onBuy = () => { addToCart(product); navigate('/profile'); };

  if (status === 'success') {
    return (
      <div className="studio-result">
        <TryOnPreview original={userImage} generated={result} />
        <aside className="selected">
          <h2>Selected outfit</h2>
          <p className="selected-name">{product.name}</p>
          <p className="price">{formatPrice(product.price)}</p>
          <div className="stack">
            <button className="btn btn-primary" onClick={onSave}>Save Look</button>
            <button className="btn btn-outline" onClick={reset}>Try Another</button>
            <button className="btn btn-gold" onClick={onBuy}>Buy Now</button>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <div className="studio">
      <div className="studio-step">
        <h3 className="step-title">Step 1 · Your photo</h3>
        <ImageUploader image={userImage} busy={status === 'uploading'} error={error} onFile={upload} onClear={clearPhoto} />
      </div>
      <div className="studio-step">
        <h3 className="step-title">Step 2 · Choose clothing</h3>
        <div className="carousel" role="listbox" aria-label="Select clothing">
          {products.map((p) => (
            <button key={p.id} role="option" aria-selected={p.id === productId} className={`carousel-item ${p.id === productId ? 'on' : ''}`} onClick={() => setProductId(p.id)}>
              <img src={p.image} alt="" />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
        <h3 className="step-title">Step 3 · Generate</h3>
        {busy ? <LoadingAnimation stage={stage} /> : (
          <>
            <button className="btn btn-ai btn-lg" disabled={!userImage || !product} onClick={onGenerate}>✨ Generate AI Try-On</button>
            {!userImage || !product ? <p className="muted small">{!userImage ? 'Upload a photo' : 'Select a garment'} to continue.</p> : null}
          </>
        )}
      </div>
    </div>
  );
}
