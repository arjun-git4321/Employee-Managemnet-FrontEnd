import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../context/authContext';



const Login=()=>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(null);
    const {login}=useAuth()
    const navigate=useNavigate();


    const handleSubmit=async (e)=>{
        // console.log(email);
        // console.log(password);
        console.log("Submitting login with:", email, password);
        e.preventDefault();
        try{
            const response=await axios.post('http://localhost:3000/api/v1/auth/login',{email,password},{ withCredentials: true } 
            );
            console.log(response);
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token",response.data.token)
                if(response.data.user.role==="Admin"){
                    navigate('/admin-dashboard')
                }
                else{
                    navigate('/employee-dashboard')
                }
            }

        }
        catch(error){
            if(error.response && !error.response.data.success){
                setError(error.response.data.error)
            }
            else
            {
                setError("Error in server");
            }

        }
    }

    return(
       <div className='flex flex-col items-center h-screen justify-center
       bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6'>
        <h2 className='font-sevillana text-3xl text-white'>Employee Management System</h2>
        <div className='border shadow p-6 w-80 bg-white'>
        <form onSubmit={handleSubmit}>
            <h2 className='text-2xl font-bold mb-4'>Login</h2>
            {error && <p className='text-red-500'>{error}</p>}
            <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-700'>Email</label>
                <input 
                id='email'
                className='w-full px-3 py-2 border' 
                placeholder='Email for login'
                onChange={(e)=>setEmail(e.target.value)}
                required
                />

            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='block text-gray-700'>Password</label>
                <input type='password'
                id='password'
                className='w-full px-3 py-2 border' 
                placeholder='******'
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
            </div>

            <div className='mb-4 flex items-center justify-between'>
                <label htmlFor='Rememberme' className='inline-flex items-center'>
                    <input type='checkbox' className='form-checkbox'/>
                    <span className='ml-2 text-gray-700'>Remember Me</span>
                </label>
                <a href='#' className='text-team-600'>Forgot Password</a>
            </div>
            <div className='mb-2'>
            <button type='submit' className='w-full bg-teal-600 text-white py-2'>Login</button>

            </div>

        </form>
        </div>
       </div>
    )
}

export default Login;