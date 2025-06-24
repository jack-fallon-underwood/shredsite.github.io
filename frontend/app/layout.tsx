'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OverlayProvider } from '@/context/OverlayContext'; 
import Navbar from '@/components/Navbar';
import Overlay from "@/components/Overlay";
import SocialBar from "@/components/SocialBar";
import './globals.css';
import { Press_Start_2P } from 'next/font/google';


const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',    // <-- add this line explicitly
  display: 'swap',
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body
  className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.className} antialiased pb-26`}
>
               
    
          <Navbar />
          {children}
     
        <footer className="fixed bottom-0  left-1/2 -translate-x-1/2 w-full"><SocialBar/></footer>
        
      </body>
    </html>
  );
}
