import React from 'react'
import "./Login.css";
import {auth,provider}  from './firebase'

const Login = () => {
    const signIn=()=>{
        auth.signInWithPopup(provider).catch((e)=>alert(e.message))
    }
    return (
        <div className="login">
          <img src="https://tse1.mm.bing.net/th?id=OIP.HPkdUIo77iNLdW1kuny35wHaES&pid=Api&P=0&w=268&h=156" alt="" />
           <button onClick={()=>signIn()} className="signbtn">SIGNIN</button>  
        </div>
    )
}

export default Login
