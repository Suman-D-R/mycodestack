import React from 'react';

const multipleArray = [1, 5, 10, 20];

function page() {
  return (
    <div className='w-full h-full flex items-center justify-center bg-gray-500 gap-2 p-2 text-white '>
      <div className='w-auto flex-1 h-full bg-white'></div>
      <div className='w-full max-w-4xl h-full bg-white p-2 flex flex-col gap-2'>
        <div className='w-full h-auto flex-grow bg-black'></div>
        <div className='w-full h-auto bg-gray-500 min-h-48 flex p-2 gap-2'>
          <div className='w-full h-full bg-black'></div>
          <div className='w-full h-full bg-black flex flex-col gap-2 p-2'>
            <div className='w-full h-fit flex items-center justify-center gap-1 bg-gray-500 p-1 rounded-lg'>
              <input
                type='text'
                className='w-full h-full outline-none bg-transparent pl-1'
              />
              <div className='w-fit h-fit flex items-center justify-center gap-2 bg-black rounded-md px-4 py-1'>
                /2
              </div>
              <div className='w-fit h-fit flex items-center justify-center gap-2 bg-black rounded-md px-4 py-1'>
                x2
              </div>
            </div>
            <div className='w-full h-fit flex items-center justify-center gap-2 bg-black rounded-md '>
              {multipleArray.map((item) => (
                <div
                  key={item}
                  className='w-full h-fit flex items-center justify-center gap-2 bg-gray-500 rounded-md px-4 py-1'
                >
                  x{item}
                </div>
              ))}
            </div>
            <div className='w-full h-full flex items-center justify-center gap-2 bg-gray-500 rounded-md p-2'>
              BET
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
