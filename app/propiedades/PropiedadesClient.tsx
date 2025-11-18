'use client'

import { useRouter } from "next/navigation";

import Container from "../componente/container";
import Titulo from "../componente/titulo";
import { SafeListing, SafeUser } from "../tipos/indexar";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { error } from "console";
import ListingCard from "../componente/listings/ListingCard";

interface PropiedadesClientProps{
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

export default function PropiedadesClient ({
    listings,
    currentUser
}: PropiedadesClientProps){

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string)=>{
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() =>{
            toast.success('Eliminar lista');
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(()=> {
            setDeletingId('');
        });
    }, [router]);

    return(
       <Container>
            <Titulo
                title="Propiedades"
                subtitle="Lista de tús propiedades"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            xl: grid-cols-5 2xl: grid-cols-6 gap-8
            ">
                {listings.map((listing)=>(
                    <ListingCard
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={deletingId === listing.id}
                    actionLabel="Eliminar propiedad"
                    currentUser={currentUser}
                    />
                ))}

            </div>
       </Container>
    );
}