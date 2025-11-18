'use client'

import Container from "../container";
import Buscar from "./Buscar";
import Categorias from "./Categorias";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

import { SafeUser } from "@/app/tipos/indexar";

interface NavbarProps {
    currentUser: SafeUser | null;
}

export default function Navbar ({currentUser}: NavbarProps) {

    console.log(currentUser);
    return(
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
               <Container>
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                <Logo/>
                <Buscar/>
                <UserMenu currentUser={currentUser}/>
                </div>   
               </Container>
            </div>
            <Categorias/>
        </div>
    );
}