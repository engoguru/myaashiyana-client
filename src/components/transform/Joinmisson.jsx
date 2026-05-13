import React, { useState } from 'react';
import Button from '../ui/Button';

const WHATSAPP_NUMBER = '919999999999';

const Joinmisson = () => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: "",
        message: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `Hi! My name is ${form.name || '-'} (${form.phone || '-'}). (${form.email || '-'}).  I want to join your mission! ${form.message ? 'Message: ' + form.message : ''}`;
        const url = `https://wa.me/${9953952005}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        setOpen(false);
        setForm({ name: '', phone: '', message: '', email: "" });
    };

    return (
        <div
            className='bg-[#072724] font-Lora w-full py-10 relative'
            style={{
                backgroundImage: 'url(/assets/image/overlay.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* overlay */}
            <div className="relative grid place-items-center md:py-24 text-white text-center">
                <div className='md:max-w-3xl space-y-3'>
                    <h2 className='uppercase text-[#D89D55]'>Wagging Tails, Happy Hearts</h2>
                    <h1 className='md:text-[3rem] text-[2rem] font-bold'>Join Our Mission for Animal Rescue</h1>
                    <span className='text-[1rem] font-SourceSans'>
                        At our shelter charity, we believe that compassion has the power to change lives. Every animal deserves a loving home, and our shelter charity is committed to making that a reality.
                    </span>
                    <div className='w-full h-full mt-5 grid place-items-center'>
                        <button onClick={() => setOpen(true)}
                            className=" group bg-[#BEFD95]  px-10 py-2 rounded-sm whitespace-nowrap  text-black cursor-pointer gap-2 text-right   transition-all duration-500 flex items-center justify-between overflow-hidden"

                        >
                            Volunteer us
                        </button>
                    </div>
                </div>
            </div>
            <img className='md:w-[20vw] md:h-[40vh] w-28 h-28 absolute bottom-0 right-0 object-cover' src='/assets/image/bgjoinus.png' alt='' />

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
                    <div className="bg-[#072724] rounded-2xl shadow-2xl p-8 md:w-[700px] py-24 w-[90vw] text-white relative">
                        <button
                            className="absolute top-4 right-4 text-2xl text-[#BEFD95] hover:text-[#D89D55]"
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-2 text-[#D89D55]">Join Our Mission</h2>
                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                className="rounded-lg px-4 py-2 bg-[#F9FAF6]/40 text-white focus:outline-none"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                className="rounded-lg px-4 py-2 bg-[#F9FAF6]/40 text-white focus:outline-none"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                className="rounded-lg px-4 py-2 bg-[#F9FAF6]/40 text-white focus:outline-none"
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Why do you want to join? (optional)"
                                value={form.message}
                                onChange={handleChange}
                                className="rounded-lg px-4 py-2 bg-[#F9FAF6]/40 text-white focus:outline-none"
                                rows={3}
                            />
                            <button
                                type="submit"
                                className="bg-[#BEFD95] text-[#072724] font-bold py-2 rounded-lg hover:bg-[#D89D55] transition"
                            >
                                Send via WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Joinmisson;
