
import prisma from "../libs/prismadb";
//hace parte del listing page
interface IParams {
    listingId?: string;
}

export default async function getListinById( 
    params: IParams
) {
    try {
        const { listingId } = params;
        
        // Validación más estricta del listingId
        if (!listingId || typeof listingId !== 'string') {
            console.error("listingId no proporcionado o inválido:", listingId);
            return null;
        }

        // Verificar que el ID tenga formato válido (ObjectId de MongoDB)
        if (!/^[0-9a-fA-F]{24}$/.test(listingId)) {
            console.error("ID de listing con formato inválido:", listingId);
            return null;
        }
        
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        if (!listing) {
            console.log("No se encontró listing con ID:", listingId);
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            updatedAt: listing.updatedAt.toISOString(), 
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null,
            }
        };
    } catch (error: any) {
        console.error("Error en getListingById:", error);
        throw new Error(error.message || "Error al obtener el listing");
    }
}