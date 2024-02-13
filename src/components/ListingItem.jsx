import React from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from "date-fns"
import { FaLocationPin } from "react-icons/fa6";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function ListingItem({listing, id, onEdit, onDelete}) {
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
            <div className='flex items-center space-x-1 my-1'>
               <FaLocationPin className='h-4 w-4 text-blue-500'/>
               <p className='font-bold text-sm text-gray-700 truncate'>{listing.address}</p>
            </div>
            <p className='font-semibold text-xl truncate'>{listing.name}</p>

            <span className='text-black text-sm flex items-center mt-1'>For
              <p className='ml-2  font-semibold text-lg text-green-700 capitalize'>{listing.type}</p>
             </span>
            
            <p className='mt-2 font-semibold text-cyan-900 ca'>
                ${listing.offer ? listing.discountedPrice
                                           .toString()
                                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                               : listing.regularPrice
                                           .toString()
                                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {listing.type === 'rent' ? ' /month' : ''}
            </p>
            <div className='flex items-center mt-1 space-x-3'>
                <div className='flex items-center'>
                    <p className='font-bold text-xs'>{listing.bedrooms} Beds &</p>
                </div>
                <div className='flex items-center'>
                    <p className='font-bold text-xs'>{listing.bathrooms} Baths</p>
                </div>
            </div>
        </div>
      </Link>
     <div className='flex justify-end space-x-6 mb-2'>
      {onEdit && (
        <div className='text-green-700 font-semibold bg-gray-100 px-3 py-1 rounded-md
                        cursor-pointer hover:bg-gray-300'
              onClick={() => onEdit(id)}>Edit</div>
      )}
      {onDelete && (
        <div className='text-red-700 font-semibold bg-gray-100 px-3 py-1 rounded-md
                        cursor-pointer hover:bg-gray-300'
              onClick={() =>onDelete(id)}>Delete</div>
      )}
     </div>
    </li>
  )
}
