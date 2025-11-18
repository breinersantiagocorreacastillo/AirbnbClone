
'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxValue } from "react-icons/rx";
import MenuItem from "../MenuItem";
import useRegisterModal from "@/app/hooks/useRegistreModal";
import useLoginModal from "@/app/hooks/UseLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/tipos/indexar";
import useRentModal from "@/app/hooks/useRenModal";
import { useRouter } from "next/navigation";


interface UserMenuProps{
    currentUser?: SafeUser | null;
}


export default function UserMenu ({ currentUser }: UserMenuProps) {

    const [estaAbierto, setEstaAbierto] = useState(false);
    const registerModal = useRegisterModal();
    const router = useRouter();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

const abrirPuerta = useCallback(() => {
    setEstaAbierto((prevState)=> !prevState);
    }, []);


    const onRent = useCallback(()=>{
        if (!currentUser){
          return  loginModal.onOpen();
        }
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);
    
    return(
     <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div onClick={onRent}
               className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" 
                >
                   <h2>Conviértete en anfitrión</h2>
            </div>
            <div onClick={abrirPuerta}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200
                flex flex-row items-center gap-3 rounded-full cursor-pointer
                hover:shadow-md transition">
                    <AiOutlineMenu/>
            </div>
        </div>
        {estaAbierto && (
           <div className="absolute rounded-xl shadow-md w-[40 vm] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                        <><MenuItem
                        onClick={()=> router.push("/viajes")}
                        label="Mis viajes"
                    />
                     <hr />
                    <MenuItem
                        onClick={()=> router.push('/favorites')}
                        label="Mis favoritos"
                    />
                     <hr />
                    <MenuItem
                        onClick={()=>router.push("/reservaciones")}
                        label="Mis reservas"
                    />
                    <hr />
                    <MenuItem
                        onClick={()=> router.push("/propiedades")}
                        label="Mis propiedades"
                    />
                     <hr />
                    <MenuItem
                        onClick={rentModal.onOpen}
                        label="Airbnb mi hogar"
                    />
                     <MenuItem
                        onClick={()=>signOut()}
                        label="Cierra la sesión"
                    />
                    
                     </>
                        
                    ):(<>
                    
                     <MenuItem
                        onClick={()=>{}}
                        label="Centro de ayuda"
                    />
                     <hr />
                    <MenuItem
                        onClick={()=>{}}
                        label="Conviertete en anfitrión"
                    />
                     <hr />
                    <MenuItem
                        onClick={()=>{}}
                        label="Encuentra un coanfitrión"
                    />
                     <hr />
                      <MenuItem
                        onClick={loginModal.onOpen}
                        label="Iniciar sesión"
                    />
                    <MenuItem
                        onClick={registerModal.onOpen}
                        label="Registrarse"
                    />
                    
                    </>)}



            </div>
           </div> 
        )}
           
     </div>
        
    );
}

