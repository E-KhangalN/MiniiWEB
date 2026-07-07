import { useEffect, useRef, useState } from 'react';

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
  spotlightRadius: number;
}

export default function RevealLayer({ image, cursorX, cursorY, spotlightRadius }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealDivRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  // Update canvas size on window resize
  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Redraw gradient mask when cursor coordinates change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Synchronize canvas coordinate dimensions with window dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Clear previous drawing
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Build the radial gradient at (cursorX, cursorY)
    const grad = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      spotlightRadius
    );
    
    // User stops: 0 -> rgba(255,255,255,1), 0.4 -> 1, 0.6 -> 0.75, 0.75 -> 0.4, 0.88 -> 0.12, 1 -> 0
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.75)');
    grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.4)');
    grad.addColorStop(0.88, 'rgba(255, 255, 255, 0.12)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, spotlightRadius, 0, Math.PI * 2);
    ctx.fill();

    try {
      const dataUrl = canvas.toDataURL();
      if (revealDivRef.current) {
        revealDivRef.current.style.maskImage = `url(${dataUrl})`;
        revealDivRef.current.style.webkitMaskImage = `url(${dataUrl})`;
        revealDivRef.current.style.maskSize = '100% 100%';
        revealDivRef.current.style.webkitMaskSize = '100% 100%';
        revealDivRef.current.style.maskRepeat = 'no-repeat';
        revealDivRef.current.style.webkitMaskRepeat = 'no-repeat';
      }
    } catch (e) {
      console.warn('Mask drawing issue:', e);
    }
  }, [cursorX, cursorY, dimensions, spotlightRadius]);

  return (
    <>
      <canvas
        id="spotlight-canvas"
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-25"
        style={{ display: 'none' }}
      />
      <div
        id="reveal-layer"
        ref={revealDivRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
    </>
  );
}
