"use client";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { ArrowDown,Globe2, Landmark, Plane, Send } from 'lucide-react'
import { useRouter } from "next/navigation";
import React from 'react'



export const suggestions = [
  {
    tittle: 'Create New Trip',
    icon:<Globe2 className='text-blue-400 h-5 w-5' />,
  },
  {
    tittle: 'Inspire me were to go',
    icon:<Plane className='text-green-500 h-5 w-5' />,
  },
  {
    tittle: 'Discover Hidden Gems',
    icon:<Landmark className='text-orange-500 h-5 w-5' />,
  },
  {
    tittle: 'Adventure destination',
    icon:<Globe2 className='text-yellow-600 h-5 w-5' />,
  },
  
  
]

function Hero() {

  const { user } = useUser();
  const router=useRouter();
  const onSend = () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    router.push('/create-new-trip')
  }

  return (
    <div className='mt-24 w-full flex  justify-center'>
        {/* Content */}
        <div className='max-w-3xl w-full text-center space-y-6'>
            <h1 className='text-xl md:text-5xl font-bold'>Hey UTPino, Soy tu <span className='text-primary'>Planeador de viajes personal</span></h1>
        <p className='text-lg'>Dime a donde quieres ir y yo hare el resto; Hoteles,lugares que visitar - todo en segundos</p>

        {/* Input Box */}
        <div>
            <div className='border rounded-2xl p-4 relative' >
                <Textarea placeholder='Crea una ruta de viajes desde ancon hasta chorillos xd'
                className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                />
                <Button size={'icon'} className='absolute bottom-6 right-6' onClick={() =>onSend()}>
                    <Send className='h-4 w-4' />
                </Button>
            </div>
        </div>
        {/* Suggestion list */}
        <div className='flex gap-5'>
            {suggestions.map((suggestions, index) => (
                <div key={index} className='flex items-center gap-2 border rounded-full p-2 cursor-pointer
                hover:bg-primary hover:text-white'>
                    {suggestions.icon}
                    <h2 className='text-sm'>{suggestions.tittle}</h2>
                </div>
        ))}
        </div>

        {/* Video Section */}
        </div>
    </div>
  )
}

export default Hero