"use client"
import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { TripDetailContext } from '@/context/TripDetailContex';
import { TripInfo } from './create-new-trip/_components/ChatBox';



function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const CreateUser=useMutation(api.user.CreateNewUser)
  const [userDetail, setUserDetail] = useState<any>();
  const [TripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);
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
      <TripDetailContext.Provider value={{TripDetailInfo, setTripDetailInfo}}>
    <div> 
        
        <Header/>
        {children} </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default Provider
 
export const useUserDetail = () => {
  return useContext(UserDetailContext);
}


export const useTripDetail = () => {
  return useContext(TripDetailContext);
}