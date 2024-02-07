import { getAuth, onAuthStateChanged } from "firebase/auth"

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { IoHome } from "react-icons/io5";

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

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setPageState('Profile')
            } else {
                setPageState('Sign In')
            }
        })
    } ,[auth, onAuthStateChanged])
   
  return (
    <div className='bg-gradient-to-r from-white via-green-200
    to-white h-20 pt-5 border-b shadow-md sticky top-0 z-50 '>
        <header className='flex justify-between items-center px-3
              max-w-6xl mx-auto'>
            <div className='h-10 flex items-end  cursor-pointer'
                 onClick={() => navigate('/')}>
                <IoHome className=" mr-2 text-4xl text-red-600 "/>
                <div className="text-2xl font-bold text-green-700 ">Real-State</div>
            </div>
            <div>
                <ul className='flex space-x-10 '>
                    <li onClick={() => navigate('/')} className={`py-3 text-sm font-semibold cursor-pointer
                     ${pathMatchRoute("/") ? "text-black border-b-green-700 border-b-[3px]" : 'text-gray-400' }`}>Home</li>
                    <li onClick={() => navigate('/offers')} className={`py-3 text-sm font-semibold cursor-pointer
                     ${pathMatchRoute("/offers") ? "text-black border-b-green-700 border-b-[3px]" : 'text-gray-400'}`}>Offers</li>
                    <li onClick={() => navigate('/profile')} className={`py-3 text-sm font-semibold cursor-pointer
                     ${pathMatchRoute("/sign-in") || pathMatchRoute("/profile") ? "text-black border-b-green-700 border-b-[3px]" : 'text-gray-400'}`}>
                        {pageState}
                    </li>
                </ul>
            </div>
        </header>
    </div>
  )
}
