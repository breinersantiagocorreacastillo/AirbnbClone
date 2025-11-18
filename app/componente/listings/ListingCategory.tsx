'use client'
//hace parte del listing page
import { IconType } from "react-icons"


interface ListingCategoryProps{
    icon: IconType;
    label: string;
    description: string
}


export default function ListingCategory ({
    icon: Icon,
    label,
    description
}: ListingCategoryProps) {
    return (
        <main className="flex flex-col gap-6">
            <section className="flex flex-row items-center gap-4">
                <Icon size={40} className="text-neutral-600"/>
                <div className="flex flex-col">
                    <div className="text-lg font-semibold">
                        {label}
                    </div>
                    <div className="text-neutral-500 font-light">
                        {description}
                    </div>
                </div>

            </section>

        </main>
    )
}