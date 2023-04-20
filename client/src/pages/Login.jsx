import React  from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Login2 = () => {

const { register, handleSubmit } = useForm()
const navigate = useNavigate();




const onSubmit =(data) => {

const formData = new FormData();
formData.append('username', data.username);
formData.append('password', data.password);
axios({
    method: "POST",
    url: `${import.meta.env.VITE_REACT_APP_BACKEND}/api/v1/auth/login`,
    headers: {
        "Content-Type": "application/json",
    },
    data: formData,
})
    .then((res) => {
        console.log("Signed in");
        localStorage.setItem("token", res.data.token);
       navigate("/dashboard")
    })
    .catch((err) => {
        alert(err);
    });
}

  return (
    <>
  <div className='upCon'>
         <div className='headup'> Login</div>
         <form className='form' onSubmit={handleSubmit(onSubmit)}>
         <input type="text" id="field2" placeholder='Enter username'  {...register('username')} required/>
         <input type="password" id="field3" placeholder='Password' {...register('password')} required/>
         <button className='btnup' type="submit">Login </button>
         <p>New here? Create a new account <a href="https://note-fylr88c89-yashp45.vercel.app/">Signup</a></p>     
      
    </form>

  
    </div>
    </>
  )
  
}

export default Login2
