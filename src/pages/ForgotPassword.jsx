import { useState } from 'react'
import signInImage from '../assets/signInImage.jpg'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

import {auth} from '../firebase.js'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';


export default function ForgotPassword() {

  const [email, setEmail] = useState('')
 
  function onChange(e){
    setEmail(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault()
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Email sent to reset password')
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const message =error.message
        console.log(message)
        const messageArray = message.split('/');
        toast.error('Reset failed: (' + messageArray[1])
      // ..
      });
  }

  return (
    <div>
      <h2 className='text-2xl text-center my-3 font-bold'>Forgot password</h2>
      <div className='flex md:flex-wrap justify-center px-6 py-12 max-w-6xl mx-auto
                     space-x-5'>
        <div className='mb-12 md:mb-6 md:w-[55%] lg:w-[40%] '>
          <img src={signInImage} alt=''
            className='w-full rounded-2xl'/>
        </div>
        <div className='md:w-[55%] lg:w-[40%]'>
          <form onSubmit={onSubmit}>

           <input className='w-full p-2 mb-6 border-2 border-gray-500 rounded-md text-gray-700
                         focus:outline-green-700 transition ease-in-out duration-200' 
                  type='email'
                  id='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={onChange} />


           

           <div className='flex justify-between whitespace-nowrap text-sm
                  sm:text-lg mb-6'>
            <p>Don't have an account?
              <Link to='/sign-up' className='text-green-700 hover:text-green-500 underline
                                   tranasition duration-200 ease-in-out ml-1'>Register</Link>
            </p>
            <p>
              <Link to='/sign-in' className='text-red-700 hover:text-red-500 underline
                                   tranasition duration-200 ease-in-out'>Sign In</Link>
            </p>
           </div>
           
           <button type='submit'
              className='w-full bg-green-700 text-white uppercase rounded mb-6 px-10
                py-4 shadow-md hover:bg-green-600 hover:shadow-lg transition duration-150 
                ease-in-out active:bg-green-800 hover:scale-105'>Reset Password
           </button>

           <div className='my-4 flex items-center  before:flex-1 before:border-t before:border-gray-500
                         after:flex-1 after:border-t after:border-gray-500'>
             <p className='text-center font-semibold mx-4'>OR</p>
           </div>
            
           <OAuth />

          </form>
        </div>
      </div>
    </div>
  )
}
