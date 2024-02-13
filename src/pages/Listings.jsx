import { auth, db } from "../firebase.js";
import {getAuth, updateProfile} from 'firebase/auth'
import { collection, doc, updateDoc, where, query, getDocs, orderBy, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import ListingItem from "../components/ListingItem.jsx";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Listings() {
  const navigate = useNavigate()
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

  function onEdit(id){
    // console.log(id)
   navigate(`/profile/edit-listing/${id}`)
  }

  async function onDelete(id){
      if(window.confirm('Are you sure to delete the listing?')){
        await deleteDoc(doc(db, 'listings', id))
        const updatedListings = listings.filter((listing) => listing.id !== id)
        setListings(updatedListings)
        toast.success('Listing deleted successfully!')
      }
  }

if(loading) return(<Loader />)
return (
    <div className='mt-10 w-full items-center flex flex-col'>

     {listings !== null && listings.length > 0 && (
          <div className='w-full md:w-[70%] lg:w-[90%] px-3'>
            <ul className="sm:grid sm:grid-cols-2 xl:grid-cols-3 mb-6 gap-3">
              {listings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} 
                             listing={listing.data}
                             onDelete= {onDelete}
                             onEdit = {onEdit}/>
              ))}
            </ul>
          </div>
        )}
      
    </div>
  )
}
