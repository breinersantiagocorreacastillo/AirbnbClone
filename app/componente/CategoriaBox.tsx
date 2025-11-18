'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoriaBoxProps{
    icon:IconType;
    label: string;
    selected?:boolean;
    description?:string;
}


export default function CategoriaBox ({icon: Icon, label, selected, description}: CategoriaBoxProps){

    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() =>{
        let currentQuery = {};

        if(params){
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            categoria: label,
        };
        if(params?.get('categoria') === label){
            delete updatedQuery.categoria;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });

        router.push(url);
    }, [label, params, router]);
    return(
        <div 
        onClick={handleClick}
        className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}>
            <Icon size={26}/>
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    );
}