import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Optical Shop in Vijayawada | Best Eye Test & Frames - Focus Opticals",
  description: "Focus Opticals is the top-rated optician in Vijayawada. Visit us for free eye testing, premium frames, branded sunglasses, and quality lenses at Chowk, Vijayawada.",
  keywords: [
    "optical shop in Vijayawada", 
    "eye test near me", 
    "best optician in Vijayawada", 
    "eyeglasses Vijayawada", 
    "sunglasses Vijayawada", 
    "branded frames Vijayawada", 
    "eye clinic Vijayawada",
    "Focus Opticals Vijayawada"
  ],
  alternates: {
    canonical: 'https://focusopticals.co.in',
  },
  openGraph: {
    title: "Focus Opticals | Best Optical Shop & Eye Testing in Vijayawada",
    description: "Expert eye testing and premium eyewear collection in the heart of Vijayawada. Book your free eye test today!",
    url: 'https://focusopticals.co.in',
    siteName: 'Focus Opticals',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Focus Opticals | Best Optical Shop in Vijayawada",
    description: "Premium frames and professional eye testing in Vijayawada. Visit us today!",
  },
  icons: { 
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%230d9488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>' 
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "OpticalBusiness",
  "name": "Focus Opticals",
  "image": "https://focusopticals.co.in/100.jpg",
  "@id": "https://focusopticals.co.in",
  "url": "https://focusopticals.co.in",
  "telephone": "+918008434443",
  "priceRange": "RS",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "9-76-3, Vinnakota Vari St, near S.K.P.V.Hindu High School Line, Chowk",
    "addressLocality": "Vijayawada",
    "postalCode": "520001",
    "addressRegion": "AP",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 16.512689384152523,
    "longitude": 80.61868341113054
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "10:00",
    "closes": "21:00"
  },
  "sameAs": [
    "https://www.google.com/maps?cid=14167389524040134747"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
