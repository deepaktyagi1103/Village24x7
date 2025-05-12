import React, { useState, useEffect } from 'react';

const NumbersSpeak = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setCount1((prevCount) => (prevCount < 1000 ? prevCount + 1 : 1000));
    }, 10);

    const interval2 = setInterval(() => {
      setCount2((prevCount) => (prevCount < 400 ? prevCount + 1 : 400));
    }, 5);

    const interval3 = setInterval(() => {
      setCount3((prevCount) => (prevCount < 20 ? prevCount + 1 : 20));
    }, 15);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  return (
    <div className="container flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 h-60 p-6 md:p-12 lg:p-16">
      <h2 className="numbers-speak font-ultra text-white text-3xl md:text-4xl lg:text-5xl py-4 text-center">Numbers Speak for Themselves!</h2>
      <div className="numbers-container flex flex-col md:flex-row justify-evenly px-4 gap-8 md:gap-12 lg:gap-24 py-6">
        <div className="number-card bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
          <div className="number text-black font-luckiest text-3xl md:text-4xl text-center">{count1}+</div>
          <div className="description text-black font-oswald text-lg md:text-xl">Curated Products</div>
        </div>
        <div className="number-card bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
          <div className="number text-black font-luckiest text-3xl md:text-4xl text-center">{count2}+</div>
          <div className="description text-black font-oswald text-lg md:text-xl">Curated Products</div>
        </div>
        <div className="number-card bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
          <div className="number text-black font-luckiest text-3xl md:text-4xl text-center">{count3}+</div>
          <div className="description text-black font-oswald text-lg md:text-xl">Product Categories</div>
        </div>
      </div>
    </div>
  );
};

export default NumbersSpeak;