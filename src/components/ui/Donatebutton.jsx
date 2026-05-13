import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ item }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (item === "Donate Now") {
            navigate('/donate');
        }
    };

    return (
        <button
            onClick={handleClick}
            className="bg-[#D89D55] hover:bg-[#c18747] text-white px-6 py-3 rounded-lg shadow-md font-semibold transition-all duration-300"
        >
            {item}
        </button>
    );
};

export default Button;
