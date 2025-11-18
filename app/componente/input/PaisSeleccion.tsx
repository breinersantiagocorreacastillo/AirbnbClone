'use client';
import usePais from "@/app/hooks/usePais";
import Select from "react-select";


export type PaisSeleccionValue = {
flag: string;
label: string;
latlng: number[];
region: string;
value: string;
};

interface PaisSeleccionProps{
    value?: PaisSeleccionValue;
    onChange: (value: PaisSeleccionValue) => void;
}


export default function PaisSeleccion({value, onChange}: PaisSeleccionProps){
   
    const{getAll} = usePais();
   
    return(
        <div>
            <Select
            placeholder="Selecciona un país"
            isClearable
            options={getAll()}
            value={value}
            onChange={(value) => onChange(value as PaisSeleccionValue)}
            formatOptionLabel={(option: any) => (
                <div className="flex flex-row items-center gap-3">
                    <div>{option.flag}</div>
                    <div>
                        {option.label},
                        <span className="text-neutral-500 ml-1">
                            {option.region}
                        </span>
                    </div>
                </div>
            )}
            classNames={{
                control:() => 'p-3 border-2',
                input:() => 'text-lg',
                option:() => 'text-lg',
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,    
                colors:{
                    ...theme.colors,
                    primary: 'black',
                }
            })}
            />
        </div>
    )
}