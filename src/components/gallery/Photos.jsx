import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useQuery } from "@tanstack/react-query";
import { fetchGalleryData } from "../reasctquery/api";

// Helper to render video or YouTube iframe
const getVideoElement = (videoUrl, key) => {
    if (!videoUrl) return null;
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        let videoId = "";
        if (videoUrl.includes("youtube.com")) {
            const urlParams = new URLSearchParams(new URL(videoUrl).search);
            videoId = urlParams.get("v");
        } else if (videoUrl.includes("youtu.be")) {
            videoId = videoUrl.split("youtu.be/")[1];
        }
        if (videoId) {
            return (
                <iframe
                    key={key}
                    width="100%"
                    height="180"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Gallery Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                ></iframe>
            );
        }
    }
    if (videoUrl.match(/\.(mp4|webm|ogg)$/)) {
        return (
            <video
                key={key}
                width="100%"
                height="180"
                controls
                className="rounded-lg"
            >
                <source src={videoUrl} />
                Your browser does not support the video tag.
            </video>
        );
    }
    return (
        <a
            key={key}
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-500 underline"
        >
            View Video
        </a>
    );
};

const Photos = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const { data, error, isLoading } = useQuery({
        queryKey: ["gallery"],
        queryFn: fetchGalleryData,
    });

    const [activeTab, setActiveTab] = useState("images");

    if (isLoading) return <div>Loading gallery...</div>;
    if (error) return <div>Error loading gallery: {error.message}</div>;

    // Separate images and videos
    const images = [];
    const videos = [];
    data.forEach((item, idx) => {
        if (item.images && item.images.length > 0) {
            item.images.forEach((img, imgIdx) => {
                images.push({
                    url: img.url,
                    alt: item.heading || `img-${idx + 1}-${imgIdx + 1}`,
                });
            });
        }
        if (item.video) {
            videos.push({
                url: item.video,
                alt: item.heading || `video-${idx + 1}`,
            });
        }
    });

    // Collage logic: every 7th or 11th image is larger
    const getGridClass = (index) => {
        const isBig = index % 7 === 0 || index % 11 === 0;
        return isBig
            ? "col-span-2 row-span-2"
            : " col-span-1 row-span-2";
    };

    return (
        <div className="w-full h-auto p-6">
            {/* Tabs */}
            <div className="flex items-center justify-center mb-6">
                <button
                    className={`md:px-20 px-5 py-2 rounded-t-lg font-semibold focus:outline-none transition ${
                        activeTab === "images"
                            ? "bg-[#D89D55] text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setActiveTab("images")}
                >
                    Images
                </button>
                <button
                    className={`md:px-20 px-5 py-2 rounded-t-lg font-semibold focus:outline-none transition ml-2 ${
                        activeTab === "videos"
                            ? "bg-[#D89D55] text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setActiveTab("videos")}
                >
                    Videos
                </button>
            </div>

            {activeTab === "images" && (
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 auto-rows-[8rem] md:auto-rows-[10rem] lg:auto-rows-[12rem]"
                >
                    {images.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">No images found.</div>
                    )}
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col ${getGridClass(index)}`}
                            data-aos="fade-up"
                        >
                            <img
                                src={img.url || 'https://via.placeholder.com/300'}
                                alt={img.alt}
                                className="object-cover w-full h-full min-h-[100%] min-w-[100%]"
                                style={{ aspectRatio: (index % 7 === 0 || index % 11 === 0) ? "1.3/1" : "1/1" }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {activeTab === "videos" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {videos.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">No videos found.</div>
                    )}
                    {videos.map((vid, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col"
                            data-aos="fade-up"
                        >
                            {getVideoElement(vid.url, index)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Photos;
