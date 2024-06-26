import { useState } from 'react'
import signInImage from '../assets/signInImage.jpg'
import { IoIosEye , IoIosEyeOff} from "react-icons/io";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

import {serverTimestamp, doc, setDoc} from 'firebase/firestore'
import {createUserWithEmailAndPassword , updateProfile} from 'firebase/auth'
import {auth, db} from '../firebase.js'



export default function SignUp() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword]= useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const {email, password, name} = formData
 
  function onChange(e){
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    } ))
  }

  function onSubmit(e){
    e.preventDefault()

    
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed up 
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formCopy = {...formData}
      delete formCopy.password
      formCopy.timestamp = serverTimestamp()
      // Add a new document in collection "users"
      await setDoc(doc(db, "users", user.uid), formCopy);
      toast.success('Registration successful')
      navigate('/')
    })
    .catch((error) => {
      console.log(error.message)
      const message =error.message
      const messageArray = message.split('/');
      toast.error('Registration unsuccessful: (' + messageArray[1])
    });
  }

  return (
    <div>
      <h2 className='text-2xl text-center my-3 font-bold'>Sign Up</h2>
      <div className='flex md:flex-wrap justify-center px-6 py-12 max-w-6xl mx-auto
                     space-x-5'>
        <div className='mb-12 md:mb-6 md:w-[55%] lg:w-[40%]'>
          <img src={signInImage} alt=''
            className='w-full rounded-2xl'/>
        </div>
        <div className='md:w-[55%] lg:w-[40%]'>

          <form onSubmit={onSubmit}>

          <input className='w-full p-2 mb-6 border-2 border-gray-500 rounded-md text-gray-700
                         focus:outline-green-700 transition ease-in-out duration-200' 
                  type='text'
                  id='name'
                  placeholder='Enter your name'
                  value={name}
                  onChange={onChange} />

           <input className='w-full p-2 mb-6 border-2 border-gray-500 rounded-md text-gray-700
                         focus:outline-green-700 transition ease-in-out duration-200' 
                  type='email'
                  id='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={onChange} />


           <div className='relative mb-6'>
            <input className='w-full p-2 border-2 border-gray-500 rounded-md text-gray-700
                          focus:outline-green-700 transition ease-in-out duration-200' 
                    type={showPassword ? "text" : "password"}
                    id='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={onChange} />
            {showPassword ? <IoIosEye className='absolute right-3 top-3 text-xl cursor-pointer'
                                  onClick={() => setShowPassword(!showPassword)}/> 
                          : <IoIosEyeOff className='absolute right-3 top-3 text-xl cursor-pointer' 
                                 onClick={() => setShowPassword(!showPassword)}/> }     
           </div> 

           <div className='flex justify-between whitespace-nowrap text-sm
                  sm:text-lg mb-6'>
            <p>Already have an account?
              <Link to='/sign-in' className='text-green-700 hover:text-green-500 underline
                                   tranasition duration-200 ease-in-out ml-1'>Sign In</Link>
            </p>
            <p>
              <Link to='/forgot-password' className='text-red-700 hover:text-red-500 underline
                                   tranasition duration-200 ease-in-out'>Forgot password?</Link>
            </p>
           </div>
           
           <button type='submit'
              className='w-full bg-green-700 text-white uppercase rounded mb-6 px-10
                py-4 shadow-md hover:bg-green-600 hover:shadow-lg transition duration-150 
                ease-in-out active:bg-green-800 hover:scale-105'>Register
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
