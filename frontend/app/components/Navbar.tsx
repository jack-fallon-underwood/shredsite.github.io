'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbuttons from '@/components/Navbuttons';
import Dropdown from '@/components/Dropdown';
import { useOverlay } from '@/context/OverlayContext';

const Navbar = () => {
  const { showNavbar } = useOverlay();
  const [servicesOpen, setServicesOpen] = useState(false);

  if (!showNavbar) return null;

  const servicesMenuItems = [
    { text: 'TourManagers', href: '/services/tour-managers' },
    { text: 'Producing', href: '/services/producing' },
    { text: 'Recording', href: '/services/recording' },
    { text: 'Interactive', href: '/services/interactive' },
  ];

  return (
    <div className="w-full flex flex-col items-center mt-8 px-4 sm:px-6 md:px-8 relative">
      {/* Logo centered */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <h1
          className="ml-2 sm:ml-0"
          style={{
            color: 'red',
            fontSize: '20px',
            cursor: 'pointer',
            marginBottom: '12px',
          }}
        >
          Citizens' Loft
        </h1>
      </Link>

      {/* Navigation buttons */}
      <div className="flex items-center gap-1 sm:gap-6 relative">
        <Navbuttons text="Events" myStyle={{ color: 'red' }} href="/events" />
        <Navbuttons text="Artists" myStyle={{ color: 'orange' }} href="/music" />
         <Navbuttons
          text="Music"
          myStyle={{ color: 'limegreen' }}
          href="https://citizensloft.bandcamp.com/merch"
        />
         <Navbuttons
          text="Films"
          myStyle={{ color: 'royalblue' }}
          href="https://citizensloft.bandcamp.com/video"
        />
        <Navbuttons
          text="Merch"
          myStyle={{ color: 'purple' }}
          href="https://citizensloft.bandcamp.com/merch"
        />

        {/* Services dropdown toggle */}
        <div
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
          className="relative"
        >
          <Navbuttons text="Services" myStyle={{ color: 'black' }} href="/services" />
          {servicesOpen && <Dropdown items={servicesMenuItems} />}
        </div>

        <Navbuttons text="Contact" myStyle={{ color: 'violet' }} href="/contact" />
      </div>
    </div>
  );
};

export default Navbar;
