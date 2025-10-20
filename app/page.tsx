import Image from "next/image";
import Hero from "./_components/Hero";
import { Button } from "@/components/ui/button";
import { PopularCityList } from "./_components/PopularCityList";


export default function Home() {
return (
    <div>
        <Hero />
        <PopularCityList />
    </div>
 )   ;
}
