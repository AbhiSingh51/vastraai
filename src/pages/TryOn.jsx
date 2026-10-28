import { useSearchParams } from 'react-router-dom';
import TryOnStudio from '../components/TryOnStudio/TryOnStudio.jsx';

export default function TryOn() {
  const [params] = useSearchParams();
  return (
    <div className="container section">
      <h1 className="page-title">AI Try-On</h1>
      <p className="muted lead">Upload a photo, pick an outfit and see the result in seconds.</p>
      <TryOnStudio key={params.get('product') || 'none'} initialProductId={params.get('product')} />
    </div>
  );
}
