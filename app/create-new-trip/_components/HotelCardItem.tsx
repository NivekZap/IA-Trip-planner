'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Hotel } from './ChatBox';
import { Clock, ExternalLink, Link, Star, Ticket, Wallet } from 'lucide-react';
import axios from 'axios';

type Props={
  hotel:Hotel
}
function HotelCardItem({hotel}:Props) {
  
  const [PhotoUrl, setPhotoUrl]=useState<string>();
  useEffect(() => {
    hotel && GetGooglePlaceDetail();
  }, [hotel])

  const GetGooglePlaceDetail=async()=>{
    const result=await axios.post('/api/google-place-detail', {
    placeName:hotel?.hotel_name
    });
    if (result?.data?.e){
      return;
    }
      setPhotoUrl(result?.data);
  }

  return (
    <div className='flex flex-col gap-1'>
              <Image 
              src={PhotoUrl?PhotoUrl:'/placeholder.jpg'} 
              alt= {hotel?.hotel_name || 'Hotel Image'}
              fill
              className='rounded-xl shadow object-cover mb-2' 
                />
              <h2 className='font-semibold text-lg'>{hotel?.hotel_name}</h2>
              <h2 className='text-gray-500'>{hotel?.hotel_address}</h2>
              <div className='flex justify-between items-center'>
                <p className='flex gap-2 text-green-600'> <Wallet/> {hotel?.price_per_night}</p>
                <p className='text-yellow-500 flex gap-2'><Star/> {hotel?.rating}</p>
              </div>
               <a href={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotel_name}  target="_blank" rel="noopener noreferrer" >
                      <Button size="sm" variant="outline" className="w-full mt-2">  View <ExternalLink /> </Button>
              </a>
              {/* <p className='line-clamp-2 text-gray-5 00'>{hotel?.description}</p> */}
            </div>
  )
}

export default HotelCardItem