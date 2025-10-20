import React from 'react'
import ChatBox from './_components/ChatBox'
<<<<<<< HEAD
import Itinerary from './_components/Itinerary'



function CreateNewTrip() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>
        <div>
            <ChatBox />
        </div>
        <div className='col-span-2'>
            <Itinerary />
=======

function CreateNewTrip() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-10'>
        <div>
            <ChatBox />
        </div>
        <div>
            Mapa y Plan del Viaje 
>>>>>>> e1cc6e49386244d7b76788041d25151d79c8f819
        </div>
    </div>
  )
}

export default CreateNewTrip
