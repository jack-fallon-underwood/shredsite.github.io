'use client';

import React from 'react';

const CalendarPage = () => {
  return (
    <div className="w-screen h-screen">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=citizensloft%40gmail.com&ctz=America%2FNew_York"
        className="w-full h-full"
        frameBorder="0"
        scrolling="no"
        title="Citizens Loft Calendar"
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
};

export default CalendarPage;