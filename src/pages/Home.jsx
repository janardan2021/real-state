import { useEffect, useState } from "react"
import Loader from '../components/Loader.jsx'
import ListingItem from "../components/ListingItem.jsx"
import {db} from '../firebase.js'
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore"


export default function Home() {
  const [showAll, setShowAll] = useState(true)
  const [showOffer, setShowOffer] = useState(false)
  const [showRent, setShowRent] = useState(false)
  const [showSale, setShowSale] = useState(false)

  function allListingsClicked() {
    setShowAll(() => true)
    setShowOffer(() => false)
    setShowRent(() => false)
    setShowSale(() => false)
  }
  function offerListingsClicked() {
    setShowAll(() => false)
    setShowOffer(() => true)
    setShowRent(() => false)
    setShowSale(() => false)
  }
  function saleListingsClicked() {
    setShowAll(() => false)
    setShowOffer(() => false)
    setShowRent(() => false)
    setShowSale(() => true)
  }
  function rentListingsClicked() {
    setShowAll(() => false)
    setShowOffer(() => false)
    setShowRent(() => true)
    setShowSale(() => false)
  }


  const [allListings , setAllListings] = useState(null)
  useEffect(()=>{
    async function getAllListings(){
      try {
        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef, orderBy('timestamp', 'desc'))
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setAllListings(listings)
        // console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
    getAllListings()
  },[])
  // Listing of sales
  const [saleListings , setSaleListings] = useState(null)
  useEffect(()=>{
    async function getSaleListings(){
      try {
        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef, where('type', '==', 'sale'), 
                         orderBy('timestamp', 'desc'), limit(4))
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setSaleListings(listings)
        // console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
    getSaleListings()
  },[])
  // Listings of Offers
  const [offerListings , setOfferListings] = useState(null)
  useEffect(()=>{
    async function getOfferListings(){
      try {
        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef, where('offer', '==', true), 
                         orderBy('timestamp', 'desc'), limit(4))
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setOfferListings(listings)
        // console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
    getOfferListings()
  },[])

  // Get listings for rent
  const [rentListings , setRentListings] = useState(null)
  useEffect(()=>{
    async function getRentListings(){
      try {
        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef, where('type', '==', 'rent'), 
                         orderBy('timestamp', 'desc'), limit(4))
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setRentListings(listings)
        // console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
    getRentListings()
  },[])
  return (
    <div className="flex flex-col md:flex-row"> 
     <div className="flex w-full justify-start md:w-1/5 md:flex-col md:space-y-10 my-6">
      <button onClick={allListingsClicked}
              className={`text-lg font-semibold w-fit mx-auto border-b-4 px-4 hover:scale-105
                         transition ease-in-out 
                         ${showAll ? ' border-green-700' : 
                          ' border-gray-200'}`}>All Listings</button>
      <button onClick={offerListingsClicked}
              className={`text-lg font-semibold w-fit mx-auto border-b-4 px-4 hover:scale-105
                         transition ease-in-out 
                         ${showOffer ? ' border-green-700' : 
                          ' border-gray-200'}`}>Offers</button>
      <button onClick={rentListingsClicked}
              className={`text-lg font-semibold w-fit mx-auto border-b-4 px-4 hover:scale-105
                         transition ease-in-out 
                         ${showRent ? ' border-green-700' : 
                          ' border-gray-200'}`}>Sales</button>
      <button onClick={saleListingsClicked}
              className={`text-lg font-semibold w-fit mx-auto border-b-4 px-4 hover:scale-105
                         transition ease-in-out 
                         ${showSale ? ' border-green-700' : 
                          ' border-gray-200'}`}>Rent</button>
     </div>

     <div className="flex w-full md:w-4/5 my-6 px-6">
     {showAll && (
      <div>
      {!allListings ? <Loader /> : (
        <div className="grid grid-cols-3 gap-6 ">
          {allListings.map((listing) => (
          <ListingItem key={listing.id} id={listing.id} 
                       listing={listing.data}/>
        ))}
        </div>
      )}
    </div>
     )}

     {showOffer && (
       <div>
       {!offerListings ? <Loader /> : (
         <div className="grid grid-cols-3 gap-6 ">
           {offerListings.map((listing) => (
           <ListingItem key={listing.id} id={listing.id} 
                        listing={listing.data}/>
         ))}
         </div>
       )}
     </div>
     )}

      {showRent && (
        <div>
        {!rentListings ? <Loader /> : (
          <div className="grid grid-cols-3 gap-6">
            {rentListings.map((listing) => (
            <ListingItem key={listing.id} id={listing.id} 
                         listing={listing.data}/>
          ))}
          </div>
        )}
      </div>
      )}

     {showSale && (
       <div>
       {!saleListings ? <Loader /> : (
         <div className="grid grid-cols-3 gap-6">
           {saleListings.map((listing) => (
           <ListingItem key={listing.id} id={listing.id} 
                        listing={listing.data}/>
         ))}
         </div>
       )}
     </div>
     )}
      
     </div>

    </div>
  )
}
