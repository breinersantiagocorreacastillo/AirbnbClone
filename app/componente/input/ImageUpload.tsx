'use client'
import {CldUploadWidget} from "next-cloudinary"; //trae un componente de React que proporciona una interfaz completa para subir archivos a Cloudinary
import Image from "next/image";
import { useCallback } from "react"; //sirve para memorizar funciones en componentes de React y optimizar el rendimiento. 
import { TbPhotoPlus } from "react-icons/tb";//trae un ícono de una cámara fotográfica con un signo + de la librería Tabler Icons.


declare global{
    var cloudinary: any;
}

interface ImageUploadProps{
    onChange: (value: string) => void;// Función del padre
    value: string;            // URL actual de la imagen
}


export default function ImageUpload({onChange, value}:ImageUploadProps){
   
     const handleUpload = useCallback((result: any)=>{
        // Cuando Cloudinary termina de subir la imagen:
            onChange(result.info.secure_url);  // Notifica al padre con la nueva URL
        }, [onChange]);//Solo se recrea si `onChange` cambia
   
    return(
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="airbnb_clone"
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) =>{
                return(
                    <main
                        onClick={()=> open?.()}
                        className="
                        relative cursor-pointer hover:opacity-70 transition border-dashed
                        border-2 p-20 border-neutral-300 flex flex-col justify-center items-center text-neutral-600
                        "
                    >
                        <TbPhotoPlus size={50}/>
                        <p className="font-semibold text-lg">
                                Haga clic para subir
                        </p>
                        {value &&(
                            <div className="absolute inse-0 w-full h-full">
                                <Image
                                alt="Upload"
                                fill
                                style={{objectFit: 'cover'}}
                                src={value}
                                />

                            </div>
                        )}
                    </main>
                )
            }}
        </CldUploadWidget>
    );
}