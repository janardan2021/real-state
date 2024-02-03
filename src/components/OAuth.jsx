import { FcGoogle } from "react-icons/fc";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router";

import { auth , db} from "../firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {serverTimestamp, doc, setDoc, getDoc} from 'firebase/firestore'


const provider = new GoogleAuthProvider();

export default function OAuth() {
  const navigate = useNavigate()
 function onClickGoogle(){
  signInWithPopup(auth, provider)
  .then(async (result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // Create a reference to the user doc
    const docRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(docRef)
    if(!userDoc.exists()){
      // Add a new document in collection "users"
      await setDoc(docRef, {email: user.email,
                            name: user.displayName,
                            timestamp: serverTimestamp()});
      toast.success('Registration successful')
      }
    navigate('/')

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    toast.error('Authorization not successful')
  });
 }

  return (
    <button type="button" className="flex items-center justify-center w-full rounded bg-blue-700 text-white
    px-7 py-3 uppercase text-sm font-medium hover:bg-blue-800 active:bg-blue-900
    shadow-md active:shadow-lg transition duration-150 ease-in-out"
    onClick={onClickGoogle}>
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
      Continue with Google
    </button>
  )
}
