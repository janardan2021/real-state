import { useEffect, useState } from "react"
import { db } from "../firebase"
import { useParams } from "react-router"
import { doc, getDoc } from "firebase/firestore"
import Loader from "../components/Loader"

import { register } from 'swiper/element/bundle';

export default function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const params = useParams()
    useEffect(() => {
       async function fetchListing(){
         const docRef = doc(db, 'listings', params.id)
         const docSnap = await getDoc(docRef)
         if(docSnap.exists()){
            setListing(() => docSnap.data())
            setLoading(false)
            console.log(docSnap.data())
         }
       }
       fetchListing()
    }, [params.id])

    register();

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
   </div>
  )
}
