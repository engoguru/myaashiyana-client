import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '../reasctquery/api'; 

const Services = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const { data: carditems = [], isLoading, isError } = useQuery({
        queryKey: ['services'],
        queryFn: fetchServices,
    });

    return (
        <div className="bg-[#072724] font-Lora w-full h-full px-5 overflow-hidden relative">
            {/* Overlay */}
            <div className="absolute inset-0 grid place-items-center w-full h-[32vh]">
                <img src="/assets/image/overlay.png" alt="" className="w-full h-full object-cover" />
            </div>

            <img
                data-aos="fade-up"
                data-aos-delay="200"
                src="/assets/image/dogeee.png"
                alt=""
                className="w-[35vw] h-[35vw] absolute bottom-0 right-0 object-contain"
            />

            {/* Content */}
            <div className="relative pt-20 text-white w-full flex justify-start items-start text-center px-2 flex-1">
                <div className="leading-0 max-w-7xl text-start space-y-4">
                    <h2 data-aos="fade-up" className="text-lg text-[#D89D55] md:text-2xl">Our Services</h2>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-sm md:leading-18 md:text-[3.4rem]"
                    >
                        Our shelter charity is dedicated to providing a safe haven for abandoned and abused animals, offering them a second chance at a happy and healthy life.
                    </p>
                </div>
            </div>

            {/* Loader/Error States */}
            {isLoading && <p className="text-white text-center mt-10">Loading services...</p>}
            {isError && <p className="text-red-500 text-center mt-10">Failed to load services.</p>}

            {/* Cards */}
            {!isLoading && !isError && (
                <div className="relative grid grid-cols-1 md:grid-cols-2 place-items-center md:px-32 md:-ml-32 md:max-w-6xl mt-10 w-full">
                    {/* Cross Border */}
                    <div className="absolute hidden inset-0 md:flex items-center justify-center">
                        <div className="absolute w-[1px] h-full bg-white"></div>
                        <div className="absolute w-4xl h-[1px] bg-white"></div>
                    </div>

                    {carditems.map((item, index) => (
                        <div
                            key={item.id}
                            data-aos="fade-up"
                            data-aos-delay={`${index * 100}`}
                            className="md:w-[30vw] space-y-3 flex justify-center items-start md:items-center flex-col rounded-lg p-5"
                        >
                            <img src={item.image} alt="" className="w-[8vw] h-[8vw] object-cover" />
                            <h3 className="text-[1rem] text-center text-white font-semibold">{item.title}</h3>
                            <p className="text-gray-500 md:text-[1rem] text-sm md:text-center text-start">{item.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Services;
