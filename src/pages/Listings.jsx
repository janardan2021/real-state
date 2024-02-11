import { auth, db } from "../firebase.js";
import {getAuth, updateProfile} from 'firebase/auth'
import { collection, doc, updateDoc, where, query, getDocs, orderBy } from 'firebase/firestore';
import { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import ListingItem from "../components/ListingItem.jsx";

export default function Listings() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   async function fetchUserListings() {
     const listingRef = collection(db, 'listings')
    //  const q = query(collection(db, "cities"), where("capital", "==", true));
     const q = query(listingRef, where("userRef", "==", auth.currentUser.uid),
                    orderBy('timestamp', 'desc'))
     const querySnapshot = await getDocs(q);
     let listings = []
     querySnapshot.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data()
      })
    });
    setListings(listings)
    setLoading(false)
   }

  fetchUserListings()

  }, [auth.currentUser.uid])

if(loading) return(<Loader />)
return (
    <div className='mt-10 w-full items-center flex flex-col'>

     {listings !== null && listings.length > 0 && (
          <div className='w-full md:w-[70%] px-3'>
            <ul>
              {listings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data}/>
              ))}
            </ul>
          </div>
        )}
      
    </div>
  )
}
