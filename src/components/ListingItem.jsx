import React from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from "date-fns"
import { FaLocationPin } from "react-icons/fa6";

export default function ListingItem({listing, id}) {
    // console.log(listing.timestamp.toDate())
    const result = formatDistanceToNow(listing.timestamp?.toDate() , {addSuffix: true})
    // console.log(result)
   
  return (
    <li className='relative flex flex-col justify-between shadow-md hover:shadow-xl rounded-md
                  overflow-hidden transition-shadow duration-150'>
      <Link className='contents' to={`/category/${listing.type}/${id}`}>
        <img src={listing.imgUrls[0]} alt='' loading='lazy'
             className='h-[170px] w-full object-cover hover:scale-105 transition-scale
                        duration-200 ease-in'/>
        
        <p className='absolute top-2 right-2 bg-green-700 text-white 
                      text-xs rounded-md px-2 py-1 shadow-lg'>{result}</p>
        <div className='w-full p-1'>
            <div className='flex items-center space-x-1'>
               <FaLocationPin className='h-4 w-4 text-blue-500'/>
               <p className='font-semibold text-sm mb-1 text-gray-700 truncate'>{listing.address}</p>
            </div>
            <p className='font-semibold text-xl truncate'>{listing.name}</p>
            <p className='mt-2 font-semibold text-cyan-900'>
                ${listing.offer ? listing.discountedPrice
                                           .toString()
                                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                               : listing.regularPrice
                                           .toString()
                                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {listing.type === 'rent' ? ' /month' : ''}
            </p>
            <div className='flex items-center mt-1 space-x-3'>
                <div className='flex items-center space-x-1'>
                    <p className='font-bold text-xs'>{listing.bedrooms} Beds</p>
                </div>
                <div className='flex items-center space-x-1'>
                    <p className='font-bold text-xs'>{listing.bathrooms} Baths</p>
                </div>
            </div>
        </div>
      </Link>
    </li>
  )
}
