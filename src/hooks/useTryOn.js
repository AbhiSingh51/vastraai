import { useCallback, useState } from 'react';
import { generateTryOn } from '../services/api.js';

export const PROCESSING_STAGES = ['Analyzing your photo', 'Applying garment', 'Adjusting fit', 'Generating preview'];
const MAX_FILE_MB = 8;

// status: idle | uploading | processing | success | error
export default function useTryOn() {
  const [status, setStatus] = useState('idle');
  const [stage, setStage] = useState(0);
  const [userImage, setUserImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fail = (message) => { setError(message); setStatus('error'); };

  const upload = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return fail('Choose an image file (JPG or PNG).');
    if (file.size > MAX_FILE_MB * 1024 * 1024) return fail(`Choose a photo smaller than ${MAX_FILE_MB} MB.`);
    setStatus('uploading');
    setError(null);
    setResult(null);
    const reader = new FileReader();
    reader.onload = () => { setUserImage(reader.result); setStatus('idle'); };
    reader.onerror = () => fail('Could not read that file. Try another photo.');
    reader.readAsDataURL(file);
  }, []);

  const generate = useCallback(async (product) => {
    setStatus('processing');
    setStage(0);
    setError(null);
    const timer = setInterval(() => setStage((s) => Math.min(s + 1, PROCESSING_STAGES.length - 1)), 950);
    try {
      const { imageUrl } = await generateTryOn(userImage, product.cutout);
      setResult(imageUrl);
      setStatus('success');
      return imageUrl;
    } catch (err) {
      fail(err.message);
      return null;
    } finally {
      clearInterval(timer);
    }
  }, [userImage]);

  const reset = useCallback(() => { setResult(null); setError(null); setStatus('idle'); }, []);
  const clearPhoto = useCallback(() => { setUserImage(null); reset(); }, [reset]);

  return { status, stage, userImage, result, error, upload, generate, reset, clearPhoto };
}
