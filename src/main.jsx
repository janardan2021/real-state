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

import Home from "./pages/Home.jsx";
import Offers from "./pages/Offers.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="offers" element={<Offers />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
