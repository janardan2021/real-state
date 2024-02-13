import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase";

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { IoHome } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

export default function Header() {
    const [pageState, setPageState] = useState('Sign In')
    
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location.pathname)

    const auth = getAuth()
    function pathMatchRoute(route){
        if (route === location.pathname) {
            return true
        }
    }

    function logout() {
        auth.signOut()
        navigate('/sign-in')
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setPageState('Profile')
            } else {
                setPageState('Sign In')
            }
        })
    } ,[auth, onAuthStateChanged])
    // console.log(auth.currentUser)
   
  return (
    <div className='bg-gradient-to-b from-gray-500
    to-black h-24 pt-5 border-b shadow-md sticky top-0 z-50 '>
        <header className='flex justify-between items-center px-3
              max-w-6xl mx-auto'>
            <div className='h-10 flex items-end  cursor-pointer'
                 onClick={() => navigate('/')}>
                <IoHome className=" mr-2 text-4xl text-red-600 "/>
                <div className="text-lg md:text-2xl font-bold text-green-500">Real-State</div>
            </div>
            <div>
                <ul className='flex space-x-10 '>
                    <li onClick={() => navigate('/')} className={`py-3 text-sm font-semibold cursor-pointer hover:scale-x-110 transition duration-150
                     ${pathMatchRoute("/") ? "text-white border-b-green-500 border-b-[3px]" : 'text-gray-300' }`}>Home</li>
                    <li onClick={() => navigate('/offers')} className={`py-3 text-sm font-semibold cursor-pointer hover:scale-x-110 transition duration-150
                     ${pathMatchRoute("/offers") ? "text-white border-b-green-500 border-b-[3px]" : 'text-gray-300'}`}>Offers</li>
                    <li onClick={() => navigate('/profile')} className={`py-3 text-sm font-semibold cursor-pointer hover:scale-x-110 transition duration-150
                     ${pathMatchRoute("/sign-in") || pathMatchRoute("/profile") ? "text-white border-b-green-500 border-b-[3px]" : 'text-gray-300'}`}>
                        {pageState}
                    </li>
                    {auth.currentUser && 
                    <li onClick={logout} className='py-3 text-sm font-semibold cursor-pointer text-white uppercase
                                                    flex hover:scale-x-110 transition duration-150'>
                      <p>Logout</p>
                      <MdLogout className="text-xl ml-1 text-green-600 "/>
                    </li>}
                </ul>
            </div>
        </header>
    </div>
  )
}
