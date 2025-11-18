'use client';

import useRentModal from "@/app/hooks/useRenModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Titulo from "../titulo";
import { categorias } from "../navbar/Categorias";
import CategoriaInput from "../input/CategoriaInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import PaisSeleccion from "../input/PaisSeleccion";
import dynamic from "next/dynamic";
import Mostrador from "../input/mostrador";
import ImageUpload from "../input/ImageUpload";
import Input from "../input/input";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";



//Configuracion del formulario con react-hook-form

enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

export default function RentModal (){
    const router = useRouter();
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const[isLoading, setIsloading] = useState(false);
//Configuracion del formulario con react-hook-form
    const{
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
        // getValues(la informacion se extrae de model Listing, ubicada prisma/schema.prisma )
    } = useForm<FieldValues>({
        defaultValues:{
            category: '',    //en esta seccion se guarda la categoria seleccionada
            locationValue: null,  //en esta seccion se guarda el pais seleccionado
            guestCount: 1, //numero de huespedes
            roomCount: 1, //numero de habitaciones
            bathroomCount: 1, //numero de baños
            imageSrc: '', //url de la imagen
            description: '', //descripcion del lugar
            price: 1, //precio por noche
            title: '' //titulo del anuncio
        }
    });

    const category = watch('category');
    const location = watch('locationValue')//obtener el pais seleccionado
    const roomCount = watch('roomCount')
    const guestCount = watch('guestCount')
    const bathroomCount= watch('bathroomCount')
    const imageSrc = watch('imageSrc')
    const description = watch('description')
// Mapa cargado dinámicamente para evitar problemas con SSR (una vez seleccionado el pais, se encarga de ubicarlo en el mapa)
    const Mapa = useMemo(()=> dynamic(()=>import("../mapa"),{
        ssr: false
    }), [location]);

    //funcion para actualizar los valores del formulario
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value,{
            shouldDirty: true,  
            shouldTouch: true,
            shouldValidate: true,
        })
    };

    const onBack = () => {
        setStep((value) => value -1); 
    };

    const onNext = () => {
        setStep((value) => value +1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        if (step !== STEPS.PRICE){
            return onNext();
        }
        setIsloading(true);

        axios.post('/api/listings', data)
        .then(() =>{
            toast.success('¡listado creado!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(()=>{
            toast.error('Algo salió mal');    
        }).finally(()=>{
            setIsloading(false);
        })
    }


//logica para el boton de accion principal y secundaria
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE){
            return 'Crear';
        }
        return 'Siguiente';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY){
            return undefined;
        }
        return 'Atrás';
    }, [step]);
//contenido del modal segun el paso en el que se encuentre
    let bodyContent = (<div className="flex flex-col gap-8">
      <Titulo
        title="¿Cómo te gustaría rentar tu hogar?"
        subtitle="Elige una categoría" 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categorias.map((item)=>(
            <div key={item.label} className="col-span-1">
               < CategoriaInput
               onClick={(category)=> setCustomValue('category', category)}
               selected={category === item.label}
               label={item.label}
               icon={item.icon}
               />
            </div>
        ))}
        </div>
    </div>
    );
//contenido del modal para la seleccion del pais
    if (step === STEPS.LOCATION){
        bodyContent =(
            <div className="flex flex-col gap-8">
               <Titulo
                title="¿Dónde se encuentra tu lugar?"
                subtitle="Elige un país"
            />
           <PaisSeleccion
            value={location}
            onChange={(value) => setCustomValue('locationValue', value)}
           />
            <Mapa
            center={location?.latlng}
            />
            </div>
        ) }
        //contenido del modal para la informacion basica
        if (step === STEPS.INFO){
            bodyContent =(
                <div className="flex flex-col gap-8">
                     <Titulo        
                    title="Comparte información básica sobre tu lugar"
                    subtitle="¿Qué comodidades ofrece?"
                />
               
                <Mostrador
                title="Invitados"
                subtitle="¿Cuántos invitados pueden alojarse?"
                value={guestCount}
                onChange={(value) => setCustomValue('guestCount', value)}
                 />
                 <hr/>
                 <Mostrador
                title="Habitaciones"
                subtitle="¿Cuántas habitaciones tienes?"
                value={roomCount}
                onChange={(value) => setCustomValue('roomCount', value)}
                 />
                 <hr/>
                 <Mostrador
                title="Baños"
                subtitle="¿Cuántos baños tienes?"
                value={bathroomCount}
                onChange={(value) => setCustomValue('bathroomCount', value)}
                 />

                </div>
            )
        }

        //Contenido modal sobre las imagenes de las propiedades
        if (step === STEPS.IMAGES){
            bodyContent =(
                <div className="flex flex-col gap-8">
                     <Titulo        
                    title="Añade una foto de tu lugar"
                    subtitle="¡Muestra al invitado cómo se ve tu lugar!"
                />
                <ImageUpload
                value={imageSrc}
                onChange={(value) => setCustomValue('imageSrc', value)}
                />
                </div>
                )
            }

            //Contenido modal sobre las descrpciones de las propiedades

             if (step === STEPS.DESCRIPTION){
            bodyContent =(
                <div className="flex flex-col gap-8">
                     <Titulo        
                    title="¿Cómo describirías tu lugar?"
                    subtitle="¡Lo breve y conciso es lo mejor!"
                />
                <Input
                id="title"
                label="Title"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <hr/>
                 <Input
                id="description"
                label="Descripcion"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
               </div>
            )
            }
             //Contenido modal sobre precios
            
             if (step === STEPS.PRICE){
            bodyContent =(
                <div className="flex flex-col gap-8">
                     <Titulo        
                    title="¿Cuál es tu precio??"
                    subtitle="¿Cuánto cobras por noche?"
                />
                <Input
                id="price"
                label="Price"
                formatPrice
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                </div>
            )
         }
    //retorno del modal
    return(
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Renta tú hogar"
        body={bodyContent}
        disabled={false}
        />
    )
}