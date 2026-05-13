import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { fetchTestimonials } from '../reasctquery/api';

// ✅ API Fetcher


const Testimonials = () => {
    const { data: testimonials = [], isLoading, isError } = useQuery({
        queryKey: ['testimonials'],
        queryFn: fetchTestimonials,
    });

    return (
        <div className="bg-[#F7F1EA] font-Lora w-full h-full pt-6 md:p-32 px-5 overflow-hidden relative">
            {/* Background Overlay */}
            <div className="absolute inset-0 grid place-items-center w-full h-full">
                <img
                    src="/assets/image/overlay.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Header Section */}
            <div className="relative md:py-6 pt-0 text-white w-full flex flex-col justify-center items-center text-center px-2">
                <div className="leading-10 md:max-w-5xl space-y-4">
                    <h2 className="text-lg text-[#D89D55] md:text-2xl uppercase">Testimonials</h2>
                    <h1 className="text-3xl md:text-[4rem] text-[#072724] font-bold">Happy Families, Happy Stories</h1>
                    <p className="text-sm text-[#404E4D] md:text-lg">
                        At our shelter charity, we believe that compassion has the power to change lives.
                        Every animal deserves a loving home, and our shelter charity is committed to making that a reality.
                    </p>
                </div>
            </div>

            {/* Loading / Error States */}
            {isLoading && (
                <div className="text-center text-[#072724] mt-10">Loading testimonials...</div>
            )}
            {isError && (
                <div className="text-center text-red-600 mt-10">Failed to load testimonials.</div>
            )}

            {/* Testimonials Swiper */}
            {!isLoading && !isError && (
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    speed={2000}
                    loop
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    pagination={{ clickable: true, el: ".custom-pagination" }}
                    modules={[Pagination, Autoplay]}
                    className="mt-10 w-[90%]"
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item._id} className="flex p-5 overflow-hidden w-full h-auto bg-[#FCFBF8] rounded-md justify-center items-center">
                            <div className='space-y-3 flex justify-start w-full items-start flex-col rounded-lg'>
                                <img
                                    src={item?.images?.[0]?.url || "/fallback-avatar.png"}
                                    alt={item.name}
                                    className='w-20 h-20 object-cover rounded-full border border-[#D89D55]'
                                />
                                <h3 className='text-[1rem] text-center text-[#9AA48A] font-semibold capitalize'>{item.name}</h3>
                                <p className='text-black md:text-[1rem] text-sm'>{item.comment}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Custom Pagination */}
            <div className="custom-pagination flex justify-center mt-5 space-x-2"></div>
        </div>
    );
};

export default Testimonials;
