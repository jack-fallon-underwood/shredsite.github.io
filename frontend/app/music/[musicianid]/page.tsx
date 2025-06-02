// app/music/[musicianid]/page.tsx
// NO 'use client' directive here - this is a SERVER COMPONENT

import React from 'react';

import ArtistContent from '@/components/ArtistContent'; // Import the new client component

// Define your types and ARTISTS data here or import them from a shared file.
// ARTISTS data should be available on the server for generateStaticParams.
interface ArtistLinks {
    imageSrc: string;
    link: string;
}

interface ArtistData {
    name: string;
    imageSrc: string;
    bio: string;
    albumIds: string[];
    singleIds?: string[];
    homebase?: string[];
    genretag?: string[];
    memberArtists?: string[];
    associateArtist?: string[];
    externalLinks?: ArtistLinks[];
}

const ARTISTS: Record<string, ArtistData> = {
    '1': {
        name: '',
        imageSrc: '/jack.png',
        bio: 'Jack Fallon-Underwood is the principal architect, guitarist, debugger and producer of Shred The Undead. Each year he releases an album in alphabetical order. Jack is currently enrolled as a graduate student at Brooklyn College.',
        albumIds: ['1452735474', '3047987718', '3202651286', '2722892672', '20637885', '3742824372', '3562748246', '1254684199'],
    },
    '2': {
        name: '',
        imageSrc: '/ben2.jpg',
        bio: "Benjamin DeUrso is a musician, archivist, percussionist and the reason we all know each other. Focusing on recording drums, producing shows, and producing music through Citizens' Loft, it's rare to find him outside of a musical context, unless he's relaxing in his hometown of Somers, New York.",
        albumIds: ['2270247403', '4265531398', '1955134798', '3871796258', '2761052191', '632246931', '1778625599'],
        singleIds: ['3449032665', '2502173971', '2323749030', '665717195', '1284299913']
    },
    '3': {
        name: '',
        imageSrc: '/ian.jpg',
        bio: "Ian is a guitarist, bassist, mixing engineer and frequent Citizens' Loft collaborator. One of our most prolific performers in the collective. You can regularly catch Ian playing with Diamond Blues band every 2nd Sunday at The Burren in Cambridge, MA",
        albumIds: ["2249615514", "3773504046"],
        singleIds: ["4007036561", "2334029491", "2391167764", "3433223300", "4247352859", "4182138612"]
    },
    '4': {
        name: '',
        imageSrc: '/kamen2.jpg',
        bio: 'Kamen Ross is a composer, producer, arranger, vocalist, and multi-instrumentalist from Colorado who has contributed to the publication of over 300 original songs and countless re-imaginings performed all over the world, taking inspiration from the wilderness!',
        albumIds: ['3017108498', '4117570235'],
        externalLinks: [{ link: 'https://kamenross.com', imageSrc: '/k1.jpg' }, { link: 'https://sexycoyote.com', imageSrc: '/k4.jpg' }, { link: 'https://rogozo.bandcamp.com/', imageSrc: '/k5.jpg' }, { link: 'https://osoroso.bandcamp.com/', imageSrc: '/k6.jpg' }, { link: 'https://kingsorceress.com', imageSrc: '/k7.jpg' }]
    }
};

// --- generateStaticParams FUNCTION (remains here) ---
export async function generateStaticParams() {
    return Object.keys(ARTISTS).map((musicianid) => ({
        musicianid: musicianid,
    }));
}

const MusicianDetailPage = async ({ params }: { params: Promise<{ musicianid: string }> }) => {
    const { musicianid } = await params;
    const artist = ARTISTS[musicianid]; // Data fetched on the server at build time

    if (!artist) {
        return (
            <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
                <h1>Artist not found</h1>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
            <h1 className="mb-4">{artist.name}</h1>
            {/* Render the Client Component here, passing the artist data as a prop */}
            <ArtistContent artist={artist} />
        </div>
    );
};

export default MusicianDetailPage;