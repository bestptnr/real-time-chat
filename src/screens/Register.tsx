import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom";
import Nav from '../components/Nav';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.warn('รหัสผ่านไม่ตรงกัน', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (password.length < 6) {
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
                createUserWithEmailAndPassword(auth, email, password)
                    .then((_userCredential) => {
                        setTimeout(() => {
                            navigate("/");
                        }, 2000);
                    }).catch((error) => {
                        console.log(error)
                    }),
                {
                    pending: 'กำลังดำเนินการ',
                    success: 'สมัครสมาชิกเสร็จสิ้น',
                    error: 'เกิดข้อผิดพลาด'
                }
            )




        }

    };

    return (
        <>
            <Nav></Nav>
            <div className="min-h-screen flex items-center justify-center ">

                <div className="max-w-md w-full mx-4 bg-white p-8 rounded shadow">
                    <h1 className="text-2xl font-bold mb-4">Register</h1>
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
                        <div className="mb-4">
                            <label htmlFor="confirm-password" className="block mb-1 text-left">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-4">Already have an account?
                        <Link to="/login">
                            <a className="text-blue-500">Login</a>
                        </Link>

                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
