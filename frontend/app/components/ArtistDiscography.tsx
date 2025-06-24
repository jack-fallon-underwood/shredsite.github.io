// app/components/ArtistContent.tsx
'use client';

import React from 'react';
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery'; // Keep this import here
import MusicGrid from '@/components/MusicGrid';

// Re-declare/import your types and helper components needed by ArtistContent
// It's good practice to put common types in a shared types file or re-declare them.
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

interface TileStyle {
    border: number;
    width: string;
    height: string;
}

type ChildWithStyle = React.ReactElement<{ style?: React.CSSProperties }>;

// ArtistInfoFrame, ArtistPhotoFrame, ArtistLinkFrame,
// baseSrcA, TileWrapper, baseSrcT, Album, Single
// All these helper components should be copied/moved into this file,
// or into their own client components if they also have client-side logic.
// For simplicity, let's assume they are either pure (don't need 'use client')
// or should be 'use client' themselves if they rely on hooks/browser APIs.
// For now, I'll put them here for completeness.

const ArtistInfoFrame: React.FC<{ children: React.ReactNode; width?: string; height?: string; fontSize?: string }> = ({ children, width, height, fontSize }) => (
    <div style={{ border: '1px solid #ccc', width, height, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', overflow: 'auto' }}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === 'span') {
                    const existingStyle = (child as ChildWithStyle).props?.style || {};
                    return React.cloneElement(child as ChildWithStyle, {
                        style: {
                            ...existingStyle,
                            fontSize: fontSize,
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            whiteSpace: 'normal',
                            overflowWrap: 'break-word',
                            textAlign: 'center',
                        },
                    });
                }
                return child;
            })}
        </div>
    </div>
);

const ArtistPhotoFrame: React.FC<{ imageSrc: string; width?: string; height?: string; }> = ({ imageSrc, width, height }) => (
    <div style={{
        border: '1px solid #ccc',
        padding: '8px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
    }}>
        <img
            src={imageSrc}
            alt="Artist"
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
            }}
        />
    </div>
);

const ArtistLinkFrame = (props: { elink: ArtistLinks }) => {
    const { elink } = props;

    return (
        <a href={elink.link} target="_blank" rel="noopener noreferrer" >
            <img src={elink.imageSrc} alt="External Link" style={{ width: '100%', height: '100%' }} />
        </a>
    );
};
const baseSrcA = (albumId: string) =>
    `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=800080/linkcol=0687f5/minimal=true/transparent=true/`;

const TileWrapper = ({ children, width, height }: { children: React.ReactNode; width?: string, height?: string }) => (
    <div style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
        {children}
    </div>
);

const baseSrcT = (singleId: string) =>
    `https://bandcamp.com/EmbeddedPlayer/track=${singleId}/size=large/bgcol=800080/linkcol=0687f5/minimal=true/transparent=true/`;


const Album = ({ albumId, iframeStyle }: { albumId: string; iframeStyle: React.CSSProperties }) => (
    <TileWrapper>
        <iframe style={iframeStyle} src={baseSrcA(albumId)} seamless />
    </TileWrapper>
);
const Single = ({ singleId, iframeStyle }: { singleId: string; iframeStyle: React.CSSProperties }) => (
    <TileWrapper>
        <iframe style={iframeStyle} src={baseSrcT(singleId)} seamless />
    </TileWrapper>
);

// This is the new Client Component
const ArtistContent: React.FC<{ artist: ArtistData }> = ({ artist }) => {
    const isMobile = useClientMediaQuery('(max-width: 500px)');
    const currentIframeStyle: TileStyle = isMobile
        ? { border: 0, width: '200px', height: '200px' }
        : { border: 0, width: '400px', height: '400px' };
    const currentFontSize = isMobile ? '8px' : '17px';

    return (
        <MusicGrid>
            

             {artist.externalLinks && artist.externalLinks.map((elink, index) => (
                <TileWrapper width={currentIframeStyle.width} height={currentIframeStyle.height} key={index}> <ArtistLinkFrame elink={elink} />
                </TileWrapper>))}
                
            {artist.albumIds.map((albumId) => (
                <Album key={albumId} albumId={albumId} iframeStyle={currentIframeStyle} />
            ))}
            {artist.singleIds?.map((singleId) => (
                <Single key={singleId} singleId={singleId} iframeStyle={currentIframeStyle} />
            ))}
        </MusicGrid>
    );
};

export default ArtistContent;