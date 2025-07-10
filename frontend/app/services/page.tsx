'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Service {
  title: string;
  image: string;
  description: string;
  url: string;
}

const services: Service[] = [
  {
    title: 'Tour Management',
    image: '/tourWatermark.png',
    description:
      'Expert tour management services complete with a tour manager to coordinate all essential details (scheduling & logistics) and accompany groups on their tours in order to ensure smooth and successful tour prospects for all artists and bands.',
    url: '/tour',
  },
  {
    title: 'Production',
    image: '/productionWatermark.png',
    description:
      'Professional music production services to craft, refine, and polish your recordings, delivering top-quality sound for any genre.  Event production for any and all needs to ensure successful performances.',
    url: '/events',
  },
  {
    title: 'Recording',
    image: '/recordWatermark.png',
    description:
      'State-of-the-art recording sessions with experienced engineers to capture your music with clarity and artistic integrity.',
    url: 'https://citizensloft.bandcamp.com/music',
  },
  {
    title: 'Interactive',
    image: '/interactiveWatermark.png',
    description:
      'Innovative interactive experiences that engage audiences through multimedia, digital art, and live performance technologies.',
    url: 'https://www.shredtheundead.com/',
  },
];

const ServicesPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-black">Our Services</h1>
      <div className="grid gap-12 md:grid-cols-2">
        {services.map(({ title, image, description, url }) => (
          <Link
            key={title}
            href={url}
            target={url.startsWith('http') ? '_blank' : '_self'}
            rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex flex-col items-center bg-green-900 rounded-lg shadow-md p-6 hover:scale-105 transition-transform"
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
            <h2 className="text-2xl font-semibold mb-2 text-center text-white">{title}</h2>
            <p className="text-gray-100 text-center">{description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ServicesPage;
