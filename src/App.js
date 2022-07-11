import React,{useState,useEffect} from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from './Login';
import {auth,provider} from './firebase';
import {login,logout} from "./features/userSlice";
import {useSelector,useDispatch} from "react-redux"
import {selectUser} from "./features/userSlice";

function App() {
  const user=useSelector(selectUser)
  const [colorTab,setColorTab]=useState(false);
  console.log(user)
  const dispatch=useDispatch();

  useEffect(()=>{

    auth.onAuthStateChanged((authUser)=>{
      console.log(authUser)
      if(authUser){
        // login
        dispatch(
          login({
            uid:authUser.uid,
            email:authUser.email,
            photo:authUser.photoURL,
            displayName:authUser.displayName
          })
        )
  
      }else{
        // logout 
        dispatch(logout());
      }
    })

  },[])
 

  return (
    <div className="app">
    
    {
      user ? (
    <div className="app__body">
     
     <Sidebar/>  
     <Chat/> 
    </div>
      ):(
        <Login/>
      )
    }
    
        
    </div>
  );
}

export default App;
