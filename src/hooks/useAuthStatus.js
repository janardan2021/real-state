import { getAuth, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import { useEffect, useState } from "react"

export default function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if(user) {
            setLoggedIn(true)
            
        }
        setCheckingStatus(false)
    })

    // useEffect(()=> {
    //     const auth = getAuth()
    //     onAuthStateChanged(auth, (user) => {
    //         if(user) {
    //             setLoggedIn(true)
               
    //         }
    //         setCheckingStatus(false)
    //     })
    // }, [])
  return {loggedIn, checkingStatus}
}
