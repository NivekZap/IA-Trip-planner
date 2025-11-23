"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, ExternalLink, Star, Ticket, Wallet } from 'lucide-react';
import { Activity } from './ChatBox';
import axios from 'axios';

type Props={
    activity:Activity
}
function PlaceCardItem({activity}: Props) {
  const [PhotoUrl, setPhotoUrl]=useState<string>();
  useEffect(() => {
    activity && GetGooglePlaceDetail();
  }, [activity])

  const GetGooglePlaceDetail=async()=>{
    const result=await axios.post('/api/google-place-detail', {
    placeName:activity?.place_name+":"+activity?.place_address
    });
    if (result?.data?.e){
      return;
    }
      setPhotoUrl(result?.data);
  }
  return (

    <div className='relative w-full h-48'>
      
        <Image 
        src={PhotoUrl ? PhotoUrl :'/placeholder.jpg'} 
        alt={activity?.place_name} 
        width={400} 
        height={200}
        className='object-cover rounded-xl'></Image>
    
      <div>
        <h2 className='font-semibold text-lg'>{activity?.place_name}</h2>
        <p className='text-gray-500 line-clamp-2'>{activity?.place_details}</p>
        <h2 className='flex gap-2 text-blue-700 line-clamp-1'><Ticket/>{activity?.ticket_pricing}</h2>
        <p className='flex text-orange-600 gap-2 line-clamp-1'><Clock/>{activity?.time_travel_each_location}</p>
        <a href={`https://www.google.com/maps/search/?api=1&query=${activity?.place_name}`}  target="_blank" rel="noopener noreferrer" >
            <Button size="sm" variant="outline" className="w-full mt-2">  View <ExternalLink /> </Button>
        </a>
      </div>                  
    </div>
  )
}

export default PlaceCardItem
