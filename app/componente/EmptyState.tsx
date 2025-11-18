'use client'

import { useRouter } from "next/navigation";
import Titulo from "./titulo";
import Button from "./Button";

interface EmptyState{
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

export default function EmptyState({
    title = "No hay coincidencias exactas",
    subtitle = "Prueba a cambiar o quitar algunos de tus filtros.",
    showReset
}:EmptyState){

    const router = useRouter();
    return(
        <main className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Titulo
                center
                title={title}
                subtitle={subtitle}
            />
            <section className="w-48 mt-4">
                {showReset &&(
                    <Button
                        outline
                        label="Remover los filtros"
                        onClick={()=> router.push('/')}
                    />
                )}
            </section>
        </main>
    );
}