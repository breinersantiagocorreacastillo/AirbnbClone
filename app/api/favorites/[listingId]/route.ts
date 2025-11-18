import getCurrentUser from "@/app/accion/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    listingId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: Promise<IParams> } 
    try {
        const currentUser = await getCurrentUser();
        const { listingId } = await params; 
        if (!currentUser) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        if (!listingId || typeof listingId !== 'string') {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }

        let favoriteIds = [...(currentUser.favoriteIds || [])];
        favoriteIds.push(listingId);

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.error("Error en POST favorites:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<IParams> } 
) {
    try {
        const currentUser = await getCurrentUser();
        const { listingId } = await params; 
        if (!currentUser) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        if (!listingId || typeof listingId !== 'string') {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }

        let favoriteIds = [...(currentUser.favoriteIds || [])];
        favoriteIds = favoriteIds.filter((id) => id !== listingId);

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.error("Error en DELETE favorites:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
