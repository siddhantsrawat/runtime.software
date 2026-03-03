import { GeistMono } from "geist/font/mono";
import { GeistPixelGrid, GeistPixelLine } from "geist/font/pixel";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata = {
  title: "runtime",
  description: "runtime — your operating system on the web",
  icons: {
    icon: [
      { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/favicon.ico?v=2`, type: "image/x-icon" },
    ],
    shortcut: `${basePath}/favicon.ico?v=2`,
    apple: `${basePath}/favicon.ico?v=2`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistMono.variable} ${GeistPixelGrid.variable} ${GeistPixelLine.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
