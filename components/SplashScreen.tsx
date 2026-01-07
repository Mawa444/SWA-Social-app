import React, { useEffect, useState, useRef } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Stages: 0: Init (Contour), 1: Filling (Liquid), 2: Explosion (Pop), 3: Final State
  const [stage, setStage] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  
  // Ratios et constantes
  const fillProgress = useRef(0);
  const particles = useRef<Particle[]>([]);
  const flashAlpha = useRef(0);

  // Couleurs Thème
  const THEME_BLUE = '#5B50FF';
  const THEME_VIOLET = '#8B5CF6';
  const LIQUID_ROSE = '#FF416C'; // Rose-Rouge demandé
  const PARTICLE_COLORS = [THEME_BLUE, THEME_VIOLET, LIQUID_ROSE, '#FFFFFF'];

  const animate = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const fontSize = Math.min(canvas.width * 0.22, 120);

    if (stage <= 1) {
      // 1. Dessiner le contour "socialX" (Bleu)
      ctx.save();
      ctx.font = `900 ${fontSize}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = THEME_BLUE;
      ctx.lineWidth = 3;
      ctx.strokeText('socialX', centerX, centerY);
      ctx.restore();

      if (stage === 1) {
        // 2. Dessiner le Liquide Masqué dans le "socialX"
        fillProgress.current += 0.012; // Vitesse augmentée
        if (fillProgress.current >= 1) {
          fillProgress.current = 1;
          setStage(2);
        }

        ctx.save();
        // Créer le masque "socialX"
        ctx.beginPath();
        ctx.font = `900 ${fontSize}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('socialX', centerX, centerY);
        ctx.clip();

        // Dessiner les vagues
        const currentY = (centerY + fontSize / 2) - (fontSize * fillProgress.current);
        drawWave(ctx, canvas.width, canvas.height, currentY, time * 0.006, 15, 0.015, LIQUID_ROSE, 1);
        drawWave(ctx, canvas.width, canvas.height, currentY + 10, time * 0.008, 10, 0.02, '#FF1F4B', 0.6);
        ctx.restore();
      }
    }

    // 3. Particules et Flash
    if (stage >= 2) {
      updateAndDrawParticles(ctx, canvas);
      
      if (flashAlpha.current > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha.current})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        flashAlpha.current -= 0.05;
      }
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  const drawWave = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    yBase: number, 
    offset: number, 
    amplitude: number, 
    frequency: number, 
    color: string, 
    alpha: number
  ) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x += 10) {
      const y = yBase + Math.sin(x * frequency + offset) * amplitude;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.fill();
    ctx.restore();
  };

  const createExplosion = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 20 + 5;
      particles.current.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 6 + 2,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        alpha: 1,
        life: 1
      });
    }
    flashAlpha.current = 1;
  };

  const updateAndDrawParticles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    particles.current.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;
      p.life -= 0.015;
      
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    particles.current = particles.current.filter(p => p.life > 0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    requestRef.current = requestAnimationFrame(animate);

    const t1 = setTimeout(() => setStage(1), 500); // Début remplissage

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearTimeout(t1);
    };
  }, []);

  useEffect(() => {
    if (stage === 2) {
      createExplosion();
      const t3 = setTimeout(() => setStage(3), 100);
      const tFinish = setTimeout(() => onFinish(), 4000); // Temps pour apprécier le logo final
      return () => {
        clearTimeout(t3);
        clearTimeout(tFinish);
      };
    }
  }, [stage]);

  return (
    <div className={`fixed inset-0 z-[5000] flex items-center justify-center transition-all duration-1000 ease-out overflow-hidden select-none ${
      stage >= 3 ? 'bg-gradient-to-br from-[#5B50FF] to-[#8B5CF6]' : 'bg-white'
    }`}>
      
      <style>{`
        @keyframes logoPopIn {
          0% { transform: scale(0.5); opacity: 0; filter: blur(20px); }
          70% { transform: scale(1.1); filter: blur(0); }
          100% { transform: scale(1); opacity: 1; }
        }

        .xy-final-text {
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          font-size: clamp(60px, 15vw, 150px);
          letter-spacing: -0.05em;
          color: white;
          text-shadow: 0 20px 50px rgba(0,0,0,0.2);
        }

        .container-final {
          animation: logoPopIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* Canvas principal (Vagues + Particules) */}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${stage >= 3 ? 'opacity-40' : 'opacity-100'}`}
      />

      {/* État Final : Logo Blanc sur Dégradé */}
      {stage >= 3 && (
        <div className="container-final z-20 flex flex-col items-center">
          <h1 className="xy-final-text">socialX</h1>
          <div className="mt-12 flex flex-col items-center space-y-3 opacity-80">
            <span className="text-white font-black text-[12px] tracking-[0.8em] uppercase text-center px-4">Sovereign Social Network</span>
            <div className="w-16 h-1 bg-white/20 rounded-full" />
            <span className="text-white/40 text-[9px] font-bold tracking-widest mt-4">ENCRYPTED CORE v2.5</span>
          </div>
        </div>
      )}

      {/* Ambiance et texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default SplashScreen;