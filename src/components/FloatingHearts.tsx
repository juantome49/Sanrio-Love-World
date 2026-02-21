import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const FloatingHearts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<Heart[]>([]);

  useEffect(() => {
    const colors = ['#FFB7C5', '#FF69B4', '#DDA0DD', '#87CEEB', '#FFFACD', '#FFDAB9'];
    const hearts: Heart[] = [];
    
    for (let i = 0; i < 25; i++) {
      hearts.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    heartsRef.current = hearts;

    // Animate hearts with GSAP
    const heartElements = containerRef.current?.querySelectorAll('.floating-heart');
    heartElements?.forEach((heart, index) => {
      gsap.to(heart, {
        y: '-120vh',
        rotation: Math.random() * 360 - 180,
        duration: hearts[index]?.duration || 10,
        delay: hearts[index]?.delay || 0,
        repeat: -1,
        ease: 'none',
        modifiers: {
          y: gsap.utils.unitize((y) => parseFloat(y) % window.innerHeight + window.innerHeight),
        },
      });
    });

    return () => {
      gsap.killTweensOf('.floating-heart');
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {heartsRef.current.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart absolute"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
            width: `${heart.size}px`,
            height: `${heart.size}px`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={heart.color}
            className="w-full h-full opacity-60"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
