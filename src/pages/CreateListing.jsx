import React, { useState } from 'react'
import Loader from '../components/Loader'
import {toast} from 'react-toastify'
import {v4 as uuidv4} from 'uuid'

import {storage} from '../firebase.js'
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import { auth , db} from '../firebase.js'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router'

export default function CreateListing() {
  const navigate = useNavigate()
  const [geolocationEnabled, setGeolocationEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address:'',
        description: '',
        offer:true,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })

    const {type, name, bedrooms, bathrooms, parking, furnished, address, images,
    description, offer, regularPrice, discountedPrice, latitude, longitude} = formData

    // console.log(formData)
    function onChange(e) {
      // console.log(formData)
    let boolean = null
    if(e.target.value === 'true'){
      boolean = true
    }
    if(e.target.value === 'false'){
      boolean = false
    }
    if(e.target.files){
      setFormData((prev) => ({
        ...prev,
        images: e.target.files
      }))
    }
    
    if(!e.target.files){
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value
      }))
    }
    // console.log(formData)
    // console.log(formData.type)
    }
    // console.log(formData)
    async function onSubmit(e) {
      e.preventDefault()
      setLoading(true)
      
      if(offer && +discountedPrice >= +regularPrice) {
        setLoading(false)
        toast.error('Discounted price should be less than regular price!')
        return
      }
      
      if(images.length > 6) {
        setLoading(false)
        toast.error('Maximum 6 images allowed')
        return
      }
    
    const geolocation = {lat: latitude, lng:longitude}

    async function storeImage(image){
         return new Promise((resolve, reject) => {
              const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
              const storageRef = ref(storage, filename);
              const uploadTask = uploadBytesResumable(storageRef, image);
              uploadTask.on('state_changed', 
                      (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                          case 'paused':
                            console.log('Upload is paused');
                            break;
                          case 'running':
                            console.log('Upload is running');
                            break;
                        }
                      }, 
                      (error) => {
                        reject(error)
                      }, 
                      () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                          resolve({downloadURL, filename});
                        });
                      }
                    );
         })
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image)))
                       .catch((error) => {
                        setLoading(false)
                        toast.error('Images not uploaded')
                        return
                       }
    )

    // console.log(imgUrls)
      
    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      userRef: auth.currentUser.uid,
      timestamp: serverTimestamp()
    }
    delete formDataCopy.images;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    !formDataCopy.offer && delete formDataCopy.discountedPrice
    console.log(formDataCopy)

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
    setLoading(false)
    toast.success('Listing added to the database')
    navigate('/profile/listings')
    // navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }

   
    
  if(loading) return (<Loader />)
  return (
    <div className='mt-10 w-full items-center flex flex-col'>

     <form onSubmit={onSubmit} className='w-full md:w-[80%] px-3'>
        <p className='text-lg font-semibold'>
         Rent / Sell
        </p>
        <div className='flex'>
            <button type='button' id='type' value='rent'
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-md
                       rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                       transition duration-150 ease-in-out w-full
                       ${type !== 'rent' ? 'bg-white text-black' : 'bg-green-500 text-white'}`}>
                Rent
            </button>
            <button type='button' id='type' value='sale'
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-md
                       rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                       transition duration-150 ease-in-out w-full ml-3
                       ${type !== 'sale' ? 'bg-white text-black' : 'bg-green-500 text-white'}`}>
                Sell
            </button>
        </div>
        <p className='text-lg mt-6 font-semibold'>Name</p>
        <input type='text' id='name' value={name} required minLength='10'
               onChange={onChange} placeholder='Name' maxLength='32'
               className='w-full px-4 py-2 text-xl text-gray-700 border mb-6
               border-gray-300 rounded transition duration-150 ease-in-out
               focus:text-gray-700 focus:bg-white focus:outline-green-700'/>

       <p className='text-lg mt-6 font-semibold'>Address</p>
        <textarea type='text' id='address' value={address} 
               onChange={onChange} placeholder='Address' 
               className='w-full px-4 py-2 text-xl text-gray-700 border mb-6
               border-gray-300 rounded transition duration-150 ease-in-out
               focus:text-gray-700 focus:bg-white focus:outline-green-700'/>

        {!geolocationEnabled && (
          <div className='flex space-x-6 mb-6'>
            <div className='w-1/2'>
              <p className='text-lg font-semibold'>Latitude</p>
              <input type='number' id='latitude' value={latitude} onChange={onChange}
                      required min='-90' max='90'
                      className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-700
                      rounded transition duration-150 ease-in-out focus:text-gray-700
                      focus:bg-white focus:outline-green-700'/>
            </div>
            <div className='w-1/2'>
              <p className='text-lg font-semibold'>Longitude</p>
              <input type='number' id='longitude' value={longitude} onChange={onChange}
                      required min='-180' max='180' 
                      className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-700
                      rounded transition duration-150 ease-in-out focus:text-gray-700
                      focus:bg-white focus:outline-green-700'/>
            </div>
          </div>
        )}

        <div className='flex space-x-6 mb-6'>
          <div className='w-1/2'>
            <p className='text-lg font-semibold'>Beds</p>
            <input type='number' id='bedrooms' value={bedrooms} 
                   onChange={onChange} min='1' max='50' required
                   className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-700
                             rounded transition duration-150 ease-in-out focus:text-gray-700
                             focus:bg-white focus:outline-green-700'/>
          </div>
          <div className='w-1/2'>
          <p className='text-lg font-semibold'>Baths</p>
            <input type='number' id='bathrooms' value={bathrooms} 
                   onChange={onChange} min='1' max='50' required
                   className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-700
                             rounded transition duration-150 ease-in-out focus:text-gray-700
                             focus:bg-white focus:outline-green-700'/>
          </div>
        </div>
        <p className='text-lg mt-6 font-semibold'>
         Parking
        </p>
        <div className='flex'>
            <button type='button' id='parking' value='true'
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-md
                       rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                       transition duration-150 ease-in-out w-full
                       ${ !parking ? 'bg-white text-black' : 'bg-green-500 text-white'}`}>
                Yes
            </button>
            <button type='button' id='parking' value='false'
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-md
                       rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                       transition duration-150 ease-in-out w-full ml-3
                       ${parking ? 'bg-white text-black' : 'bg-green-500 text-white'}`}>
                No
            </button>
        </div>
        <p className='text-lg mt-6 font-semibold'>
         Furnished
        </p>
        <div className='flex'>
            <button type='button' id='furnished' value='true'
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-md
                       rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                       transition duration-150 ease-in-out w-full
                       ${!furnished ? 'bg-white text-black' : 'bg-green-500 text-white'}`}>
                Yes
            </button>
            <button type='button' id='furnished' value='false'
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-md
                       rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                       transition duration-150 ease-in-out w-full ml-3
                       ${furnished ? 'bg-white text-black' : 'bg-green-500 text-white'}`}>
                No
            </button>
        </div>
       
       
       
         <p className='text-lg font-semibold'>Offer</p>
        <div className='flex mb-6'>
            <button type='button' id='offer' value='true'
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-md
                       rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                       transition duration-150 ease-in-out w-full
                       ${!offer ? 'bg-white text-black' : 'bg-green-500 text-white'}`}>
                Yes
            </button>
            <button type='button' id='offer' value='false'
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-md
                       rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                       transition duration-150 ease-in-out w-full ml-3
                       ${offer ? 'bg-white text-black' : 'bg-green-500 text-white'}`}>
                No
            </button>
        </div>

        <div className='flex items-center mb-6'>
          <div className='w-1/2'>
          <p className='text-lg font-semibold'>Regular price</p>
           <div className='flex w-full justify-center space-x-6'>
           <input type='number' id='regularPrice' value={regularPrice} 
                   onChange={onChange} min='1' max='4000000000' required
                   className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-700
                             rounded transition duration-150 ease-in-out focus:text-gray-700
                             focus:bg-white focus:outline-green-700'/>
           {type === 'rent' && (
            <div>
              <p>$ / Month</p>
            </div>
           )}
           </div>
          </div>

          {offer && (
          <div className='w-1/2' >
        <div>
        <p className='text-lg font-semibold'>Discounted price</p>
          <div className='flex w-full justify-center space-x-6'>
          <input type='number' id='discountedPrice' value={discountedPrice} 
                  onChange={onChange} min='1' max='4000000000' required={offer}
                  className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-700
                            rounded transition duration-150 ease-in-out focus:text-gray-700
                            focus:bg-white focus:outline-green-700'/>
          {type === 'rent' && (
          <div>
            <p>$ / Month</p>
          </div>
          )}
          </div>
        </div>
          </div>
          )}

        </div>

       

    <p className='text-lg font-semibold'>Description</p>
        <textarea type='text' id='description' value={description} 
               onChange={onChange} placeholder='Description' 
               className='w-full px-4 py-2 text-xl text-gray-700 border mb-6
               border-gray-300 rounded transition duration-150 ease-in-out
               focus:text-gray-700 focus:bg-white focus:outline-green-700'/>


    <div className='mb-6'>
      <p className='text-lg font-semibold'>Images</p>
      <p className='text-gray-600'>The first image will be the cover (max 6)</p>
      <input type='file' id='images'
              onChange={onChange} accept='.jpg, .png, .jpeg'
              multiple required 
              className='w-full px-3 py-1.5 text-gray-700 border border-gray-300
                         rounded transition duration-150 ease-in-out focus:bg-white
                         focus:border-green-600 focus:border-2'/>
    </div>

    <button type='submit'
            className='mb-6 w-full px-7 py-3 bg-blue-600 text-white
                      font-medium text-sm uppercase shadow-md hover:bg-blue-700
                      hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
                      active:bg-blue-800 active:shadow-lg transition
                      duration-150 ease-in-out'>Create Listing</button>
     </form>
    </div>
  )
}
