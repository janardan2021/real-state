import { useEffect, useState } from "react"
import { db , auth} from "../firebase"
import { useParams } from "react-router"
import { doc, getDoc } from "firebase/firestore"
import Loader from "../components/Loader"
import {toast} from 'react-toastify'
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LuBedSingle } from "react-icons/lu";
import { LiaBathSolid } from "react-icons/lia";
import { MdLocalParking } from "react-icons/md";
import { FaChair } from "react-icons/fa6";

import { register } from 'swiper/element/bundle';
import Contact from "../components/Contact"

export default function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [contactOwner, setContactOwner] =useState(false)
    const params = useParams()
    useEffect(() => {
       async function fetchListing(){
         const docRef = doc(db, 'listings', params.id)
         const docSnap = await getDoc(docRef)
         if(docSnap.exists()){
            setListing(() => docSnap.data())
            setLoading(false)
            // console.log(docSnap.data())
         }
       }
       fetchListing()
    }, [params.id])

    register();
// console.log(window.location)
  if (loading) return <Loader />
  return (
   <div>
     <div className="min-w-[400px] max-w-[800px] py-3 px-4 mx-auto bg-green-100
                    rounded-xl shadow-lg shadow-green-500">
      <swiper-container slides-per-view="2"
                        navigation="true"
                        pagination="true"
                        speed="1000"
                        loop="true" 
                        // autoplay="true"
                        autoplay-delay="3000"
                        // css-mode="true" 
                        centered-slides="true"
                        grab-cursor ="true"
                        effect="coverflow"
                        coverflowEffect-rotate="90" 
                        coverflowEffect-stretch="10"
                        coverflowEffect-depth="100"
                        coverflowEffect-scale="1"
                        coverflowEffect-modifier=".5"
                        coverflowEffect-slide-shadows="false"
                        >
        {listing.imgUrls.map((url, index) => (
            <swiper-slide key={index} >
                <div className="w-[300px] h-[200px] rounded-xl overflow-hidden">
                    <img src={url.downloadURL} className="object-fill h-full w-full"/>
                </div>
            </swiper-slide>
        ))}
      </swiper-container>
        
    </div>
    <div className="bg-green-500 w-fit mx-auto rounded-md text-white cursor-pointer
                    my-4 py-2 px-4 hover:bg-green-700 transition ease-in-out"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast.success('Link copied to clipboard!')
                    }}>
        share
    </div>  
    <div>
      <div className="w-full h-20">
        <p className="text-2xl font-bold my-4 px-2"
           >{listing.name} - ${listing.offer ? listing.discountedPrice
                                                      .toString()
                                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
                               listing.regularPrice
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              {listing.type --- 'rent' ? ' / month' : ''}</p>

        <p className=" flex text-l font-semibold my-4 px-2">
        <FaLocationCrosshairs className="text-blue-500 text-xl mr-2"/>
         {listing.address}
        </p>
        <div className="flex space-x-4  my-4 px-2">
        <p className="w-full max-w-[200px] py-2 px-3 text-center font-semibold
                     bg-cyan-500 rounded-md text-white shadow-md">
          {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
        </p>
        {listing.offer && (
          <p className="w-full max-w-[200px] py-2 px-3 text-center font-semibold
                       bg-green-500 rounded-md text-white shadow-md">
                        ${(+listing.regularPrice) - (+listing.discountedPrice)} <span>Drop in price</span>
         </p>
        )}
        </div>

        <p className="my-4 px-2">
          <span className="font-semibold">Description - </span>
            {listing.description}
        </p>

        <div className="flex w-full space-x-4 my-4 px-2">
          <div className="font-semibold text-lg flex items-center w-fit">
            <LuBedSingle className="mr-1"/> {+listing.bedrooms} Beds</div>
          <div className="font-semibold text-lg flex items-center w-fit">
            <LiaBathSolid className="mr-1"/>{+listing.bathrooms} Baths</div>
          <div className="font-semibold text-lg flex items-center w-fit">
            <MdLocalParking className="mr-1"/>{listing.parking ? "Yes" : "No"}</div>
          <div className="font-semibold text-lg flex items-center w-fit">
            <FaChair className="mr-1"/>{listing.furnished ? "Furnished" : "Not furnished"}</div>
        </div>

        {listing.userRef !== auth.currentUser?.uid && !contactOwner && (
          <div className="flex ">
          <button className="my-4 mx-auto px-5 py-3 text-white font-medium bg-green-500 
                           text-sm uppercase shadow-md hover:bg-green-700 
                           hover:shadow-lg rounded w-4/5 transition ease-in-out"
                           onClick={() => setContactOwner(true)}>
                Contact
          </button>
          </div>
        ) }

        {contactOwner && (
          <div>
            <Contact userRef={listing.userRef} listing={listing}/>
          </div> 
        )}
      </div>
      <div className="w-full h-20"></div>
    </div>
   </div>
  )
}
