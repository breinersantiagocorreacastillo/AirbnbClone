import prisma from "../libs/prismadb";

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    locationValue?: string;
    startDate?: string;
    endDate?: string;
    category?: string;
}

export default async function getListings(params: IListingsParams) {
    try {
        const { 
            userId,
            guestCount,
            roomCount, 
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params;

        let query: any = {};

        // Filtro por usuario
        if (userId) {
            query.userId = userId;
        }

        // Filtro por categoría
        if (category) {
            query.category = category;
        }

        // Filtro por ubicación
        if (locationValue) {
            query.locationValue = locationValue;
        }

        // Filtros numéricos (mayor o igual)
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            };
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            };
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            };
        }

        // Filtro por fechas disponibles (evitar conflictos con reservas)
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: endDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: startDate }
                            }
                        ]
                    }
                }
            };
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        // ✅ CONVIERTE LAS FECHAS A STRING
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            updatedAt: listing.updatedAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        console.error("Error en getListings:", error);
        return []; // ✅ Devuelve array vacío en lugar de throw
    }
}