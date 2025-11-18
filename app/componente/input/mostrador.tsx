'use client'

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";


//Props que recibe el componente Mostrador
interface MostradorProps{
title: string;
subtitle: string;
value: number;
onChange: (value: number) => void;
}

export default function Mostrador({
    title,
    subtitle,
    value,
    onChange
}: MostradorProps){

    //Funciones para aumentar o disminuir el valor del mostrador
    const onAdd = useCallback(()=>{
        onChange(value + 1);
    }, [onChange, value]);

    // Disminuir el valor, pero no permitir que sea menor a 0
    const onReduce = useCallback(()=>{
        if (value === 0){
            return;
        }
        onChange(value - 1);
    }, [onChange, value]);//dependencias

    return(
        <main className="flex flex-row items-center justify-between">
           
            <section className="flex flex-col">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="font-light text-gray-600">{subtitle}</p>
            </section>

            <section className="flex flex-row items-center gap-4">
                <div onClick={onReduce}
                className="w-10 h-10 rounded-full border-[1px] border-neutral-400
                flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80
                transition">
                    <AiOutlineMinus/>
                </div>
                <p className="font-light text-xl text-neutral-600">{value}</p>
            </section>

             <section className="flex flex-row items-center gap-4">
                <div onClick={onAdd}
                className="w-10 h-10 rounded-full border-[1px] border-neutral-400
                flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80
                transition">
                    <AiOutlinePlus/>
                </div>
            </section>
        </main>
    );
}