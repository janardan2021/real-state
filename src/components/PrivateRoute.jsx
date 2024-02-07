import { Outlet, Navigate } from "react-router"
import useAuthStatus from "../hooks/useAuthStatus"
import Loader from "./Loader"

export default function PrivateRoute() {
    const {loggedIn, checkingStatus} = useAuthStatus()
    if (checkingStatus) return (<Loader />)
    return loggedIn ? <Outlet /> : <Navigate to='/sign-in'/>
  
}
