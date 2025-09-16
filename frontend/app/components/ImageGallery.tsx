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
   <div className="flex justify-center gap-4 sm:gap-6 flex-wrap px-2">
  {images.map((img, index) => (
    <div
      key={index}
      onClick={() => handleImageClick(index)}
      className="cursor-pointer relative"
    >
      <img
        src={`/${img}`}
        alt={`Character ${index + 1}`}
        className={`
          w-24 sm:w-40 md:w-56
          h-auto border-2 border-white rounded-lg
          transition-transform duration-200 ease-in-out
          ${focusedImage === index ? 'scale-110 shadow-md shadow-white/70' : 'scale-100'}
        `}
      />
    </div>
  ))}

  {focusedImage !== null && currentCharacter && (
    <div
      onClick={handleCloseFocus}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-black rounded-lg p-4 max-w-[90%] max-h-[90%] overflow-y-auto flex flex-col items-center gap-4 relative"
      >
        <img
          src={`/${images[focusedImage]}`}
          alt={`Character ${focusedImage + 1}`}
          className="max-w-full sm:max-w-[300px] border-2 border-white rounded"
        />
        <div className="text-white text-center">
          <h2 className="text-xl font-bold">{currentCharacter.name}</h2>
          <p className="text-sm mt-2">{currentCharacter.description}</p>
        </div>
        <button
          onClick={handleCloseFocus}
          className="absolute top-2 right-2 text-white bg-black text-3xl font-bold leading-none"
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