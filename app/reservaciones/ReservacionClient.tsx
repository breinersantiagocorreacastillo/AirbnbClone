'use client'

import {toast} from "react-hot-toast";
import axios from "axios";
import Container from "../componente/container";
import Titulo from "../componente/titulo";
import { SafeReservation, SafeUser } from "../tipos/indexar";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ListingCard from "../componente/listings/ListingCard";

interface ReservacionClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser | null;
}

export default function ReservacionClient({
    reservations,
    currentUser
}: ReservacionClientProps){
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) =>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reserva cancelada")
                router.refresh();
            })
            .catch(() => {
                toast.error('Algo salió mal')
            })

            .finally(() =>{
                setDeletingId('');
            })
        
    },[router]);


    return(
        <Container>
            <Titulo
                title="Reservaciones"
                subtitle="Reservando en tus propiedades"  
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-col-3
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8
            ">
                {reservations.map((reservation)=>(
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled = {deletingId === reservation.id}
                        actionLabel="Cancelar reserva de huésped"
                        currentUser={currentUser}
                    />
                ))}

            </div>
        </Container>
    )
}