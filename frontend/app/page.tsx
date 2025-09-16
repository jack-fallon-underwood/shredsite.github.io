'use client'; 
import Image from "next/image";
import React from "react";
import Navbar from "@/components/Navbar";
import Overlay from '@/components/Overlay';
import { useOverlay } from '@/context/OverlayContext';

const Home = () => {
  const { showNavbar, setShowNavBar } = useOverlay();

  return (
    <>
     <div>
   
  {showNavbar && (
    <>
      <div className="mt-8 md:mt-40">
        
      
   <div className="aspect-video max-w-2xl mx-auto">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/r5RxpVab3XU"
    title="YouTube Trailer"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>


      </div>
    </>
  )}
</div>

    </>
  );
};

export default Home;