'use client'

import usePais from "@/app/hooks/usePais";
import { SafeUser } from "@/app/tipos/indexar";
import Titulo from "../titulo";
import Image from "next/image";
import CorazonButton from "../CorazonButton";

interface ListingHeadProps{
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null
}
export default function ListingHead({title,
    locationValue,
    imageSrc,
    id,
    currentUser
}:ListingHeadProps){
    const {getByValue} = usePais();

    const location = getByValue(locationValue);
    return (
        <>
            <Titulo
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className=" w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    alt="Image"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                    />
                    <div className="absolute top-5 right-5">
                        <CorazonButton
                            listingId={id}
                            currentUser={currentUser}
                        />

                    </div>
            </div>
        </>
      
    );
}