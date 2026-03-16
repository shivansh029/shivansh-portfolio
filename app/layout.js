import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";
import DynamicFavicon from "../components/DynamicFavicon";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shivansh Verma",
  description: "Personal website of Shivansh Verma",
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
                  
                  // Set initial favicon to prevent blink
                  var iconLink = document.createElement('link');
                  iconLink.rel = 'icon';
                  iconLink.href = theme === 'light' ? '/images/favicon-light.ico' : '/images/favicon-dark.ico';
                  document.head.appendChild(iconLink);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <DynamicFavicon />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
