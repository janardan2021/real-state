import {Outlet} from 'react-router-dom'
import Header from './components/Header'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {

  return (
    <>
    <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition: Bounce 
      />
    <Header />
    <Outlet />
    </>
   
  )
}

export default App
