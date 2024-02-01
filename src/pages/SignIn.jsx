import { useState } from 'react'
import signInImage from '../assets/signInImage.jpg'
import { IoIosEye , IoIosEyeOff} from "react-icons/io";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';


export default function SignIn() {
  const [showPassword, setShowPassword]= useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData
 
  function onChange(e){
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    } ))
  }

  return (
    <div>
      <h2 className='text-2xl text-center my-3 font-bold'>Sign In</h2>
      <div className='flex md:flex-wrap justify-center px-6 py-12 max-w-6xl mx-auto
                     space-x-5'>
        <div className='mb-12 md:mb-6 w-2/5 '>
          <img src={signInImage} alt=''
            className='w-full rounded-2xl'/>
        </div>
        <div className='w-2/5'>
          <form >

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
            <p>Don't have an account?
              <Link to='/sign-up' className='text-green-700 hover:text-green-500 underline
                                   tranasition duration-200 ease-in-out ml-1'>Register</Link>
            </p>
            <p>
              <Link to='/forgot-password' className='text-red-700 hover:text-red-500 underline
                                   tranasition duration-200 ease-in-out'>Forgot password?</Link>
            </p>
           </div>
           
           <button type='submit'
              className='w-full bg-green-700 text-white uppercase rounded mb-6 px-10
                py-4 shadow-md hover:bg-green-600 hover:shadow-lg transition duration-150 
                ease-in-out active:bg-green-800 hover:scale-105'>Sign In
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
