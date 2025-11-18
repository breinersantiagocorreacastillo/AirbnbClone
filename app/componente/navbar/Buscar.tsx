'use client'

import useBuscarModal from "@/app/hooks/UseBuscarModal";
import { BiSearch } from "react-icons/bi";

export default function Buscar () {
    const buscarModal = useBuscarModal();
        return (
        <div 
        onClick={buscarModal.onOpen}
        className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sn font-semibold px-6">
                    Explora destinos
                </div>  
                <div className="hidden sm:block text-sn font-semibold px-6 border-x-[1px] flex-1 text-center">
                    Agrega fechas
                </div>
                <div className="text-sn pl-6 pr-2 text-grey-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">¿Cuantos?</div>
                    <div className="p-2  bg-rose-500 rounded-full text-white">
                        <BiSearch size={18}/>
                    </div>
                </div>
            </div>    
        </div>
    );
}

