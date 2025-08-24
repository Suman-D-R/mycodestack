'use client';

import React from 'react';
import {
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandPinterest,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandDribbble,
  IconBrandBehance,
  IconMail,
  IconPhone,
  IconMapPin,
  IconHeart,
  IconBrandFunimation,
  IconKeyframe,
} from '@tabler/icons-react';

function Footer() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/suman-d-r',
      icon: IconBrandLinkedin,
      color: 'hover:text-quaternary',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Suman-D-R',
      icon: IconBrandGithub,
      color: 'hover:text-quaternary',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/suman_d_r',
      icon: IconBrandInstagram,
      color: 'hover:text-quaternary',
    },
    {
      name: 'Rive Animation',
      url: 'https://community.rive.app/u/d3710dd6',
      icon: IconKeyframe,
      color: 'hover:text-quaternary',
    },
  ];

  return (
    <footer className='w-full bg-black/20 backdrop-blur-sm border-t border-gray-800/50 h-fit'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8'>
          {/* Brand Section */}
          <div className='space-y-3 sm:space-y-4'>
            <div className='text-xl sm:text-2xl font-bold text-tertiary leading-tight'>
              Suman Devanga Rangaswamy
            </div>
            <p className='text-xs sm:text-sm text-gray-400 leading-relaxed'>
              Building beautiful, functional web experiences with a focus on
              user-centric design and smooth animations.
            </p>
            <div className='flex flex-wrap gap-2 sm:gap-3'>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`text-tertiary ${social.color} transition-colors duration-300 p-1.5 sm:p-2 rounded-lg hover:bg-gray-800/30 group`}
                    title={social.name}
                  >
                    <IconComponent className='w-4 h-4 sm:w-5 sm:h-5' />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-3 sm:space-y-4'>
            <h3 className='text-base sm:text-lg font-semibold text-white'>
              Quick Links
            </h3>
            <ul className='space-y-1.5 sm:space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-xs sm:text-sm text-gray-400 hover:text-tertiary transition-colors duration-300 block py-0.5'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-xs sm:text-sm text-gray-400 hover:text-tertiary transition-colors duration-300 block py-0.5'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-xs sm:text-sm text-gray-400 hover:text-tertiary transition-colors duration-300 block py-0.5'
                >
                  Work
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-xs sm:text-sm text-gray-400 hover:text-tertiary transition-colors duration-300 block py-0.5'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className='space-y-3 sm:space-y-4'>
            <h3 className='text-base sm:text-lg font-semibold text-white'>
              Services
            </h3>
            <ul className='space-y-1.5 sm:space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-xs sm:text-sm text-gray-400 hover:text-tertiary transition-colors duration-300 block py-0.5'
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-xs sm:text-sm text-gray-400 hover:text-tertiary transition-colors duration-300 block py-0.5'
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-xs sm:text-sm text-gray-400 hover:text-tertiary transition-colors duration-300 block py-0.5'
                >
                  Animation
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-xs sm:text-sm text-gray-400 hover:text-tertiary transition-colors duration-300 block py-0.5'
                >
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-3 sm:space-y-4'>
            <h3 className='text-base sm:text-lg font-semibold text-white'>
              Get In Touch
            </h3>
            <div className='space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-gray-400'>
              <div className='flex items-start gap-2'>
                <IconMail className='w-3 h-3 sm:w-4 sm:h-4 text-tertiary mt-0.5 flex-shrink-0' />
                <a
                  href='mailto:sumandr27@gmail.com'
                  className='hover:text-tertiary transition-colors duration-300 break-all'
                >
                  sumandr27@gmail.com
                </a>
              </div>
              <div className='flex items-start gap-2'>
                <IconPhone className='w-3 h-3 sm:w-4 sm:h-4 text-tertiary mt-0.5 flex-shrink-0' />
                <div className='flex flex-col gap-1'>
                  <a
                    href='tel:+971545419063'
                    className='hover:text-tertiary transition-colors duration-300'
                  >
                    +971 54 541 9063 (Dubai)
                  </a>
                  <a
                    href='tel:+919902696211'
                    className='hover:text-tertiary transition-colors duration-300'
                  >
                    +91 99026 96211 (India)
                  </a>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <IconMapPin className='w-3 h-3 sm:w-4 sm:h-4 text-tertiary flex-shrink-0' />
                <span>Dubai, UAE</span>
              </div>
              <button
                onClick={() =>
                  window.open('mailto:sumandr27@gmail.com', '_blank')
                }
                className='mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-tertiary text-white rounded-full hover:bg-quaternary transition-colors duration-300 font-medium flex items-center gap-2 text-xs sm:text-sm'
              >
                <IconMail className='w-3 h-3 sm:w-4 sm:h-4' />
                Contact Me
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-gray-800/50 pt-6 sm:pt-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0'>
            <div className='text-xs sm:text-sm text-gray-400 flex items-center gap-1 text-center sm:text-left'>
              © 2024{' '}
              <span className='text-tertiary'>Suman Devanga Rangaswamy</span>.
              Made with{' '}
              <IconHeart className='w-3 h-3 sm:w-4 sm:h-4 text-red-500' /> in
              Dubai, UAE
            </div>
            {/* <div className='flex space-x-4 sm:space-x-6 text-xs sm:text-sm'>
              <a
                href='#'
                className='text-gray-400 hover:text-tertiary transition-colors duration-300'
              >
                Privacy Policy
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-tertiary transition-colors duration-300'
              >
                Terms of Service
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-tertiary transition-colors duration-300'
              >
                Cookie Policy
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
