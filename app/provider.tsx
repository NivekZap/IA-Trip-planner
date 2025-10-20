"use client"
import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
<<<<<<< HEAD
import { TripDetailContext } from '@/context/TripDetailContex';
import { TripInfo } from './create-new-trip/_components/ChatBox';


=======
>>>>>>> e1cc6e49386244d7b76788041d25151d79c8f819

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const CreateUser=useMutation(api.user.CreateNewUser)
  const [userDetail, setUserDetail] = useState<any>();
<<<<<<< HEAD
  const [TripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);
=======
>>>>>>> e1cc6e49386244d7b76788041d25151d79c8f819
  const {user}=useUser();

  useEffect(()=>{
    user&&CreateNewUser();
  }, [user])

  const CreateNewUser = async () => {
    if (user){
      // guardar si el usuario no existe
      const result=await CreateUser({
            email:user?.primaryEmailAddress?.emailAddress??'',
            imageUrl: user?.imageUrl,
            name: user?.fullName ?? ''
      });
      setUserDetail(result);
    }
  }

  return (
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
<<<<<<< HEAD
      <TripDetailContext.Provider value={{TripDetailInfo, setTripDetailInfo}}>
    <div> 
        
        <Header/>
        {children} </div>
      </TripDetailContext.Provider>
=======
    <div> 
        <Header/>
        {children} </div>
>>>>>>> e1cc6e49386244d7b76788041d25151d79c8f819
    </UserDetailContext.Provider>
  )
}

export default Provider
 
<<<<<<< HEAD
export const useUserDetail = () => {
  return useContext(UserDetailContext);
}


export const useTripDetail = () => {
  return useContext(TripDetailContext);
=======
export const useUsertDetail = () => {
  return useContext(UserDetailContext);
>>>>>>> e1cc6e49386244d7b76788041d25151d79c8f819
}