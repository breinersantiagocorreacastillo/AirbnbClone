'use client'

import Container from "../componente/container"
import ListingCard from "../componente/listings/ListingCard";
import Titulo from "../componente/titulo"
import { SafeListing, SafeUser } from "../tipos/indexar"


interface FavoritesClientProps{
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

export default function FavoritesClient({
    listings,
    currentUser
}: FavoritesClientProps){
    return(
        <Container>
            <Titulo
                title="Favoritos"
                subtitle="¡Lista de lugares que has añadido a favoritos!"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">

            </div>
            {listings.map((listing)=>(
                <ListingCard 
                    currentUser={currentUser}
                    key={listing.id}
                    data={listing}
                />
            ))}
        </Container>
    )
}