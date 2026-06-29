import type { Metadata, Viewport } from "next";
import "@fontsource/plus-jakarta-sans";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";
import Script from "next/script";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "idées3D - Créateur de plans architectural",
  description: "Créez facilement vos plans architecturaux avec notre outil de planification moderne. Inscription gratuite ou accès direct sans compte.",
  keywords: "plan, étages, architecture, planificateur, design intérieur, idées3d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head >
        <Script src="https://analytics.idees3d.fr/api/script.js" data-site-id="1" defer></Script>

      </head>
      <body
        className="font-sans antialiased bg-gray-50"
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
