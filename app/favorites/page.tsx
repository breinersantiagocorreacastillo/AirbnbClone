import EmptyState from "../componente/EmptyState";
import getCurrentUser from "../accion/getCurrentUser";
import getFavoriteListings from "../accion/getFavoriteListing";
import FavoritesClient from "./FavoritesClient";


export default async function ListingPage() {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

         if (listings.length === 0) {
             return(
                <EmptyState
                     title="No se encontraron favoritos"
                    subtitle="Parece que no tienes ninguna lista favorita."
                />
             )
        }

        return(
            <FavoritesClient
                listings={listings}
                currentUser = {currentUser}
            />
        )
    
    
}