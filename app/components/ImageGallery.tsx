'use client';
import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  characterInfo: { name: string; description: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, characterInfo }) => {
  const [focusedImage, setFocusedImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setFocusedImage(index);
  };

  const handleCloseFocus = () => {
    setFocusedImage(null);
  };

  // Find the currently focused character info
  const currentCharacter = focusedImage !== null ? characterInfo[focusedImage] : null;

  return (
    <div className="flex justify-center gap-7 sm:gap-5 flex-wrap">
      {images.map((img, index) => (
        <div
          key={index}
          onClick={() => handleImageClick(index)}
          style={{
            cursor: 'pointer',
            position: 'relative',
          }}
        >
             <img
            src={`/${img}`}
            alt={`Character ${index + 1}`}
            className={`
              max-w-[100px] sm:max-w-[300px]   // <--- CHANGE HERE
              h-auto border-2 border-white rounded-lg
              transition-transform duration-200 ease-in-out
              ${focusedImage === index ? 'scale-125 shadow-md shadow-white/70' : 'scale-100'}
            `}
          />
        </div>
      ))}

      {/* This is the REVISED part.
        The overlay now renders ONLY if focusedImage is NOT null (meaning *any* image is focused),
        and it is outside the map loop, so it's a single, global overlay.
      */}
      {focusedImage !== null && currentCharacter && (
        <div
          onClick={handleCloseFocus}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Changed from 0.7 for consistency
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 51,
            cursor: 'pointer', // Added cursor back for visual feedback
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'black',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '80%',
              maxHeight: '80%',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              position: 'relative',
            }}
          >
            <img
              src={`/${images[focusedImage]}`} // Use focusedImage directly for src
              alt={`Character ${focusedImage + 1}`}
              style={{
                maxWidth: '400px',
                height: 'auto',
                border: '2px solid white',
                borderRadius: '8px',
              }}
            />
            <div style={{color: 'white', textAlign: 'center'}}> {/* Added color here */}
              <h2 style={{ fontSize: '24px' }}>{currentCharacter.name}</h2>
              <p style={{ fontSize: '16px', marginTop: '10px' }}>{currentCharacter.description}</p>
            </div>
              <button
                className= "  focus:ring-2   font-bold "
                  onClick={handleCloseFocus}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: 'white',
                    background: 'black',
                    border: 'none',
                    fontSize: '40px',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;