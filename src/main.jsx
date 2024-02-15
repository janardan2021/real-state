import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,

} from "react-router-dom";

import PrivateRoute from './components/PrivateRoute.jsx';
import Home from "./pages/Home.jsx";
import Offers from "./pages/Offers.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import CreateListing from './pages/CreateListing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Listings from './pages/Listings.jsx';
import EditListing from './pages/EditListing.jsx';
import Listing from './pages/Listing.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path='home' element={<Home />} />
      <Route path='' element={<PrivateRoute />}>
            <Route path='profile' element={<Dashboard />} > 
               <Route index  element={<Profile />} />
               <Route path='listings' element={<Listings />} />
               <Route path="create-listing" element={<CreateListing />} />
               <Route path='edit-listing/:id' element={<EditListing />}/>
             </Route>
         {/* <Route path='profile' element={<Profile />} /> */}
         
      </Route>
      <Route path='/category/:type/:id' element={<Listing />}/>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="offers" element={<Offers />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path='*' element={<Home />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
