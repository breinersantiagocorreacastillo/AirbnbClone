// app/listings/[listingId]/page.tsx
import getCurrentUser from "@/app/accion/getCurrentUser";
import getListingById from "@/app/accion/getListingById";
import EmptyState from "@/app/componente/EmptyState";
import ListingCliente from "./ListingCliente";
import getReservations from "@/app/accion/getReservations";

interface IParams {
    listingId?: string;
}

export default async function ListingPage({ params }: { params: Promise<IParams> }) {
    try {
       
        const { listingId } = await params;
        
        
        const [listing, currentUser, reservations] = await Promise.all([
            getListingById({ listingId }),
            getCurrentUser(),
            getReservations({ listingId })
        ]);

        if (!listing) {
            return (
                <EmptyState 
                    title="Propiedad no encontrada"
                    subtitle="La propiedad que buscas no existe o ha sido eliminada"
                />
            );
        }

        return (
            <ListingCliente
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        );
    } catch (error) {
        console.error("Error en ListingPage:", error);
        return (
            <EmptyState 
                title="Error"
                subtitle="Ocurrió un error al cargar la propiedad"
            />
        );
    }
}