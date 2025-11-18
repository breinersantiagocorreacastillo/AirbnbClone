import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/accion/getCurrentUser";

export async function POST(request: Request) {
    try {
        console.log("=== CREANDO LISTING ===");
        
        const currentUser = await getCurrentUser();
        console.log("Usuario:", currentUser?.id);

        if (!currentUser) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const body = await request.json();
        console.log("Datos:", body);

        const {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            price
        } = body;

        // Validación simple
        if (!title || !description || !imageSrc || !category || !locationValue || !price) {
            return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
        }

        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                imageSrc,
                category,
                roomCount: parseInt(roomCount) || 1,
                bathroomCount: parseInt(bathroomCount) || 1,
                guestCount: parseInt(guestCount) || 1,
                locationValue: locationValue.value || locationValue,
                price: parseInt(price) || 1,
                userId: currentUser.id
            }
        });

        console.log("✅ Listing creado:", listing.id);
        return NextResponse.json(listing);

    } catch (error: any) {
        console.error("❌ Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}