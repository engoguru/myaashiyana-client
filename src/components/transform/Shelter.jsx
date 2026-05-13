import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Shelter = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: false, offset: 100 });
    }, []);
    return (
        <div className='relative min-h-screen font-Lora md:py-32 py-20 w-full bg-white'>
            {/* Background Images */}
            <div className='absolute inset-0 w-full h-full pointer-events-none'>
                <img
                    className='absolute bottom-0 rotate-90 right-0 object-cover w-52 h-52'
                    src='/assets/image/secondoverlay.png'
                    alt=''
                />
                <img
                    className='absolute top-0 left-0 object-cover w-44 h-44'
                    src='/assets/image/overlay3.png'
                    alt=''
                />
            </div>

            {/* Content */}
            <div className='relative flex flex-wrap md:flex-nowrap items-center gap-10 px-5 md:px-20'>
                <div

                    data-aos="fade-up"
                    data-aos-delay="100"
                    className='w-full md:w-1/2 p-5'>
                    <img src='/assets/image/whyUs.webp' alt='Shelter' className='w-full md:h-[70vh] object-fit-left rounded-md shadow-lg' />
                </div>

                <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className='w-full md:w-1/2 space-y-5'>
                    <h3 className='text-lg font-semibold text-[#D89D55]'>Why Us</h3>
                    <h1 className='text-3xl md:text-5xl font-bold text-[#072724]'>Transforming Lives with Shelter Charity</h1>
                    <p className='text-lg font-SourceSans md:text-2xl text-gray-700'>
                        With your support, we can rescue animals from overcrowded shelters, provide them with medical care and rehabilitation, and match them with loving forever families.
                    </p>
                    <ul className='text-lg font-SourceSans md:text-2xl text-gray-700 list-disc pl-5'>
                        <li>Promoting Animal Welfare</li>
                        <li>Community Engagement and Education</li>
                        <li>Addressing Overpopulation and Homelessness</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Shelter
