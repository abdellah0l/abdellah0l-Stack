"use client";

import { useState, useEffect } from "react";

// a custom hook to determine if the current device is mobile based on window width
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    
    checkIsMobile();

    
    window.addEventListener("resize", checkIsMobile);

    
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return isMobile;
}

