'use client'

import Container from "@/app/componente/container";
import ListingHead from "@/app/componente/listings/ListingHead";
import ListingInformacion from "@/app/componente/listings/ListingInformacion";
import ListingReserva from "@/app/componente/listings/ListingReserva";
import { categorias } from "@/app/componente/navbar/Categorias";
import useLoginModal from "@/app/hooks/UseLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/tipos/indexar";

import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Range } from "react-date-range"; 

const inicioDateFecha: Range = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'seleccion'
}

interface ListingClienteProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

export default function ListingCliente({
    listing,
    reservations = [],
    currentUser
}: ListingClienteProps) {

    const loginModal = useLoginModal();
    const router = useRouter();

    const deshabilitarDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });
        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(inicioDateFecha);

    const alCrearReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        // Validar que las fechas estén seleccionadas
        if (!dateRange.startDate || !dateRange.endDate) {
            toast.error('Por favor selecciona las fechas');
            return;
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id 
        })
        .then(() => {
            toast.success('¡Reservado!');
            setDateRange(inicioDateFecha);
            router.push('/viajes');
        })
        .catch((error) => {
            console.error('Error en reserva:', error);
            toast.error('Algo salió mal');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [
        totalPrice,
        dateRange,
        listing.id,
        router,
        currentUser,
        loginModal
    ]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount > 0 && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categorias.find((item) => item.label === listing.category);
    }, [listing.category]);

    return (
        <Container>
            <main className="max-w-screen-lg mx-auto">
                <section className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInformacion
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReserva
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={alCrearReservation}
                                disabled={isLoading}
                                disabledDates={deshabilitarDates}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </Container>
    );
}