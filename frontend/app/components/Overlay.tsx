// components/initialOverlay.tsx (or just Overlay.tsx as per your import)
import React, { FC, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useOverlay } from '@/context/OverlayContext';


interface OverlayProps {
    text?: string;
}

const Overlay: FC<OverlayProps> = () => {

    const { showNavbar, setShowNavBar } = useOverlay();


    const [name, setName] = useState('');
    const [instrument, setInstrument] = useState('');
    const [submittedName, setSubmittedName] = useState(false);
    const [submittedInstrument, setSubmittedInstrument] = useState(false);

    const instruments = [
        { name: 'banjo', src: '/banjoLogo.png', alt: 'Banjo' },
        { name: 'bass', src: '/bassLogo.png', alt: 'Bass' },
        { name: 'drum', src: '/drumLogo.png', alt: 'Drum' },
        { name: 'flute', src: '/fluteLogo.png', alt: 'Flute' },
        { name: 'guitar', src: '/guitarLogo.png', alt: 'Guitar' },
        { name: 'perc', src: '/percLogo.png', alt: 'Percussion' },
        { name: 'piano', src: '/pianoLogo.png', alt: 'Piano' },
        { name: 'sax', src: '/saxLogo.png', alt: 'Sax' }
    ];

    useEffect(() => {
        const savedName = Cookies.get('username');
        if (savedName) {
            setName(savedName);
            setSubmittedName(true);
        }

        const savedInstrument = Cookies.get('class');
        if (savedInstrument) {
            setInstrument(savedInstrument);
            setSubmittedInstrument(true);
            setShowNavBar(true);
        }
    }); // Empty dependency array means this runs once on mount

    const handleSubmitName = (newName: string) => {
        if (newName.trim() === '') return;
        setSubmittedName(true);
        Cookies.set('username', newName);
    };

    const handSubmitInstrament = (newInstrument: string) => {
        setSubmittedInstrument(true);
        Cookies.set('class', newInstrument);
        setShowNavBar(true); // Ensure navbar shows immediately when instrument is selected
    };

    const handleClearCookie = () => {
        Cookies.remove('username');
        Cookies.remove('class');
        setName('');
        setInstrument('');
        setSubmittedName(false);
        setSubmittedInstrument(false);
        setShowNavBar(false);
    };

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmitName(name);
        }
    };

  

    return (
         <div>
             <div className={`fixed inset-0 flex items-center justify-center z-50 ${submittedName && submittedInstrument ? 'animate-move-to-bottom' : ''}`}>
            {/* Conditional rendering for Name input OR Name display + Instrument selection/display */}
            {!submittedName ? (
                // Name input section
                <div className="flex flex-col items-center justify-center p-4">
                    <p className="p-2 text-white">Enter your name:</p> {/* Added text-white for visibility */}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleEnter}
                        className="border-4 border-white p-2 rounded text-center text-white" // Added text-black for visibility
                    />
                    <button
                        onClick={() => handleSubmitName(name)}
                        className="mt-2 px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                    >
                        Submit
                    </button>
                </div>
            ) : (
                // This block is for when the name IS submitted
                <div className="flex items-center justify-center w-full">
                  

                    {submittedName && !submittedInstrument && (
                        <div className="flex flex-wrap justify-center">
                            {instruments.map((instrument) => (
                                <img
                                    style={{ maxWidth: '10vh', maxHeight: '10vh' }}
                                    key={instrument.name}
                                    src={instrument.src}
                                    alt={instrument.alt}
                                    onClick={() => handSubmitInstrament(instrument.name)}
                                    className="w-24 h-24 m-2 cursor-pointer"
                                />
                            ))}
                        </div>
                    )}

                    
                    {submittedInstrument && (
                      
                    
                      <img
                            className="mt-2" // Removed absolute here as it's now relative to the parent fixed overlay
                            style={{ maxHeight: '5vh' }}
                            src={instruments.find(i => i.name === instrument)?.src}
                            alt={instrument}
                        />
                      
                    )}
                </div>
            )}

              
           
             </div>
          <div>
  {submittedName && (
    <div className="fixed bottom-[2%] right-[8%] z-56 flex items-end">
      <p className="mb-2 text-lg font-bold text-white translate-x-[-200%]">
        {name}
      </p>
      <button
        onClick={handleClearCookie}
        className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded text-sm"
      >
        Reset
      </button>
    </div>
  )}
</div>

        </div>
        
    );
};

export default Overlay;