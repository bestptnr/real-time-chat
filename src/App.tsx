import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './screens/Landing';
import Register from './screens/Register';
import Home from './screens/Home';
import { ToastContainer } from 'react-toastify';
import Login from './screens/Login';
import ProtectedLogin  from './components/Protected';


import 'react-toastify/dist/ReactToastify.css';
import Chat from './screens/Chat';


function App() {



  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route  element={<ProtectedLogin />}>
        <Route
              path="/chat/:id"
              element={<Chat />} />

            <Route
              path="/home"
              element={<Home />} />
        </Route>
    

      </Routes>
    </Router>
  );
}

export default App;
