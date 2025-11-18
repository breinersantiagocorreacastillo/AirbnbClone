
import getCurrentUser from "../accion/getCurrentUser";
import getReservations from "../accion/getReservations";
import EmptyState from "../componente/EmptyState";
import ViajeClient from "./ViajeClient";

const TripsPage = async () => {
    const currentUser= await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="No autorizada"
                subtitle="Por favor inicia sesión"
            />
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    });

    if (reservations.length === 0) {
        return(
            <EmptyState
                title="No se encontraron viajes"
                subtitle="Parece que no has reservado ningún viaje"
            />
        )
    }
    return (
        <ViajeClient
            reservations={reservations}
            currentUser = {currentUser}
        />
    )
}

export default TripsPage;