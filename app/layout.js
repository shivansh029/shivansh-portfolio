import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

// Premium Dark SVG Favicon (Tokyo Night Theme)
const faviconSvg = `
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
    <circle cx='50' cy='50' r='48' fill='%231a1b26' stroke='%233b4261' stroke-width='2'/>
    <text x='50%' y='58%' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-weight='bold' font-size='42' fill='%23bb9af7'>&gt;_</text>
  </svg>
`.trim().replace(/\n/g, '').replace(/\s+/g, ' ');

export const metadata = {
  title: "Shivansh Verma",
  description: "Personal website of Shivansh Verma",
  icons: {
    icon: `data:image/svg+xml,${faviconSvg}`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (!theme) theme = 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
