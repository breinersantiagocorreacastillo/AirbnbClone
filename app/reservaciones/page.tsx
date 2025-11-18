import EmptyState from "../componente/EmptyState";

import getCurrentUser from "../accion/getCurrentUser";
import getReservations from "../accion/getReservations";
import ReservacionClient from "./ReservacionClient";


export default async function ReservacionPage (){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <EmptyState

                title="No autorizada"
                subtitle="Por favor inicia sesión"
            />
        );
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if (reservations.length === 0){
        return(
            <EmptyState
                title="No se encontró ninguna reserva"
                subtitle="Parece que no tienes ninguna reserva en tu propiedad"
            />
        )
    }

    return(
        <ReservacionClient
            reservations = {reservations}
            currentUser = {currentUser}
        />
    )
};