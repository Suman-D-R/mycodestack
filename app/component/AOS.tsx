'use client';

import AOS from 'aos';
import { useEffect } from 'react';

function AOSInit() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);
  return null;
}

export default AOSInit;
