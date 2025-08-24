import React from 'react';

const Games = () => {
  const games = [
    {
      id: 1,
      title: 'Coming Soon',
      description: 'Interactive web games and experiences are in development.',
      status: 'In Development',
      image: '/images/h.png',
      category: 'Web Games',
    },
    {
      id: 2,
      title: 'Canvas Animations',
      description: 'Custom canvas-based animations and visual effects.',
      status: 'Available',
      image: '/images/h.png',
      category: 'Animations',
    },
    {
      id: 3,
      title: 'Rive Experiences',
      description: 'Interactive animations built with Rive.',
      status: 'Available',
      image: '/images/h.png',
      category: 'Animations',
    },
  ];

  return (
    <div className='space-y-8'>
      {/* Games Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {games.map((game) => (
          <div
            key={game.id}
            className='bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-tertiary/50 transition-all duration-300 hover:transform hover:scale-105'
          >
            <div className='space-y-4'>
              {/* Game Image */}
              <div className='relative h-48 bg-gradient-to-br from-tertiary/20 to-quaternary/20 rounded-lg overflow-hidden'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='text-4xl text-tertiary'>🎮</div>
                </div>
                <div className='absolute top-2 right-2'>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      game.status === 'Available'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {game.status}
                  </span>
                </div>
              </div>

              {/* Game Info */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-bold text-secondary'>
                    {game.title}
                  </h3>
                  <span className='text-xs text-tertiary bg-tertiary/10 px-2 py-1 rounded-full'>
                    {game.category}
                  </span>
                </div>
                <p className='text-sm text-secondary/70 leading-relaxed'>
                  {game.description}
                </p>
              </div>

              {/* Action Button */}
              <button className='w-full bg-tertiary/10 hover:bg-tertiary/20 text-tertiary border border-tertiary/30 hover:border-tertiary/50 rounded-lg py-2 px-4 transition-all duration-300 font-medium'>
                {game.status === 'Available' ? 'Launch Game' : 'Coming Soon'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className='bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10'>
        <h3 className='text-2xl font-bold text-secondary mb-4'>
          About Our Games
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='text-lg font-semibold text-tertiary mb-2'>
              Web Technologies
            </h4>
            <p className='text-sm text-secondary/70'>
              Our games are built using modern web technologies including React,
              Canvas API, and WebGL for smooth, responsive experiences across
              all devices.
            </p>
          </div>
          <div>
            <h4 className='text-lg font-semibold text-tertiary mb-2'>
              Interactive Design
            </h4>
            <p className='text-sm text-secondary/70'>
              Each game features intuitive controls, engaging visuals, and
              smooth animations to create memorable user experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
