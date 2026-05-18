import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "CVForge AI - Intelligent CV Generator",
  description: "Generate professional CVs powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background: #f5f5f5;
            color: #222;
          }
          body {
            line-height: 1.6;
          }
          @keyframes _sp {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
