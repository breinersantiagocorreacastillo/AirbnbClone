
import getCurrentUser from "../accion/getCurrentUser";
import getListings from "../accion/getListings";
import EmptyState from "../componente/EmptyState";
import PropiedadesClient from "./PropiedadesClient";

const PropiedadesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="No autorizada"
                subtitle="Por favor inicia sesión"
            />
        );
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    
    if (listings.length === 0) {
        return (
            <EmptyState
                title="No se encontraron propiedades"
                subtitle="Parece que no tienes propiedades"
            />
        );
    }
    
    return (
        <PropiedadesClient
            listings={listings}  
            currentUser={currentUser}
        />
    );
};

export default PropiedadesPage;