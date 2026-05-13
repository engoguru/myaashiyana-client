import React, { useEffect } from 'react';
import CardAnimal from './Cardanimal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery } from '@tanstack/react-query';
import { fetchAnimals } from '../reasctquery/api';
import { useNavigate } from 'react-router-dom'; 

const AllAnimalsPage = () => {
    const navigate = useNavigate(); 

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const {
        data: animals = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['animals'],
        queryFn: fetchAnimals,
    });


    const handleReadMoreClick = (id) => {
        navigate(`/animals/${id}`);
    };

    return (
        <section className="w-full min-h-screen bg-[#072724] px-3 md:px-10 py-32 relative font-Lora overflow-hidden">
            <style>{`
                @keyframes shimmer {
                    0% { background-position: -100% 0; }
                    100% { background-position: 100% 0; }
                }
                .shimmer-overlay {
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }
            `}</style>
            
            {/* Background Texture */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/image/overlay.png"
                    alt=""
                    className="w-full h-full object-cover opacity-20"
                />
            </div>

            <div className="text-center mb-16 relative z-10" data-aos="fade-down">
                <span className="text-[#D89D55] text-xs md:text-sm font-bold uppercase tracking-[0.3em] font-heading mb-3 block">
                    Meet Our Rescued Souls
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-heading leading-tight mb-6">
                    Every Face Has <span className="text-[#BEFD95]">a Story</span>
                </h2>
                <div className="w-20 h-1 bg-[#BEFD95] mx-auto mb-8 rounded-full opacity-40" />
                <p className="text-[#C7D2C7] text-sm md:text-lg max-w-2xl mx-auto px-4 font-SourceSans leading-relaxed opacity-90">
                    These beautiful lives are seeking love, care, and a compassionate sponsor — like you. Your sponsorship directly funds their healing and happiness.
                </p>
            </div>

            {/* Loading / Error states */}
            {isLoading && (
                <div className="text-white text-center z-10 relative">Loading animal stories...</div>
            )}
            {isError && (
                <div className="text-red-500 text-center z-10 relative">Failed to load animal stories.</div>
            )}

            {/* Responsive Grid - 3-2-1 Format */}
            {!isLoading && !isError && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 z-10 relative max-w-7xl mx-auto justify-items-center">
                    {animals.map((animal, index) => (
                        <div key={animal._id} className="w-full max-w-[450px]">
                            <CardAnimal
                                animal={animal}
                                index={index}
                                onReadMoreClick={handleReadMoreClick} 
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default AllAnimalsPage;
