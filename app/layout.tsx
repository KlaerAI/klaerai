import type {Metadata} from "next";
import {Geist, Geist_Mono, Rubik} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Klaer AI | The Future of Student Growth",
  description:
    "A digital ecosystem democratizing access to learning, opportunity, and professional growth.",
  keywords: [
    "Klaer AI",
    "Student Growth",
    "AI Tutor",
    "EdTech",
    "College",
    "Career",
  ],
  openGraph: {
    title: "Klaer AI | The Future of Student Growth",
    description:
      "A digital ecosystem democratizing access to learning, opportunity, and professional growth.",
    url: "https://klaer.ai",
    siteName: "Klaer AI",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klaer AI | The Future of Student Growth",
    description:
      "A digital ecosystem democratizing access to learning, opportunity, and professional growth.",
    images: ["/icon.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
