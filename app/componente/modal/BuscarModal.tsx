'use client'
import { useRouter } from "next/navigation";
import Modal from "./Modal";

import qs from "query-string";

import useBuscarModal from "@/app/hooks/UseBuscarModal";
import { useCallback, useMemo, useState } from "react";
import { Calendar, Range } from "react-date-range";
import PaisSeleccion, { PaisSeleccionValue } from "../input/PaisSeleccion";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns";
import Titulo from "../titulo";
import Calendario from "../input/Calendario";

enum PASOS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

export default function BuscarModal () {
    const router = useRouter();
    const params = useBuscarModal();
    const buscarModal = useBuscarModal();
    
    const [location, setLocation] = useState<PaisSeleccionValue>();
    const [paso, setPaso] = useState(PASOS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoonCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'Selection'
    });

    const Map = useMemo(() => dynamic(()=> import('../mapa'),{
        ssr: false,
    }), [location]);

   const onBack = useCallback (()=> {
    setPaso((value) => value - 1);
   }, []);

   const onNext = useCallback(() => {
    setPaso((value) => value + 1);
   }, []);

   const onSubmit = useCallback (async() => {
    if (paso !== PASOS.INFO) {
        return onNext();
    }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate){
            updatedQuery.startDate =formatISO(dateRange.startDate);   
        }

        if (dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        setPaso(PASOS.LOCATION);
        buscarModal.onClose();

        router.push(url);
   }, [
    paso,
    buscarModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
   ])

   const actionLabel = useMemo(()=> {
    if (paso === PASOS.INFO) {
        return 'Buscar';
    }

    return 'Siguiente'
   }, [paso]);

   const secondaryActionLabel = useMemo(() => {
    if(paso === PASOS.LOCATION) {
        return undefined;
    }
    return 'Regresar'
   }, [paso]);

   let bodyContent = (
    <div className="flex flex-col gap-8">
        <Titulo
            title="¿Adónde quieres ir?"
            subtitle="Encontrar la ubicación perfecta"
        />
        <PaisSeleccion
            value={location}
            onChange={(value) =>
                setLocation(value as PaisSeleccionValue)
            }
        />
        <hr />
        <Map center={location?.latlng}/>
    </div>
   )

   if (paso === PASOS.DATE){
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Titulo
                title="¿Cuándo piensas ir?"
                subtitle="Asegurate de que todos este libres"
            />

            <Calendario
                value={dateRange}
                onChange={(value)=> setDateRange(value.Selection)}
            />

        </div>
    )
   }
    return(
        <Modal
            isOpen={buscarModal.isOpen}
            onClose={buscarModal.onClose}
            onSubmit={onSubmit}
            title="Filtrar"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={paso !== PASOS.LOCATION ? onBack : undefined}
            body={bodyContent}
        />
    )
}