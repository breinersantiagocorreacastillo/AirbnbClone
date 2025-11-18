'use client'

import { useRouter } from "next/navigation";

import Container from "../componente/container";
import Titulo from "../componente/titulo";
import { SafeReservation, SafeUser } from "../tipos/indexar";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { error } from "console";
import ListingCard from "../componente/listings/ListingCard";

interface ViajeClientProps{
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

export default function ViajeClient ({
    reservations,
    currentUser
}: ViajeClientProps){

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string)=>{
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() =>{
            toast.success('Reservacion cancelada');
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
                title="Viajes"
                subtitle="Dónde has estado y adónde vas"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            xl: grid-cols-5 2xl: grid-cols-6 gap-8
            ">
                {reservations.map((reservation)=>(
                    <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="Cancelar reservación"
                    currentUser={currentUser}
                    />
                ))}

            </div>
       </Container>
    );
}