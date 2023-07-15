import  { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input, Button, } from '@material-tailwind/react';
import {  addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router-dom';



const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { id } = useParams<{ id: string }>();
  const messageRef = collection(db, "messages");


  const sendMessage = async () => {
    if (message) {
      await addDoc(messageRef, {
        text: message,
        createAt: serverTimestamp(),
        user: auth.currentUser?.displayName || faker.internet.userName(),
        roomid: id!
      });
      setMessage('');
    }
  };

  useEffect(() => {
    const getMsg = query(
      messageRef,
      where("roomid", "==", id),
      orderBy("createAt",'asc')
    );

    const unsubscribe = onSnapshot(getMsg, (snapshot) => {
      let msg: any = [];
      snapshot.forEach((doc) => {
        msg.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msg);
     
    });


    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-4">
        {messages.map((msg: any) => (
          <div key={uuidv4()} className="mb-2">
            <b className="font-bold">{msg.user || faker.internet.userName()} : </b> {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <Input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button color="blue" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
