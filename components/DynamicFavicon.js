"use client";

import { useEffect } from "react";

export default function DynamicFavicon() {
  useEffect(() => {
    const updateFavicon = (theme) => {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.href = theme === "light" ? "/images/favicon-light.ico" : "/images/favicon-dark.ico";
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = theme === "light" ? "/images/favicon-light.ico" : "/images/favicon-dark.ico";
        document.head.appendChild(link);
      }
    };

    // Initial check
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    updateFavicon(currentTheme);

    // Listen for theme changes from toggle
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme");
          updateFavicon(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Also listen for custom event (from terminal)
    const handleThemeChange = (e) => {
      updateFavicon(e.detail);
    };
    window.addEventListener("themeChange", handleThemeChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  return null;
}
