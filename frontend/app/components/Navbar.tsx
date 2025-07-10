'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbuttons from '@/components/Navbuttons';
import { useOverlay } from '@/context/OverlayContext';
import { Menu, X } from 'lucide-react'; // for hamburger icon

const Navbar = () => {
  const { showNavbar } = useOverlay();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!showNavbar) return null;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="w-full flex flex-col items-center mt-8 px-4 sm:px-6 md:px-8 relative">
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <h1
  className="ml-2 sm:ml-0 text-[20px] cursor-pointer text-red-600 mb-0 sm:mb-4"
>
  Citizens' Loft
</h1>
      </Link>

      {/* Hamburger icon for mobile */}
      <div className="sm:hidden absolute right-4 top-0 mt-0">
        <button onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} color="black" /> : <Menu size={24} color="black" />}
        </button>
      </div>

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center gap-1 sm:gap-6 relative">
        <Navbuttons text="Events" myStyle={{ color: 'red' }} href="/events" />
        <Navbuttons text="Artists" myStyle={{ color: 'orange' }} href="/music" />
        <Navbuttons text="Music" myStyle={{ color: 'limegreen' }} href="https://citizensloft.bandcamp.com/merch" />
        <Navbuttons text="Films" myStyle={{ color: 'royalblue' }} href="https://citizensloft.bandcamp.com/video" />
        <Navbuttons text="Merch" myStyle={{ color: 'purple' }} href="https://citizensloft.bandcamp.com/merch" />
        <Navbuttons text="Services" myStyle={{ color: 'black' }} href="/services" />
        <Navbuttons text="Contact" myStyle={{ color: 'violet' }} href="/contact" />
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="sm:hidden flex flex-col items-center mt-4 space-y-2">
          <Navbuttons text="Events" myStyle={{ color: 'red' }} href="/events" />
          <Navbuttons text="Artists" myStyle={{ color: 'orange' }} href="/music" />
          <Navbuttons text="Music" myStyle={{ color: 'limegreen' }} href="https://citizensloft.bandcamp.com/merch" />
          <Navbuttons text="Films" myStyle={{ color: 'royalblue' }} href="https://citizensloft.bandcamp.com/video" />
          <Navbuttons text="Merch" myStyle={{ color: 'purple' }} href="https://citizensloft.bandcamp.com/merch" />
          <Navbuttons text="Services" myStyle={{ color: 'black' }} href="/services" />
          <Navbuttons text="Contact" myStyle={{ color: 'violet' }} href="/contact" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
