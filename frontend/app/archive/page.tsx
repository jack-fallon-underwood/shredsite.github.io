'use client';

import React from 'react';
import Image from 'next/image';

interface Service {
  title: string;
  image: string;
  description: string;
}

const services: Service[] = [
  {
    title: 'Tour Archival',
    image: '/tourWatermark.png',
    description:
      'Expert tour management services complete with a tour manager to coordinate all essential details (scheduling & logistics) and accompany groups on their tours in order to ensure smooth and successful tour prospects for all artists and bands.',
  },
  
];

const ServicesPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Services</h1>
      <div className="grid gap-12 md:grid-cols-2">
        {services.map(({ title, image, description }) => (
          <div
            key={title}
            className="flex flex-col items-center bg-green-900 rounded-lg shadow-md p-6"
          >
            <div className="w-full h-48 relative mb-4 rounded overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                  style={{ objectFit: 'contain' }} 
                priority={true}
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-center">{title}</h2>
            <p className="text-gray-100 text-center">{description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ServicesPage;