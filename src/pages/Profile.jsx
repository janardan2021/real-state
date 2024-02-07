import { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';

import { auth, db } from "../firebase.js";
import {getAuth, updateProfile} from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore';

export default function Profile() {
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false)

  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData
 
  function onLogout () {
    auth.signOut()
    navigate('/')
  }

  function onChange(e) {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.id]: e.target.value
    }))
  }

  function onsubmit(e){
    if(auth.currentUser.displayName !== name) {

      updateProfile(auth.currentUser, {
        displayName: name
      })
      .then(() => {
        const docRef = doc(db, "users", auth.currentUser.uid)
        updateDoc(docRef, {
          name: name
        })
      })
      .then(() => {
        toast.success('Profile successfully updated')
      })
      .catch ((error) => {
        toast.error('Error updating the profile')
      })
    }
  }

  return (
    <div>
      <div className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            <input type='text'
                   id='name'
                   value={name}
                   disabled= {!changeDetail}
                   onChange={onChange}
                   className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white 
                     border border-gray-300 rounded transition  ease-in-out
                     ${changeDetail && 'bg-green-100 focus:outline outline-2 outline-green-500'}`}/>

            <input type='email'
                   id='email'
                   value={email}
                   disabled = {!changeDetail}
                   onChange={onChange}
                   className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white 
                     border border-gray-300 rounded transition  ease-in-out 
                     ${changeDetail && 'bg-green-100 focus:outline outline-2 outline-green-500'}`}/>

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
              <p className='flex items-center'>
                Do you want to change your name?
                <span onClick={() => {
                         changeDetail && onsubmit()
                         setChangeDetail(!changeDetail)
                        }}
                      className='text-red-600 hover:text-red-700 transition ease-in-out
                        duration-200 ml-1 cursor-pointer'>
                    {changeDetail ? 'Apply change' : 'Edit'}
                </span>
              </p>
              <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition ease-in-out
                        duration-200 cursor-pointer'>Sign out</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
