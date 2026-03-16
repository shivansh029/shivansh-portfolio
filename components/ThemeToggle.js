"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("dark");
    const [isTugging, setIsTugging] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const handlePull = (e) => {
        e.stopPropagation();
        setIsTugging(true);
        
        // Short delay to mimic the physical pull
        setTimeout(() => {
            const newTheme = theme === "dark" ? "light" : "dark";
            setTheme(newTheme);
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            window.dispatchEvent(new CustomEvent("themeChange", { detail: newTheme }));
            setIsTugging(false);
        }, 150);
    };

    // Listen for custom theme change events (from terminal command)
    useEffect(() => {
        const handleThemeChange = (e) => {
            setTheme(e.detail);
        };
        window.addEventListener("themeChange", handleThemeChange);
        return () => window.removeEventListener("themeChange", handleThemeChange);
    }, []);

    return (
        <div className={styles.toggleWrapper}>
            <div 
                className={`${styles.lampContainer} ${isTugging ? styles.tugging : ''}`}
                onClick={handlePull}
            >
                <div className={styles.wire}></div>
                <div className={styles.bulbOuter}>
                    <svg viewBox="0 0 40 60" className={styles.bulb}>
                        {/* Glass Reflection (Subtle) */}
                        <path className={styles.reflection} d="M12 12C12 12 14 8 20 8C26 8 28 12 28 12" />
                        
                        {/* Bulb Shape */}
                        <path d="M20 5C11.7 5 5 11.7 5 20C5 25.4 7.5 30.2 11.2 33.3C13 34.8 14.5 37.5 14.5 40V45H25.5V40C25.5 37.5 27 34.8 28.8 33.3C32.5 30.2 35 25.4 35 20C35 11.7 28.3 5 20 5Z" />
                        
                        {/* Screw Base */}
                        <rect x="15" y="46" width="10" height="3" rx="1" fill="#444" />
                        <rect x="16" y="50" width="8" height="2" rx="1" fill="#333" />
                        
                        {/* Filament */}
                        <path className={styles.filament} d="M16 35C16 35 17 25 20 25C23 25 24 35 24 35M18 35V40M22 35V40" />
                    </svg>
                </div>
                <div className={styles.pullString}>
                    <div className={styles.hitArea}></div>
                </div>
            </div>
        </div>
    );
}
