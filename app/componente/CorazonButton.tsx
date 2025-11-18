'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../tipos/indexar";
import useFavorite from "../hooks/useFavorite";

interface CorazonButtonProps{
    listingId: string;
    currentUser?: SafeUser | null;
}


export default function CorazonButton({listingId,
    currentUser
}: CorazonButtonProps){
    const {hasFavorited, toggleFavorite} = useFavorite({
        listingId,
        currentUser
    })
    
    return(
        <main 
        onClick={toggleFavorite}
        className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart
                size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart
            size={24}
            className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}/>
        </main>
    );
}