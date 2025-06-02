'use client';

import React from 'react';
import MusicGrid from '@/components/MusicGrid';
import Link from 'next/link';


const MusicPage = () => {
  const albumRoutes = ['/music/1', '/music/2', '/music/3', '/music/4'];
  const imageSources = ['/jack.png', '/ben2.jpg', '/ian.jpg', '/kamen2.jpg']; // Replace with your actual image paths
  
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', padding: '20px', }}>

      <div className="mt-0 flex justify-center items-center">
  <h1 className="mb-5 text-center text-md sm:text-xl font-bold whitespace-nowrap text-white">
    Soundtrack Performers
  </h1>
</div>
      <MusicGrid>
        {albumRoutes.map((route, index) => (
          <Link key={index} href={route} style={{ display: 'block', width: '100%', height: '50%' }}>
            <div style={{
     
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',

              width: '100%',
            
            }}>
              <div>
                <img src={imageSources[index]} alt={`Album ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
              </div>
            </div>
          </Link>
        ))}
      </MusicGrid>
    </div>
  );
};

export default MusicPage;