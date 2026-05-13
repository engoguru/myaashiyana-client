// src/components/ui/DogLoader.jsx
import React from 'react';

const DogLoader = () => {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#E0DDC9]">
            <img
                src="http://dl.glitter-graphics.net/pub/3708/3708541mj42jtmc9k.gif"
                alt="Loading..."
                className="w-40 h-auto"
            />
        </div>
    );
};

export default DogLoader;
