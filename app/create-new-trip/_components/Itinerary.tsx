"use client"
import React, { useEffect, useState } from 'react'
import { Timeline } from '@/components/ui/timeline';
import Image from "next/image";
import { ArrowLeft, Clock, ExternalLink, Link, Star, Ticket, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';

/* const TRIP_DATA = {
      "destination": "dubai",
      "duration": "2 days",
      "origin": "Lima",
      "budget": "string",
      "group_size": "string",
      "hotels": [
        {
          "hotel_name": "Sheeraton",
          "hotel_address": "Downtown Dubai, Dubai, United Arab Emirates",
          "price_per_night": "$200",
          "hotel_image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          "geo_coordinates": {
            "latitude": -12.1296,
            "longitude": -77.0305
          },
          "rating": "4.5",
          "description": "A luxurious hotel with stunning views of the city skyline."
        },
        {
          "hotel_name": "Sheeraton",
          "hotel_address": "Downtown Dubai, Dubai, United Arab Emirates",
          "price_per_night": "$200",
          "hotel_image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvDMLSotlPEd7MxoHVG83X-LpFfzRrfrhawA&s",
          "geo_coordinates": {
            "latitude": 656,
            "longitude": 123456
          },
          "rating": "4.5",
          "description": "A luxurious hotel with stunning views of the city skyline."
        }
      ],
      
      "itinerary": [
        {
          "day": "1",
          "day_plan": "Arrival and City Tour",
          "best_time_to_visit_day": "Morning",
          "activities": [
            {
              "place_name": "Burj Khalifa",
              "place_details": "The tallest building in the world, offering panoramic views of Dubai from its observation deck.",
              "place_image_url": "placeholder.jpg",
              "geo_coordinates": {
                "latitude": 146516,
                "longitude": 6146146
              },
              "place_address": "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
              "ticket_pricing": "$40",
              "time_travel_each_location": "30 minutes",
              "best_time_to_visit": "Morning",
            }
          ]
        },
        {
          "day": "2",
          "day_plan": "Arrival and City Tour",
          "best_time_to_visit_day": "Morning",
          "activities": [
            {
              "place_name": "Burj Khalifa",
              "place_details": "The tallest building in the world, offering panoramic views of Dubai from its observation deck.",
              "place_image_url": "placeholder.jpg",
              "geo_coordinates": {
                "latitude": 164516,
                "longitude": 51456
              },
              "place_address": "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
              "ticket_pricing": "$40",
              "time_travel_each_location": "30 minutes",
              "best_time_to_visit": "Morning",
            }
          ]
        },
        {
          "day": "3",
          "day_plan": "Arrival and City Tour",
          "best_time_to_visit_day": "Morning",
          "activities": [
            {
              "place_name": "Burj Khalifa",
              "place_details": "The tallest building in the world, offering panoramic views of Dubai from its observation deck.",
              "place_image_url": "placeholder.jpg",
              "geo_coordinates": {
                "latitude": 5456,
                "longitude": 5315
              },
              "place_address": "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
              "ticket_pricing": "$40",
              "time_travel_each_location": "30 minutes",
              "best_time_to_visit": "Morning",
            }
          ]
        }
      ]
    } */
    

function Itinerary() {
  //@ts-ignore
    const { tripDetailInfo, setTripDetailInfo}=useTripDetail();
    const  [tripData, setTripData] = useState<TripInfo|null>(null);

  useEffect(() => {
    tripDetailInfo && setTripData(tripDetailInfo)
  }, [tripDetailInfo])

  const data = tripData?[
    {
      title: "Recomendacion de hoteles",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData?.hotels.map((hotel, index) => (
           <HotelCardItem hotel={hotel}/>
          ))}
        </div>
      ),  
    },
    /*@ts-ignore  */
    ...tripData?.itinerary.map((dayData) => ({
      title: `Day ${dayData.day}`,
      content:  (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <p>Best Time:{dayData?.best_time_to_visit_day}</p>
            {/* @ts-ignore */}
            {dayData?.activities.map((activity, index) => (
                <PlaceCardItem activity={activity}/>
            ))}
        </div>
      )
    }))
  ]: [];
  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      {/*  @ts-ignore */}
      {tripData ? <Timeline data={data} tripData={tripData}/>
      :
      <div> 
      <h2 className='flex gap-2 items-center absolute bottom-10'> <ArrowLeft/> Planifica tu proximo viaje</h2>
      <Image src={''} alt='travel' width={'800'}
      height={800}
      className='w-full h-gull object-cover rounded-3xl'
      />  
     
      </div>
    }
    
      
    </div>
  );
}

export default Itinerary