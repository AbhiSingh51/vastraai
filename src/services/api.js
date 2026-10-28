const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Could not read the image. Try a different photo.'));
    image.src = src;
  });

/**
 * Generates an AI try-on preview.
 *
 * >>> REAL AI API GOES HERE <<<
 * Replace the mock below with a request to your backend, e.g.
 *   const res = await fetch(`${import.meta.env.VITE_API_URL}/try-on`, { method: 'POST', body: formData });
 *   return { imageUrl: (await res.json()).imageUrl };
 * Keep the return shape ({ imageUrl }) so the hook and UI need no changes.
 */
export const generateTryOn = async (userImage, garmentImage) => {
  const [person, garment] = await Promise.all([loadImage(userImage), loadImage(garmentImage)]);
  await new Promise((resolve) => setTimeout(resolve, 3800)); // simulated processing time

  const canvas = document.createElement('canvas');
  canvas.width = person.width;
  canvas.height = person.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(person, 0, 0);
  const width = canvas.width * 0.62;
  ctx.globalAlpha = 0.88;
  ctx.drawImage(garment, (canvas.width - width) / 2, canvas.height * 0.16, width, width * 1.25);
  return { imageUrl: canvas.toDataURL('image/jpeg', 0.85) };
};
