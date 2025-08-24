'use client';

import { useEffect, useState } from 'react';
import { EventType, useRive } from '@rive-app/react-webgl2';
import Image from 'next/image';
import moment from 'moment';
import BgGradient from './component/BgGradient';
import {
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandNodejs,
  IconBrandMongodb,
  IconBrandFigma,
  IconCircleDottedLetterC,
  IconKeyframes,
  IconMessage2,
  IconMessage2Code,
  IconBrandOpenai,
} from '@tabler/icons-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isRiveLoaded, setIsRiveLoaded] = useState(false);
  const [today, setToday] = useState(moment());
  const { rive, RiveComponent } = useRive({
    src: '/rive/title.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
    useOffscreenRenderer: true,
  });

  const { rive: rive2, RiveComponent: RiveComponent2 } = useRive({
    src: '/rive/tree.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
    useOffscreenRenderer: true,
  });

  useEffect(() => {
    if (rive) {
      rive.on(EventType.RiveEvent, (riveEvent: any) => {
        if (riveEvent.data?.name == 'End') {
          setIsAnimationComplete(true);
        }
      });
    }
  }, [rive]);

  useEffect(() => {
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Ensure the code runs only on the client side
    if (typeof window === 'undefined') return;

    const path = document.querySelector('#path') as SVGPathElement;
    if (!path) return;
    const pathLength = path.getTotalLength();

    // Set initial stroke properties for path "drawing"
    path.style.strokeDasharray = pathLength.toString();
    path.style.strokeDashoffset = pathLength.toString();

    // Circle elements
    const circleElements = [
      document.querySelector('#circle1'),
      document.querySelector('#circle2'),
      document.querySelector('#circle3'),
      document.querySelector('#circle4'),
    ];

    // Percentage positions for circles
    const positions = [0, 0.3333, 0.6666, 1];

    // Place circles along the path
    positions.forEach((position, index) => {
      const point = path.getPointAtLength(pathLength * position);
      const circle = circleElements[index];
      const text = document.querySelector(`#circle${index + 1}Text`);
      if (!circle || !text) return;

      // Set circle position
      circle.setAttribute('cx', point.x.toString());
      circle.setAttribute('cy', point.y.toString());

      // Set text position
      text.setAttribute('x', point.x.toString());
      text.setAttribute('y', point.y.toString());
    });

    // Create a timeline for all animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#path',
        start: '-200px center',
        end: 'bottom 30%',
        scrub: true,
        toggleActions: 'play resume resume resume',
        once: true,
      },
    });

    // Calculate the exact timing for each circle based on path length
    const circleTimings = positions.map((position) => ({
      position,
      timing: position * pathLength,
    }));

    // Animate the path drawing
    tl.fromTo(
      path,
      { strokeDashoffset: pathLength },
      {
        strokeDashoffset: 0,
        duration: 2, // Increased duration
        ease: 'none', // Linear animation
      }
    );

    // Animate circles and text at their exact positions
    circleTimings.forEach(({ position }, index) => {
      const circle = document.querySelector(`#circle${index + 1}`);
      const text = document.querySelector(`#circle${index + 1}Text`);

      if (!circle || !text) return;

      // Set initial state
      gsap.set([circle, text], { scale: 0, transformOrigin: 'center' });

      // Calculate the exact time when the stroke reaches this position
      const strokeProgress = position; // 0 to 1

      // Animate circle and text when path reaches their position
      tl.to(
        circle,
        { scale: 1, duration: 0.1, ease: 'power1.out' },
        strokeProgress * 2 // Adjusted timing to match new duration
      );

      tl.to(
        text,
        { scale: 1, duration: 0.1, ease: 'power1.out' },
        strokeProgress * 2 // Adjusted timing to match new duration
      );
    });

    // Animate elements on scroll
    gsap.defaults({ ease: 'power3' });
    gsap.set('.animate-on-scroll', { opacity: 0, y: 100 });

    ScrollTrigger.batch('.animate-on-scroll', {
      interval: 0.1,
      onEnter: (batch: any) => gsap.to(batch, { opacity: 1, y: 0 }),
    });
  }, []);

  return (
    <div className='h-auto w-full '>
      <div
        id='home'
        className='w-1/2 h-1/2 absolute top-0 left-0 bg-gradient-to-b rotate-45 opacity-50 from-primary/5 to-quaternary/10 blur-3xl'
      />
      <div className='w-full h-svh flex items-center justify-center relative'>
        <div className='absolute top-0 left-0 w-full h-full opacity-5 z-0 blur-3xl' />
        <div className='flex flex-col max-w-7xl items-center justify-center gap-4 w-full h-full'>
          <div className='w-full h-auto  aspect-[5/1] flex items-center justify-center'>
            <RiveComponent />
          </div>
          <div
            className={`text-sm lg:text-xl w-full px-6 ${
              isAnimationComplete ? 'fadeUp' : 'opacity-0'
            } text-center`}
          >
            <div>
              I build things for the web that look good, feel smooth, and just
              work. From clean UI layouts to tiny micro-animations that make you
              smile, I’m all about adding those little touches that make a big
              difference.
            </div>
            <div>One of my strengths is animating things in Rive.</div>
          </div>
          <button
            onClick={() => window.open('mailto:sumandr27@gmail.com', '_blank')}
            className={`flex lg:text-xl text-lg justify-center items-center lg:px-6 px-4 lg:py-3 py-2 w-fit rounded-full  bg-tertiary  text-white font-semibold ${
              isAnimationComplete ? 'fadeUp' : 'opacity-0'
            }`}
          >
            Get in touch
          </button>
        </div>
        <div className='absolute bottom-0 right-0 w-[50%] max-w-sm h-auto aspect-square z-0 opacity-10'>
          <RiveComponent2 />
        </div>
      </div>

      {/* About Me */}
      <div
        id='about'
        data-aos='fade-up'
        className='w-full flex flex-col items-center justify-center px-8 my-10 h-fit'
      >
        <div className='lg:text-6xl  text-3xl my-7 font-bold text-tertiary '>
          About Me
        </div>
        <div className='relative flex flex-col  items-center justify-center gap-4 max-w-5xl text-xs lg:text-sm  font-normal text-white text-center'>
          <div className=''>
            I build web apps with React, Next.js, Tailwind, and other cool
            tools. On the backend, I use Node, Express, and MongoDB. My goal is
            simple — make things just work, run fast, and feel smooth, with
            micro-animations and minimal steps that make the whole experience
            effortless.
          </div>
          <div className=''>
            Beyond coding, I create Rive animations and run a YouTube channel
            where I share tutorials and tech tips to help aspiring developers.
            I’m all about learning, experimenting, and using creativity to solve
            real-world problems with technology.
          </div>
        </div>
      </div>

      {/* Experience */}
      <div
        id='work'
        className='w-full h-full flex items-center justify-center mt-12'
      >
        <div className='lg:text-6xl text-3xl font-bold text-tertiary animate-on-scroll'>
          Experience
        </div>
      </div>

      <div className='w-full lg:h-[1619px] h-auto relative mt-6 px-8'>
        <div className='w-full grid lg:grid-cols-2 max-w-6xl mx-auto gap-4 text-white relative'>
          <div className='w-full lg:h-[404px] h-auto flex flex-col gap-2 items-center justify-center'>
            <div className='flex flex-col justify-center items-center animate-on-scroll'>
              <div className='lg:text-2xl text-lg font-bold'>
                Front End Engineer{' '}
              </div>
              <div className='font-normal'>Soul Trading LLC, (Dubai)</div>
            </div>
            <div className='text-xs lg:text-sm font-normal flex flex-col gap-2 text-center'>
              <div className='animate-on-scroll'>
                I’ve developed and deployed multiple iGaming projects, including
                slots, poker, and casual games like Mines, Plinko, and Limbo,
                with secure gameplay logic and real-time interactions. Using
                Next.js, Canvas, and Tailwind CSS, I built high-performance web
                apps with optimized rendering, faster load times, and seamless
                multiplayer features through WebSockets and MQTT.
              </div>
              <div className='animate-on-scroll'>
                I led end-to-end development, from planning to deployment, while
                driving best practices through code reviews and performance
                optimizations. By integrating animations with Rive and Lottie, I
                enhanced user engagement and retention, and worked closely with
                designers and product teams to deliver responsive, intuitive,
                and accessible interfaces across devices.
              </div>
              <div className='animate-on-scroll flex flex-wrap gap-2 items-center justify-center'>
                <span className='font-bold'>Tech Stack:</span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandReact size={16} />
                  React
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandNextjs size={16} />
                  Next.js
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandTailwind size={16} />
                  Tailwind CSS
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandJavascript size={16} />
                  JavaScript
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandTypescript size={16} />
                  TypeScript
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconCircleDottedLetterC size={16} />
                  Canvas
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconMessage2Code size={16} />
                  WebSockets
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconKeyframes size={16} />
                  Rive
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center animate-on-scroll text-xs lg:text-base'>
            Mar 2024 - Present
          </div>
        </div>

        <div className='w-full grid lg:grid-cols-2 mt-10 lg:mt-0 grid-cols-1 max-w-6xl mx-auto gap-4 text-white relative'>
          <div className='flex flex-col text-xs lg:text-base justify-center items-center animate-on-scroll order-last lg:order-first'>
            Apr 2023 - Mar 2024
          </div>
          <div className='w-full lg:h-[404px] h-auto flex flex-col gap-2 items-center justify-center text-white lg:px-8 px-2'>
            <div className='flex flex-col justify-center items-center animate-on-scroll'>
              <div className='text-xl lg:text-2xl font-bold'>
                Front End Engineer{' '}
              </div>
              <div className='font-normal'>
                {' '}
                iEllipse Technologies, (Bangalore)
              </div>
            </div>
            <div className='text-xs lg:text-sm font-normal flex flex-col gap-2 text-center'>
              <div className='animate-on-scroll'>
                I developed and maintained responsive product pages and
                navigation components using React, Next.js, and Tailwind CSS,
                ensuring smooth and visually consistent user experiences across
                consumer-facing and fintech platforms. Collaborating with
                designers and product teams, I translated UI/UX designs into
                pixel-perfect, high-performance interfaces while adhering to
                fintech compliance standards. I also built reusable, modular
                components to improve development efficiency and created secure
                features tailored for dashboards, payment workflows, and
                transaction histories.
              </div>
              <div className='animate-on-scroll'>
                Additionally, I integrated RESTful APIs for seamless data flow
                and dynamic rendering, enabling real-time financial data
                visualization and transaction tracking. Through testing,
                debugging, and performance optimization, I enhanced application
                stability, responsiveness, and user satisfaction, with a strong
                focus on data accuracy, security, and compliance in financial
                applications.
              </div>
              <div className='animate-on-scroll flex flex-wrap gap-2 items-center justify-center'>
                <span className='font-bold'>Tech Stack:</span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandNextjs size={16} />
                  Next.js
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandTailwind size={16} />
                  Tailwind CSS
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandJavascript size={16} />
                  JavaScript
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandTypescript size={16} />
                  TypeScript
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandFigma size={16} />
                  Figma
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full grid lg:grid-cols-2 mt-10 lg:mt-0 grid-cols-1 max-w-6xl mx-auto gap-4 text-white relative'>
          <div className='w-full lg:h-[404px] h-auto flex flex-col gap-2 items-center justify-center text-white'>
            <div className='flex flex-col justify-center items-center animate-on-scroll'>
              <div className='lg:text-2xl text-lg font-bold'>
                Freelance Fullstack Developer
              </div>
              <div className='font-normal'>Self-Employed</div>
            </div>
            <div className='text-xs lg:text-sm font-normal flex flex-col gap-2 text-center'>
              <div className='animate-on-scroll'>
                I developed and maintained web applications for diverse clients
                using Next.js, React, and Node.js, delivering responsive,
                scalable, and high-performing solutions. Managing the full
                development lifecycle, I handled UI/UX design, backend API
                integration, testing, deployment, and maintenance while ensuring
                timely delivery and smooth project execution. I collaborated
                closely with clients and stakeholders, providing clear
                communication and solutions tailored to their goals and
                challenges.
              </div>
              <div className='animate-on-scroll'>
                I adapted quickly to evolving requirements, applying creative
                problem-solving and strong time management to meet tight
                deadlines without compromising quality. By implementing
                performance optimizations, responsive design, and accessibility
                best practices, I delivered polished applications that enhanced
                user engagement, functioned seamlessly across devices, and
                created lasting value for clients.
              </div>
              <div className='animate-on-scroll flex flex-wrap gap-2 items-center justify-center'>
                <span className='font-bold'>Tech Stack:</span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandReactNative size={16} />
                  React Native
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandTailwind size={16} />
                  Tailwind CSS
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandJavascript size={16} />
                  JavaScript
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandTypescript size={16} />
                  TypeScript
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandNodejs size={16} />
                  Node.js
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandMongodb size={16} />
                  MongoDB
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandFigma size={16} />
                  Figma
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandNextjs size={16} />
                  Next.js
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandReact size={16} />
                  React
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandNodejs size={16} />
                  Express
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconMessage2Code size={16} />
                  WebRTC
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandOpenai size={16} />
                  OpenAI
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center text-xs lg:text-base animate-on-scroll'>
            Nov 2021 - present
          </div>
        </div>

        <div className='w-full grid lg:grid-cols-2 mt-10 lg:mt-0 grid-cols-1 max-w-6xl mx-auto gap-4 text-white relative'>
          <div className='flex flex-col justify-center items-center text-xs lg:text-base animate-on-scroll order-last lg:order-first'>
            March 2021 - Nov 2021
          </div>
          <div className='w-full lg:h-[404px] h-auto flex flex-col gap-2 items-center justify-center text-white'>
            <div className='flex flex-col justify-center items-center animate-on-scroll'>
              <div className='lg:text-2xl text-lg font-bold'>
                MERN Stack Developer
              </div>
              <div className='font-normal'>(Freelancer)</div>
            </div>
            <div className='text-xs lg:text-sm font-normal flex flex-col gap-2 text-center'>
              <div className='animate-on-scroll'>
                Leveraged the MERN stack to create diverse applications,
                including landing pages, the Siri Ambari Hotel landing and
                booking page, and a teaching platform for EQiXS.
              </div>
              <div className='animate-on-scroll'>
                Developed a robust teaching platform enabling teachers to create
                accounts, host online sessions, and engage with students
                effectively.
              </div>
              <div className='animate-on-scroll flex flex-wrap gap-2 items-center justify-center'>
                <span className='font-bold'>Tech Stack:</span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandReact size={16} />
                  React
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandTailwind size={16} />
                  Tailwind CSS
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandJavascript size={16} />
                  JavaScript
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandTypescript size={16} />
                  TypeScript
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandNextjs size={16} />
                  Next.js
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandFigma size={16} />
                  Figma
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandNodejs size={16} />
                  Express
                </span>
                <span className='flex gap-1 backdrop-blur-sm items-center bg-white/10 rounded-xl w-fit px-2 py-1 text-[10px]'>
                  <IconBrandMongodb size={16} />
                  MongoDB
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='absolute top-0 left-0 w-full h-full hidden items-center justify-center lg:flex'>
          <svg
            id='svg'
            width='375'
            height='1619'
            viewBox='0 0 375 1619'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              id='path'
              d='M302.504 195C302.504 195 46.867 418.887 48.0038 608.5C49.1296 796.287 303.023 828.71 302.504 1016.5C301.987 1203.46 48.0038 1422 48.0038 1422'
              stroke='#ff9d00'
              strokeWidth='4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />

            <circle r='40' fill='#FF005E' id='circle1' />
            <text
              x='50%'
              y='50%'
              textAnchor='middle'
              dy='0.3em'
              id='circle1Text'
              fontSize='16'
              fontWeight='bold'
              fill='white'
            >
              {today.diff(moment('2024-03-01'), 'years')}.
              {today.diff(moment('2024-03-01'), 'months') % 12} years
            </text>

            <circle r='40' fill='#FF005E' id='circle2' />
            <text
              x='50%'
              y='50%'
              textAnchor='middle'
              dy='0.3em'
              id='circle2Text'
              fontSize='16'
              fontWeight='bold'
              fill='white'
            >
              {1} year
            </text>

            <circle r='40' fill='#FF005E' id='circle3' />
            <text
              x='50%'
              y='50%'
              textAnchor='middle'
              dy='0.3em'
              id='circle3Text'
              fontSize='16'
              fontWeight='bold'
              fill='white'
            >
              {today.diff(moment('2021-03-01'), 'years')}.
              {today.diff(moment('2021-03-01'), 'months') % 12} years
            </text>

            <circle r='40' fill='#FF005E' id='circle4' />
            <text
              x='50%'
              y='50%'
              textAnchor='middle'
              dy='0.3em'
              id='circle4Text'
              fontSize='16'
              fontWeight='bold'
              fill='white'
            >
              8 months
            </text>
          </svg>
        </div>
      </div>

      {/* My Work */}
      <div
        data-aos='fade-up'
        className='w-full flex flex-col items-center justify-center px-8 py-10 h-full'
      >
        <div className='lg:text-6xl  text-4xl my-7 font-bold text-tertiary '>
          My Work
        </div>
        <div className='w-full  h-full flex flex-col items-center justify-center gap-4'>
          <div className='relative w-full max-w-5xl mx-auto h-auto aspect-video'>
            <Image
              className='w-full object-fill z-10 absolute top-0 left-0'
              src='/images/mackbook.webp'
              alt='work'
              width={1000}
              height={1000}
            />
            <video
              className='absolute top-[2%] left-0 w-full h-auto aspect-[16/10] scale-83'
              src='/videos/work.mp4'
              autoPlay
              muted
              loop
              playsInline
              preload='metadata'
              controls={false}
            />
          </div>
        </div>
      </div>

      {/* My Skills */}
      <div className='w-full flex flex-col items-center justify-center px-8 py-10 h-full opacity-0'>
        <div className='lg:text-6xl  text-4xl my-7 font-bold text-tertiary '>
          My Skills
        </div>
      </div>
    </div>
  );
}
