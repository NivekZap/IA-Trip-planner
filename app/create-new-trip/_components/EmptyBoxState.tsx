import { suggestions } from '@/app/_components/Hero'
import React from 'react'

function EmptyBoxState({onSelectOption}:any) {
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-3xl text-center'>Comienza tu nuevo <strong className='text-primary'>VIAJE</strong> usando IA </h2>
        <p className='text-center text-gray-400 mt-2 '> Descubre nuevas aventuras y rutas que te acompañen en esta historia</p>
        <div className='flex flex-col gap-5 mt-7' >
                    {suggestions.map((suggestions, index) => (
                        <div key={index} 
                        onClick={() => onSelectOption(suggestions.tittle)}
                        className='flex items-center gap-2 border rounded-xl p-3 cursor-pointer
                        hover:border-primary hover:text-primary'>
                            {suggestions.icon}
                            <h2 className='text-lg'>{suggestions.tittle}</h2>
                        </div>
                ))}
                </div>
    </div>
  )
}

export default EmptyBoxState