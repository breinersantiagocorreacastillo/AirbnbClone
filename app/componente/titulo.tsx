'use client';
interface TituloProps{
    title: string;
    subtitle?: string;
    center?: boolean;
}


const Titulo: React.FC<TituloProps> =({
    title,
    subtitle,
    center
})=>{
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <h3 className="text-2xl font-bold">
                {title}
            </h3>
            {subtitle && (
                <p className="text-neutral-500 font-light mt-2">
                    {subtitle}
                </p>
            )}
        </div>
        );
}

export default Titulo;