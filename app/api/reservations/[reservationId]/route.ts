import { NextResponse } from "next/server";
import getCurrentUser from "@/app/accion/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<IParams> } // ✅ Next.js 14 usa Promise
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { reservationId } = await params; // ✅ Esperar el Promise

        if (!reservationId || typeof reservationId !== 'string') {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }

        // ✅ Usar deleteMany con las condiciones de seguridad
        const reservation = await prisma.reservation.deleteMany({
            where: {
                id: reservationId,
                OR: [
                    { userId: currentUser.id }, // ✅ El que hizo la reserva
                    { listing: { userId: currentUser.id } } // ✅ El dueño del listing
                ]
            }
        });

        // ✅ Verificar si se eliminó alguna reserva
        if (reservation.count === 0) {
            return NextResponse.json(
                { error: "Reserva no encontrada o no autorizado" }, 
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Reserva cancelada exitosamente" });
    } catch (error: any) {
        console.error("Error al eliminar reserva:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}