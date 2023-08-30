"use client"
import { createContext, useContext, useState, useEffect } from 'react';

export const ScreenContext = createContext();

export function ScreenProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  // Function to determine if the screen is mobile
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 768); // Adjust the width as needed
  };

  // Listen for window resize events
  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <ScreenContext.Provider value={{ isMobile }}>
      {children}
    </ScreenContext.Provider>
  );
}


