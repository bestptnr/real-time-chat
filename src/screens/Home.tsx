import React, { useState, useEffect } from 'react'
import NavLogin from '../components/NavLogin';
import { v4 as uuidv4 } from 'uuid';
import { getDocs, addDoc, collection, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Input, Button } from "@material-tailwind/react";
import { db } from '../firebase';
import { toast } from 'react-toastify';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

type Room = {
    id: string;
    roomname: string;
    createBy: string;
};

const Home = () => {

    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState<Room[]>([]);
    const [uid, setUID] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUID(currentUser!.uid);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const fetchRooms = async () => {
            const querySnap = await getDocs(collection(db, "rooms"));
            const allrooms = querySnap.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                id: doc.id,
                ...doc.data(),
            } as Room));
            setRooms(allrooms);
        };

        fetchRooms();
    }, []);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoom(event.target.value);
    };

    const createRoom = async () => {
        if (room) {
            const querySnap = collection(db, "rooms");
            await toast.promise(
                addDoc(querySnap, {
                    id:uuidv4(),
                    roomname: room,
                    createBy: uid,
                })
                    .then(() => {
                        setTimeout(() => {
                            try {
                                window.location.reload();
                            } catch (error) {
                                console.log(error);
                            }
                        }, 2000);
                    })
                    .catch((error) => {
                        console.log(error);
                    }),
                {
                    pending: 'กำลังดำเนินการ',
                    success: 'สร้างห้องเสร็จสิ้น',
                    error: 'เกิดข้อผิดพลาด',
                },
                {
                    autoClose: 2000,
                }
            );
        }
    };

    return (
        <>
            <NavLogin />
            <div className="flex justify-center mt-20">
                <div className="relative flex w-full max-w-[24rem]  ">
                    <Input
                        type="text"
                        label="Create Room"
                        value={room}
                        onChange={onChange}
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                    <Button
                        size="sm"
                        color={room ? "blue" : "blue-gray"}
                        disabled={!room}
                        className="!absolute right-1 top-1 rounded"
                        onClick={createRoom}
                    >
                        Create
                    </Button>
                </div>
            </div>
            <div className="mt-20 flex flex-wrap justify-evenly container mx-auto">
                {rooms.map((room) => (
                    <div
                        key={room.id}
                        className="bg-white p-4 border rounded-md shadow-md h-32 mb-10 h-50 w-full sm:w-1/3 md:w-1/3 xl:w-1/6 m-5"
                    >
                        {room.roomname} <br /><br />
                        <Link to={"/chat/"+room.id}>
                        <Button variant="outlined">Join Room</Button>
                        </Link>
                    
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
