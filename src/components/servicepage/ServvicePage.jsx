import React, { useState, useEffect } from 'react';


const ServicePage = () => {
    const [count, setCount] = useState(600);
    const [shouldStart, setShouldStart] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 45) {
                setShouldStart(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!shouldStart) return;
        const interval = setInterval(() => {
            setCount(prevCount => {
                if (prevCount >= 1000) {
                    clearInterval(interval);
                    return prevCount;
                }
                return prevCount + 1;
            });
        }, 1);
        return () => clearInterval(interval);
    }, [shouldStart]);
    let comacount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <div className='w-full mt-20 font-Lora md:p-10 px-5 p-5 grid md:grid-cols-2 grid-cols-1 md:gap-30 md:px-10'>
            <div className='grid place-items-center'>
                <img src="/assets/image/medication.webp" alt="" className="md:w-[40vw] h-[60vh] rounded-xl object-cover" />
            </div>

            <div className='leading-tight space-y-3 pt-8 md:pt-16'>
                <h1 className='text-[3.5rem] md:text-[7rem] text-[#99A389] font-Lora font-bold leading-none'>{comacount}+</h1>
                <h2 className='text-[1.8rem] md:text-[3.5rem] leading-tight md:leading-14'>rescued animals from various situations</h2>
                <p className='text-base md:text-xl leading-7 md:leading-9 font-SourceSans'>Together, we can make miracles happen for animals in crisis. Our shelter charity relies on the generosity of animal lovers like you to provide essential care and support to abandoned and neglected animals. Your donation can help us cover the costs of veterinary care, spaying and neutering, and behavioral training, ensuring that every animal receives the care they need to thrive.</p>
                <div className='mt-5 w-full grid place-items-start'>
                    <button className='px-10 py-4 hover:bg-[#072724] cursor-pointer hover:text-white text-lg border border-[#072724] text-[#072724]'>
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
