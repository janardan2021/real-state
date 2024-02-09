import React, { useState } from 'react'

export default function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
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
        regularPrice: 10,
        discountedPrice: 10,
        latitude: 0,
        longitude: 0
    })

    const {type, name, bedrooms, bathrooms, parking, furnished, address,
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
    function onSubmit(e) {
      e.preventDefault()

      
    }
  return (
    <div className='max-w-md px-2 mx-auto '>
      <h2 className='text-3xl text-center mt-6 font-bold'>
        Create a listing
     </h2>

     <form onSubmit={onSubmit}>
        <p className='text-lg mt-6 font-semibold'>
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
        <div className='flex space-x-6 mb-6'>
          <div>
            <p className='text-lg font-semibold'>Beds</p>
            <input type='number' id='bedrooms' value={bedrooms} 
                   onChange={onChange} min='1' max='50' required
                   className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-700
                             rounded transition duration-150 ease-in-out focus:text-gray-700
                             focus:bg-white focus:outline-green-700'/>
          </div>
          <div>
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
        <p className='text-lg mt-6 font-semibold'>Address</p>
        <textarea type='text' id='address' value={address} 
               onChange={onChange} placeholder='Address' 
               className='w-full px-4 py-2 text-xl text-gray-700 border mb-6
               border-gray-300 rounded transition duration-150 ease-in-out
               focus:text-gray-700 focus:bg-white focus:outline-green-700'/>
         {!geolocationEnabled && (
          <div className='flex space-x-6 mb-6'>
            <div>
              <p className='text-lg font-semibold'>Latitude</p>
              <input type='number' id='latitude' value={latitude} onChange={onChange}
                      required min='-90' max='90'
                      className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-700
                      rounded transition duration-150 ease-in-out focus:text-gray-700
                      focus:bg-white focus:outline-green-700'/>
            </div>
            <div>
              <p className='text-lg font-semibold'>Longitude</p>
              <input type='number' id='longitude' value={longitude} onChange={onChange}
                      required min='-180' max='180' 
                      className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-700
                      rounded transition duration-150 ease-in-out focus:text-gray-700
                      focus:bg-white focus:outline-green-700'/>
            </div>
          </div>
        )}
        <p className='text-lg font-semibold'>Description</p>
        <textarea type='text' id='description' value={description} 
               onChange={onChange} placeholder='Description' 
               className='w-full px-4 py-2 text-xl text-gray-700 border mb-6
               border-gray-300 rounded transition duration-150 ease-in-out
               focus:text-gray-700 focus:bg-white focus:outline-green-700'/>
       
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
          <div>
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
        </div>

        {offer && (
          <div className='flex items-center mb-6'>
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