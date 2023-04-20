import React from 'react'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('password', data.password);
        console.log(formData)
        axios({
            method: "POST",
            url: `${import.meta.env.VITE_REACT_APP_BACKEND}/api/v1/auth/signUp`,
            headers: {
                "Content-Type": "application/json",
            },
            data: formData,
        })
            .then((res) => {
                console.log("New User created");
                localStorage.setItem("token", res.data.token);
               navigate("/dashboard")
            })
            .catch((err) => {
                alert(err);
            });
    }
    return (
        <>
            <div className='upCon' >

                <div className='headup'> SignUp</div>
                <form className='form' onSubmit={handleSubmit(onSubmit)} >

                    <input type="text" placeholder='Enter Name' id="field1"  {...register('username')} required />

                    <input type="password" id="field9" placeholder='Password' {...register('password')} required />

                    <button className='btnup' type="submit">Sign up</button>
                    <p>Already Have an account? <a href="https://note-fylr88c89-yashp45.vercel.app/login">Login</a></p>
                </form>


            </div>
        </>
    )
}

export default SigninPage
