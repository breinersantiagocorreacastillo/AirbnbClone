import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Obtener el cuerpo de la solicitud
        const body = await request.json();
        const { email, name, password } = body;

        // Validar que los campos necesarios estén presentes
        if (!email || !name || !password) {
            return NextResponse.json(
                { error: "Faltan datos obligatorios (email, name, password)" },
                { status: 400 } // Respuesta con código de error 400 si falta algún campo
            );
        }

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "El usuario con este correo ya existe" },
                { status: 409 } // Respuesta con código 409 para conflicto
            );
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 12);

        // Crear el nuevo usuario
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });

        // Responder con el usuario creado
        return NextResponse.json(user, { status: 201 });

    } catch (error) {
        console.error("Error en el registro de usuario:", error);
        // Responder con error 500 si ocurre una excepción
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
