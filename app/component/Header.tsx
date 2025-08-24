'use client';

import React, { useState, useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-webgl2';

function Header() {
  const { rive, RiveComponent } = useRive({
    src: '/rive/menuicon.riv',
    stateMachines: 'MenuIcon',
    artboard: 'icons8-menu',
    autoplay: true,
  });
  const [openMenu, setOpenMenu] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const activeInput = useStateMachineInput(rive, 'MenuIcon', 'active');

  const email = 'sumandr27@gmail.com'; // Replace with your actual email

  useEffect(() => {
    // This code will only run on the client side
    if (typeof window !== 'undefined') {
      // Any window-dependent code can go here
    }
  }, []);

  const toggleActiveInput = () => {
    if (activeInput) {
      activeInput.value = !activeInput.value;
      setOpenMenu(!openMenu);
    }
  };

  const copyEmail = async (
    e: React.MouseEvent,
    isMobileMenu: boolean = false
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        setToastMessage('Email copied to clipboard!');
        // Only close mobile menu if this was called from mobile menu
        if (isMobileMenu) {
          toggleActiveInput();
        }
      } else {
        // Fallback for older browsers and non-secure contexts (like some mobile browsers)
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        // Only close mobile menu if this was called from mobile menu
        if (isMobileMenu) {
          toggleActiveInput();
        }

        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setToastMessage('Email copied to clipboard!');
          } else {
            setToastMessage('Copy failed. Please copy manually: ' + email);
          }
        } catch (err) {
          console.error('Fallback copy failed:', err);
          setToastMessage('Copy failed. Please copy manually: ' + email);
        }

        document.body.removeChild(textArea);
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
      setToastMessage('Copy failed. Please copy manually: ' + email);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleNavigation = (section: string) => {
    // Close mobile menu if open
    if (openMenu) {
      toggleActiveInput();
    }

    // Scroll to section or handle navigation
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If section doesn't exist, you can add routing logic here
      console.log(`Navigate to ${section}`);
    }
  };

  const { rive: rive2, RiveComponent: RiveComponent2 } = useRive({
    src: '/rive/tree.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
    useOffscreenRenderer: true,
  });

  return (
    <>
      <div className='w-full fadeDown z-50 flex justify-between text-xl items-center text-texttertiary px-6 py-2 fixed top-0 backdrop-blur-sm '>
        <div
          onClick={() => handleNavigation('home')}
          className='cursor-pointer hover:text-tertiary transition-colors duration-200 h-12 w-12'
        >
          <RiveComponent2 />
        </div>
        <div className='lg:flex items-center gap-6  hidden '>
          <span
            onClick={() => handleNavigation('home')}
            className='cursor-pointer hover:text-tertiary transition-colors duration-200'
          >
            Home
          </span>
          <span
            onClick={() => handleNavigation('about')}
            className='cursor-pointer hover:text-tertiary transition-colors duration-200'
          >
            About
          </span>
          <span
            onClick={() => handleNavigation('work')}
            className='cursor-pointer hover:text-tertiary transition-colors duration-200'
          >
            Work
          </span>
          <span
            onClick={(e) => copyEmail(e, false)}
            className='cursor-pointer hover:text-tertiary transition-colors duration-200 select-none'
          >
            Email
          </span>
        </div>
        <div className='w-8 h-8 lg:hidden z-50'>
          <RiveComponent onClick={toggleActiveInput} />
        </div>
        {openMenu && (
          <div className='fixed top-0 left-0 w-full h-dvh flex flex-col items-center justify-start gap-4 bg-black/95 z-40 p-20 transition-all duration-300 ease-in-out '>
            <span
              onClick={() => handleNavigation('home')}
              className='cursor-pointer hover:text-tertiary transition-colors duration-200'
            >
              Home
            </span>
            <span
              onClick={() => handleNavigation('about')}
              className='cursor-pointer hover:text-tertiary transition-colors duration-200'
            >
              About
            </span>
            <span
              onClick={() => handleNavigation('work')}
              className='cursor-pointer hover:text-tertiary transition-colors duration-200'
            >
              Work
            </span>
            <span
              onClick={(e) => copyEmail(e, true)}
              className='cursor-pointer hover:text-tertiary transition-colors duration-200 select-none'
            >
              Email
            </span>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className='fixed top-20 right-6 z-[60] bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out max-w-xs'>
          {toastMessage}
        </div>
      )}
    </>
  );
}
export default Header;
