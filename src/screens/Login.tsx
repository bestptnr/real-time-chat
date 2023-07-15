import React, { useState } from 'react';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";
import Nav from '../components/Nav';
import Cookies from 'universal-cookie';
import { faker } from '@faker-js/faker';

const cookies = new Cookies();

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password.length < 6) {
            toast.warn('รหัสต้องมากกว่า 6 ตัวอักษรขึ้นไป', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            await toast.promise(
                signInWithEmailAndPassword(auth, email, password)
                    .then((_userCredential) => {
                        updateProfile(_userCredential.user, {
                            displayName: faker.internet.userName()
                        })

                        try {
                            cookies.set("auth", _userCredential.user.refreshToken)
                            navigate("/home");
                        } catch (error) {
                            console.log(error)
                        }


                    }).catch((error) => {
                        console.log(error)
                    }),
                {
                    pending: 'กำลังดำเนินการ',
                    success: 'เข้าสู่ระบบสำเร็จ',
                    error: 'เกิดข้อผิดพลาด',

                }, {
                autoClose: 2000
            }
            )




        }

    };

    return (
        <>
            <Nav></Nav>
            <div className="min-h-screen flex items-center justify-center ">

                <div className="max-w-md w-full mx-4 bg-white p-8 rounded shadow">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1 text-left">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-1 text-left">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center mt-4">Yon don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
                </div>
            </div>
        </>
    );
};

export default Login;
