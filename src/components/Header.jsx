import { useLocation, useNavigate } from "react-router"

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location.pathname)
    function pathMatchRoute(route){
        if (route === location.pathname) {
            return true
        }
    }
   
  return (
    <div className='bg-white border-b shadow-md sticky top-0 z-50'>
        <header className='flex justify-between items-center px-3
              max-w-6xl mx-auto'>
            <div className='h-5 text-xl font-bold cursor-pointer'
                 onClick={() => navigate('/')}>
                Real-State
            </div>
            <div>
                <ul className='flex space-x-10 '>
                    <li onClick={() => navigate('/')} className={`py-3 text-sm font-semibold cursor-pointer
                     ${pathMatchRoute("/") ? "text-black border-b-red-500 border-b-[3px]" : 'text-gray-400' }`}>Home</li>
                    <li onClick={() => navigate('/offers')} className={`py-3 text-sm font-semibold cursor-pointer
                     ${pathMatchRoute("/offers") ? "text-black border-b-red-500 border-b-[3px]" : 'text-gray-400'}`}>Offers</li>
                    <li onClick={() => navigate('/sign-in')} className={`py-3 text-sm font-semibold cursor-pointer
                     ${pathMatchRoute("/sign-in") ? "text-black border-b-red-500 border-b-[3px]" : 'text-gray-400'}`}>SignIn</li>
                </ul>
            </div>
        </header>
    </div>
  )
}
