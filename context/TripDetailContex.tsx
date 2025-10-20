import { TripInfo } from "@/app/create-new-trip/_components/ChatBox";
import { createContext } from "react";

type TripContextType={
    tripDetailInfo:TripInfo,
    setTripDetailInfo:React.Dispatch<React.SetStateAction<TripInfo>> 
}

export const TripDetailContext=createContext<TripContextType|undefined>(undefined);