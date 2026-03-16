"use client";

import { useEffect, useRef } from "react";
import styles from "./MatrixRain.module.css";

export default function MatrixRain({ duration = 5000, onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const finish = () => {
      clearInterval(interval);
      if (onComplete) onComplete();
    };

    const timeout = setTimeout(finish, duration);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleInterrupt = (e) => {
      // Any key or click interrupts
      finish();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleInterrupt);
    window.addEventListener("mousedown", handleInterrupt);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleInterrupt);
      window.removeEventListener("mousedown", handleInterrupt);
    };
  }, [duration, onComplete]);

  return <canvas ref={canvasRef} className={styles.matrixCanvas} />;
}
