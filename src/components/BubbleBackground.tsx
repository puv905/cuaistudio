import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number; // percentage
  duration: number; // seconds
  delay: number; // seconds
  wobbleWidth: number; // pixels
}

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate a fixed number of unique bubbles
    const generatedBubbles: Bubble[] = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 45) + 12, // 12px to 57px
      left: Math.random() * 100, // 0% to 100%
      duration: Math.random() * 14 + 10, // 10s to 24s
      delay: Math.random() * -15, // Negative delay so some start midway immediately!
      wobbleWidth: Math.floor(Math.random() * 40) + 15,
    }));
    setBubbles(generatedBubbles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Decorative Water Bubbles (Static) */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/40 border border-white/60 blur-sm pointer-events-none"></div>
      <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-blue-100/30 border border-white/50 blur-md pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white/50 border border-white/70 blur-[2px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-cyan-100/40 border border-white/60 blur-[3px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-blue-200/20 border border-white/40 blur-lg pointer-events-none"></div>

      {/* CSS Animations style tag injected dynamically for self-containment */}
      <style>{`
        @keyframes upward-rise {
          0% {
            transform: translateY(105vh) scale(0.6);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
            transform: translateY(90vh) scale(1);
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-15vh) scale(0.9);
            opacity: 0;
          }
        }
        
        @keyframes wobble-sway {
          0%, 100% {
            margin-left: 0px;
          }
          50% {
            margin-left: var(--wobble-dist);
          }
        }
        
        .water-bubble {
          animation-name: upward-rise;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .bubble-sway {
          animation: wobble-sway 4s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Render elegant floating bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="water-bubble absolute bottom-0"
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        >
          <div
            className="bubble-sway w-full h-full rounded-full border border-sky-300/45 bg-gradient-to-tr from-sky-400/5 to-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_6px_rgba(14,165,233,0.08)] relative"
            style={{
              // @ts-ignore
              '--wobble-dist': `${bubble.wobbleWidth}px`,
            }}
          >
            {/* Specular glare shine for 3D glassy realism */}
            <span className="absolute top-1 left-2 w-1/4 h-1/4 bg-white/60 rounded-full blur-[0.5px]" />
            <span className="absolute bottom-2 right-2 w-1/5 h-1/5 bg-white/10 rounded-full blur-[0.5px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
