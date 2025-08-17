'use client';

import React, { useEffect, useRef } from 'react';

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      type: string;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      life: number;
      maxLife: number;

      constructor(x: number, y: number, type: string = 'particle') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size =
          type === 'bubble' ? Math.random() * 3 + 2 : Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;

        // Bounce off edges
        if (this.x <= 0 || this.x >= canvas!.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas!.height) this.speedY *= -1;

        // Wrap around edges
        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;
      }

      draw() {
        ctx!.save();
        ctx!.globalAlpha = this.opacity * (this.life / this.maxLife);

        if (this.type === 'bubble') {
          // Draw pinkish bubble
          const gradient = ctx!.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size
          );
          gradient.addColorStop(0, 'rgba(255, 182, 193, 0.8)'); // Light pink
          gradient.addColorStop(0.7, 'rgba(255, 105, 180, 0.4)'); // Hot pink
          gradient.addColorStop(1, 'rgba(255, 20, 147, 0.1)'); // Deep pink

          ctx!.fillStyle = gradient;
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx!.fill();

          // Add highlight
          ctx!.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx!.beginPath();
          ctx!.arc(
            this.x - this.size * 0.3,
            this.y - this.size * 0.3,
            this.size * 0.3,
            0,
            Math.PI * 2
          );
          ctx!.fill();
        } else {
          // Draw particle
          ctx!.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx!.fill();
        }

        ctx!.restore();
      }
    }

    // Create particles and bubbles
    const particles: Particle[] = [];
    const numParticles = 10;
    const numBubbles = 20;

    // Add particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          'particle'
        )
      );
    }

    // Add bubbles
    for (let i = 0; i < numBubbles; i++) {
      particles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          'bubble'
        )
      );
    }

    // Animation loop
    const animate = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Remove dead particles and add new ones
        if (particle.life <= 0) {
          particles.splice(index, 1);
          particles.push(
            new Particle(
              Math.random() * canvas!.width,
              Math.random() * canvas!.height,
              particle.type
            )
          );
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 pointer-events-none z-0'
      style={{ opacity: 0.6 }}
    />
  );
};

export default Particles;
