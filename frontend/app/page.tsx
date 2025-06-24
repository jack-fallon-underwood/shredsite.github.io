'use client';

import React, { useEffect } from "react";
import { useOverlay } from '@/context/OverlayContext';

const Home = () => {
  const { showNavbar } = useOverlay();

  useEffect(() => {
    // Dynamically load Elfsight Instagram script on client-side
    const script = document.createElement('script');
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div>
        {showNavbar && (
          <>
            {/* Mission Statement */}
            <div className="text-center px-4 mt-10">
              <p className="text-black text-lg sm:text-xl font-medium max-w-3xl mx-auto">
                Citizens' Loft is an organization dedicated to the creation, cultivation, dissemination, and promotion of musical and artistic expressions.
              </p>
            </div>

            {/* Main Content: YouTube + Sidebar Calendar */}
            <div className="mt-12 md:mt-20 flex flex-col md:flex-row items-start justify-center gap-6 px-4">
              {/* YouTube Embed */}
              <div className="aspect-video w-full max-w-2xl">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/G2vG_hTqQfo"
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Sidebar Calendar Embed */}
              <div className="w-full md:w-[350px] h-[600px]">
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=citizensloft%40gmail.com&ctz=America%2FNew_York&mode=AGENDA"
                  style={{ border: 0 }}
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  title="Sidebar Calendar"
                ></iframe>
              </div>
            </div>

            {/* Instagram Feed (Elfsight) at the bottom */}
            <div className="mt-16 px-4 max-w-4xl mx-auto">
              <div 
                className="elfsight-app-f471282d-d042-42f4-a505-7faaa0220fc5" 
                data-elfsight-app-lazy
              ></div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
