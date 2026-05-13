import React from 'react';
import { Link } from 'react-router-dom';
const Button = ({ item, color = "#BEFD95", textColor = "black" }) => {
    return (
          
        <Link to="/donate"
            className="group px-12 py-3.5 rounded-full whitespace-nowrap cursor-pointer transition-all duration-300 flex items-center justify-center overflow-hidden hover:scale-105 active:scale-95 shadow-lg"
            style={{ backgroundColor: color, color: textColor }}
        >
            <span className="font-bold flex items-center justify-center">{item}</span>
        </Link>
    );
};

export default Button;
