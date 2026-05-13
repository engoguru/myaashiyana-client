import React from 'react';

const Meetaashiyana = () => (
    <section className="relative w-full flex justify-center items-center py-24 px-4 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center rounded-3xl shadow-2xl bg-white/30 backdrop-blur-2xl border border-[#BEFD95]/60 p-10">
            {/* Group Photo */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg border border-[#BEFD95]/40">
                <img
                    src="/assets/image/members.webp"
                    alt="Aashiyana Foundation Team"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            {/* Content */}
            <div className="flex flex-col justify-center h-full space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-[#072724] leading-tight font-heading">
                    Meet the Aashiyana Family
                </h2>
                <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-medium">
                    Behind every rescued animal is a family of hearts — caregivers, volunteers, and dreamers — united by compassion.
                </p>
                <p className="text-xl md:text-2xl text-[#555] italic">
                    Together, we celebrate every wag, every purr, every second chance. Our team believes that healing begins with hope, and that a loving touch can change a life forever.
                </p>
                <div className="text-lg md:text-xl text-[#54b36b] font-semibold mt-4">
                    We’re more than a team — we’re a family, and every animal is a part of us.
                </div>
            </div>
        </div>
    </section>
);

export default Meetaashiyana;
