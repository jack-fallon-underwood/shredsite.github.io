'use client';

import React from 'react';
import MusicGrid from '@/components/MusicGrid';
import Link from 'next/link';


const MusicPage = () => {
  const albumRoutes = ['/music/1', '/music/2', '/music/3', '/music/4'];
  const imageSources = ['/jack.png', '/ben2.jpg', '/ian.jpg', '/kamen2.jpg']; // Replace with your actual image paths
  
  return (
    <div style={{  minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', padding: '20px', }}>

      <div className="mt-0 flex justify-center items-center">
  <h1 className="mb-5 text-center text-md sm:text-xl font-bold whitespace-nowrap text-white">
    Soundtrack Performers
  </h1>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mx-auto">
        {albumRoutes.map((route, index) => (
          <Link key={index} href={route} style={{ display: 'block', width: '100%', height: '50%' }}>
            <div style={{
              border: '1px solid #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              margin: '0px',
              padding: '8px',
              width: '100%',
            
            }}>
              <div>
                <img src={imageSources[index]} alt={`Album ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
              </div>
            </div>
          </Link>
        ))}
     </div>
    </div>
  );
};

export default MusicPage;