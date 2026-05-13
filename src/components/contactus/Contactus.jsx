import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from '../ui/Header';
import { IoCall } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEmail, fetchAddress, fetchPhonenumber } from '../reasctquery/api';

const Contactus = () => {
    const emailsQuery = useQuery({ queryKey: ['emails'], queryFn: fetchEmail });
    const addressesQuery = useQuery({ queryKey: ['addresses'], queryFn: fetchAddress });
    const phonesQuery = useQuery({ queryKey: ['phones'], queryFn: fetchPhonenumber });

    const mutation = useMutation({
        mutationFn: async (values) => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/contactQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            if (!response.ok) throw new Error('Failed to send message');
            return response.json();
        }
    });

    if (emailsQuery.isLoading || addressesQuery.isLoading || phonesQuery.isLoading) {
        return <div className="text-center py-10 text-lg">Loading contact details...</div>;
    }
    if (emailsQuery.isError || addressesQuery.isError || phonesQuery.isError) {
        return <div className="text-center py-10 text-red-600">Failed to load contact details. Please try again later.</div>;
    }

    const emailTitles = emailsQuery.data?.map(e => e.title) || [];
    const addressTitles = addressesQuery.data?.map(a => a.title) || [];
    const phoneTitles = phonesQuery.data?.map(p => p.title) || [];

    const contactDetails = [
        {
            icon: <IoCall className='text-[#95CF7B] text-3xl' />,
            title: phoneTitles.length > 0 ? phoneTitles.join(', ') : '(+91) 12345-67890',
        },
        {
            icon: <AiOutlineMessage className='text-[#95CF7B] text-3xl' />,
            title: emailTitles.length > 0 ? emailTitles.join(', ') : 'support@example.com',
        },
        {
            icon: <FaWhatsapp className='text-[#95CF7B] text-3xl' />,
            title: 'Whatsapp Support',
        },
        {
            icon: <MdAccessTime className='text-[#95CF7B] text-3xl' />,
            title: addressTitles.length > 0 ? addressTitles.join(', ') : 'Mon - Fri 9:00 AM - 5:00 PM',
        },
    ];

    const initialValues = {
        name: '',
        email: '',
        message: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        message: Yup.string().required('Message is required')
    });

    const handleSubmit = (values, { resetForm }) => {
        mutation.mutate(values, {
            onSuccess: () => {
                alert('Message sent successfully!');
                resetForm();
            },
            onError: () => {
                alert('Failed to send message. Please try again.');
            }
        });
    };

    return (
        <div className='relative overflow-hidden'>
            <Header
                title="Contact Us"
                subheading="Join Our Mission for Animal Rescue"
                description="Every animal deserves a loving home, and we are committed to making that a reality."
            />

            <div className='-mt-32 px-6 md:px-2 relative z-10 mb-5 '>
                <div className='bg-white grid grid-cols-1 md:grid-cols-2 w-full h-full'>
                    <div>
                        <img
                            src='/assets/image/contactus.webp'
                            alt='Animal shelter'
                            className='md:w-[60vw] w-full h-full md:h-[70vh] object-cover'
                        />
                    </div>
                <div className='px-8 py-2 flex flex-col justify-start items-start font-Lora mx-5 my-4 border rounded shadoww-lg'>
                        {/* <div className="border"> */}
                        <h1 className='text-xl font-semibold text-[#D89D55] mb-2'>Write Us</h1>
                        <p className='text-[#404E4D] text-4xl mb-6'>We are here to assist you</p>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            {({ isSubmitting }) => (
                                <Form className='w-full flex flex-col gap-3'>
                                    <label htmlFor='name' className='text-[#072724] font-semibold'>Your name</label>
                                    <Field type='text' name='name' className='border rounded-xl py-3 px-2 border-[#072724]' />
                                    <ErrorMessage name='name' component='div' className='text-red-500 text-sm' />

                                    <label htmlFor='email' className='text-[#072724] font-semibold'>Your email</label>
                                    <Field type='email' name='email' className='border rounded-xl py-3 px-2 border-[#072724]' />
                                    <ErrorMessage name='email' component='div' className='text-red-500 text-sm' />

                                    <label htmlFor='message' className='text-[#072724] font-semibold'>Your message</label>
                                    <Field as='textarea' name='message' rows={5} className='border rounded-xl py-2 px-2 border-[#072724]' />
                                    <ErrorMessage name='message' component='div' className='text-red-500 text-sm' />

                                    <button
                                        type='submit'
                                        disabled={isSubmitting || mutation.isLoading}
                                        className='bg-[#072724] text-white px-6 py-2 mt-2 rounded hover:bg-[#0b3a33] transition'
                                    >
                                        {mutation.isLoading ? 'Submitting...' : 'Submit'}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        {/* </div> */}
                    </div>
                </div>
            </div>

            <div className='bg-[#F1E7DB] w-full flex items-center justify-center px-4 md:px-10 py-10 md:py-20 mb-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-20 w-full max-w-6xl'>

                    {/*  Phone Numbers */}
                    <div className='flex items-center gap-5'>
                        <div className='bg-[#0B4B43] p-3 rounded-full shrink-0'>
                            {contactDetails[0].icon}
                        </div>
                        <div className='flex flex-col text-[#404E4D] min-w-0'>
                            {contactDetails[0].title.split(',').map((num, i) => (
                                <a key={i} href={`tel:${num.trim()}`} className="hover:underline text-sm font-semibold break-all">
                                    {num.trim()}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/*  Emails */}
                    <div className='flex items-center gap-5'>
                        <div className='bg-[#0B4B43] p-3 rounded-full shrink-0'>
                            {contactDetails[1].icon}
                        </div>
                        <div className='flex flex-col text-[#404E4D] min-w-0'>
                            {contactDetails[1].title.split(',').map((email, i) => (
                                <a key={i} href={`mailto:${email.trim()}`} className="hover:underline text-sm font-semibold break-all">
                                    {email.trim()}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/*  WhatsApp */}
                    <div className='flex items-center gap-5'>
                        <div className='bg-[#0B4B43] p-3 rounded-full shrink-0'>
                            {contactDetails[2].icon}
                        </div>
                        <a href={`https://wa.me/9953952005`} target="_blank" rel="noopener noreferrer"
                            className='text-[#404E4D] text-sm hover:underline font-semibold'>
                            {contactDetails[2].title}
                        </a>
                    </div>

                    {/*  Address */}
                    <div className='flex items-center gap-5'>
                        <div className='bg-[#0B4B43] p-3 rounded-full shrink-0'>
                            {contactDetails[3].icon}
                        </div>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactDetails[3].title)}`}
                            target="_blank" rel="noopener noreferrer"
                            className='text-[#404E4D] text-sm font-semibold hover:underline leading-relaxed'>
                            {contactDetails[3].title}
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contactus;
