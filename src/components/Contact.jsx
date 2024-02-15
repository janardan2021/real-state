import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"


export default function Contact({userRef, listing}) {
    const [owner, setOwner] = useState(null)
    const [message, setMessage] = useState('')


    useEffect(() => {
        async function getOwnerInfo(){
          const docRef = doc(db, 'users', userRef)
          const docSnap = await getDoc(docRef)
          if(docSnap.exists()){
            setOwner(docSnap.data())
          }else {
            toast.error('Owner does not exist!')
          }
        }
        getOwnerInfo()
    },[userRef])
  return (
    <div className="">
        {owner && (
            <div className="flex flex-col w-full my-4 items-center">
                <p className="my-2 text-lg">Contact {owner.name} for {listing.name} living.</p>
                <textarea name="message" id="message" rows='3' value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="border-2 border-green-700 w-4/5 px-2 py-1"
                />
                <a href={`mailto:${owner.email}
                          ?Subject=${listing.name}
                          &body=${message}`}
                          className="flex w-full mx-auto">
                    <button className="my-4 mx-auto px-5 py-3 text-white font-medium bg-green-500 
                           text-sm uppercase shadow-md hover:bg-green-700 
                           hover:shadow-lg rounded w-4/5 transition ease-in-out">
                      Send message
                    </button>
                </a>
            </div>
            
        )} 
    </div>
  )
}

