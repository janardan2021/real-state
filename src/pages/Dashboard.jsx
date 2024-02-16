import { NavLink, Outlet } from 'react-router-dom'
import { useLocation, useNavigate } from "react-router"
import { IoHome } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate()
    const location = useLocation()
    function pathMatchRoute(route){
        if (route === location.pathname) {
            return true
        }
    }
    
  return (
    <div className='flex flex-col lg:flex-row lg:space-x-4'>
        <div className='flex w-full mt-10 flex-row  lg:flex-col lg:items-center lg:w-2/6 lg:h-96'>
            <div className='w-2/6 lg:w-full pl-20 lg:pl-40  lg:h-2/6 text-lg md:text-xl'>
              <button onClick={() => navigate('/profile')}  className={`font-semibold cursor-pointer border-b-[3px]
                       ${pathMatchRoute("/profile") ? "text-black border-b-green-700 " : 'border-b-gray-300'}
                       hover:scale-x-105 transition ease-in-out`}
                       >Profile</button> 
            </div>
            <div className='w-2/6 lg:w-full pl-20 lg:pl-40  lg:h-2/6 text-lg md:text-xl'>
              <button onClick={() => navigate('/profile/listings')}  className={`font-semibold cursor-pointer border-b-[3px]
                       ${pathMatchRoute("/profile/listings") ? "text-black border-b-green-700 " : 'border-b-gray-300'}
                       hover:scale-x-105 transition ease-in-out`}
                       >Listings</button>
            </div>
            <div className='w-2/6 lg:w-full pl-20 lg:pl-40  lg:h-2/6 text-lg md:text-xl'>
            <button onClick={() => navigate('/profile/create-listing')} className={`flex font-semibold cursor-pointer border-b-[3px]
                       ${pathMatchRoute("/profile/create-listing") ? "text-black border-b-green-700 " : 'border-b-gray-300'}
                       hover:scale-x-105 transition ease-in-out`}>
              
              <div >New listing</div>
              <div>
              <IoHome className='text-3xl ml-2 bg-white text-red-500 '/>
              </div>
           </button>
            </div>
        </div>

       <div className='items-center lg:w-4/6 '>
          <Outlet />
       </div>
    </div>
  )
}

export default Dashboard
