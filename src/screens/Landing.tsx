
import React, { useState, useRef } from 'react';
import '../App.css';
import Nav from '../components/Nav';
import Lottie from 'lottie-react';
import chat from '../assets/lottie/chat.json';
import { Link } from 'react-router-dom';
function Landing() {
    const animationRef = useRef(null);

    return (
        <>
            <Nav />

            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-center mb-4 text-2xl font-bold'>Let's build a good community together.</h1>
                <p className='mb-4 text-center'>Welcome to our Web Chat Experience! Connect, Communicate, and Collaborate with Ease!</p>
                <Link to='/login'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        Let's Get Started
                    </button>
                </Link>
                <div className='flex justify-center mb-4 w-full'>
                    <Lottie lottieRef={animationRef} animationData={chat} className='w-full xl:w-1/3' />
                </div>


            </div>
        </>
    );
}

export default Landing;