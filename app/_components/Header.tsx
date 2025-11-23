"use client"
import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { text } from 'stream/consumers'
import { SignInButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'


const menuOptions = [
  { name:' Inicio ', path:'/' },
  { name:' Precios ', path:'/pricing' },
  { name:' Contactame', path:'/contact-us' }
]

function Header() {

  const {user}=useUser();
  const path=usePathname();
  console.log(path)

  return (
    <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <div className='flex gap-2 items-center'>
            <Image src={'/logo1.svg'}  alt='logo' width={30} height={30}/>
            <span className='font-bold text-2xl hover:text-primary' >Plancito</span>
            
          </div>

        {/* Menu de Opciones */}    
        <div className='flex gap-8 items-center'>
          {menuOptions.map((menu, index) => (
            <Link key={menu.path} href={menu.path}>
              <span className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</span>
            </Link>
          ))}
        </div>

        {/* Get Started */}
        {!user ? <SignInButton mode="modal">
          <Button>Vamos pa alla!</Button>
        </SignInButton> :
            path=='/create-new-trip'?
           <Link href={'/my-trips'}>
              <Button>Mis viajes</Button>
            </Link>
           : <Link href={'/create-new-trip'}>
              <Button>Crea un nuevo viaje </Button>
            </Link>}
  </div>
  )
}

export default Header