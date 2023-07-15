import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';
import Login from "../screens/Login";


const cookies = new Cookies();
const ProtectedLogin = ({  }) => {

    const token = cookies.get('auth');

    console.log(token)
    let user:any = {}

    if(token){
        user = {islogged:true}
        

    }else{
        user = {islogged:false}

    }
    
    console.log(user)
    return (user.islogged ? <Outlet/> :<Navigate to='/'/>)

}
export const ProtectedRoute = () =>{
    const token = cookies.get('auth');

    console.log(token)
    let user:any = {}



    if(token){
        user = {islogged:true}
        

    }else{
        user = {islogged:false}

    }
    
  
    return (user.islogged ? <Navigate to='/home'/> :<Login/>)
}
export default ProtectedLogin