import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchServiceById } from '../reasctquery/api';
import Header from '../ui/Header';
// Fetch function for a single service


const ServiceDetailPage = () => {
    const { id } = useParams();

    const { data: service, isLoading, isError } = useQuery({
        queryKey: ['service', id],
        queryFn: () => fetchServiceById(id),
        enabled: !!id, // Only run if ID is present
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center  min-h-[40vh] text-lg text-gray-700">
                Loading service details...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-[40vh] text-lg text-red-500">
                Failed to load service details.
            </div>
        );
    }

    if (!service) {
        return (
            <div className="flex justify-center items-center min-h-[40vh] text-lg text-gray-700">
                Service not found.
            </div>
        );
    }

    return (
        <>
            <Header
                title={'Service details'}
                subheading={'Promoting Animal Welfare Together'}
                description={'At our shelter charity, we believe that compassion has the power to change lives. Every animal deserves a loving home, and our shelter charity is committed to making that a reality.'}
            />
            <div className="bg-[#072724] min-h-screen py-12 pt-32 px-4 flex flex-col items-center font-Lora relative">
                <div className="absolute inset-0 -z-10">
                    <img
                        src="/assets/image/overlay.png"
                        alt="overlay"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-7xl w-full p-8 flex flex-col items-center">
                    <img
                        src={service?.images?.[0]?.url || '/fallback-image.jpg'}
                        alt={service.heading}
                        className="w-full max-w-xl h-64 object-cover rounded-xl mb-6"
                    />
                    <h1 className="text-3xl font-bold text-[#D89D55] mb-4 text-center">{service.heading}</h1>
                    <div
                        className="text-gray-800 text-lg text-center leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: service.content }}
                    />
                </div>
            </div>
        </>
    );
};

export default ServiceDetailPage;
