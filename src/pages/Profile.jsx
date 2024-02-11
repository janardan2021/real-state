import { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

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
      <div className='mt-10 w-full items-center flex flex-col'>
       
        <div className='w-full md:w-[80%] px-3'>

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

            <div className='flex space-x-4 whitespace-nowrap text-sm sm:text-lg mb-6'>
              <p  onClick={() => {
                         changeDetail && onsubmit()
                         setChangeDetail(!changeDetail)
                        }}
                      className={`px-7 py-3 font-medium text-sm uppercase shadow-md
                      rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                      transition duration-150 ease-in-out w-40
                      ${changeDetail ? 'bg-gray-200 text-red-500' : ' bg-green-500 text-white'}`}>
                    {changeDetail ? 'Apply change' : 'Edit'}
              </p>
              <p onClick={onLogout} className='px-7 py-3 font-medium text-sm uppercase shadow-md
                       rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                       transition duration-150 ease-in-out bg-green-500 text-white w-40'>Sign out</p>
            </div>
          </form>

          
        </div>
      </div>
    </div>
  )
}
