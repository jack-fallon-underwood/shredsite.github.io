import React from 'react';
import Navbuttons from '@/components/Navbuttons';

interface DropdownProps {
  items: { href: string; text: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  return (
    <div className="rounded-md shadow-lg min-w-[150px] bg-black absolute mt-2 z-50">
      <div className="space-y-1">
        {items.map(({ href, text }) => (
          <Navbuttons key={text} href={href} text={text} />
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
