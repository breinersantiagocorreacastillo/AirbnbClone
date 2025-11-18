'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";



interface InputProps{
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}

export default function Input(props: InputProps) {
    return(
        <div className="w-full relative">
            {props.formatPrice && (
                <BiDollar className="text-neutral-700 absolute top-5 left-2" />
            )}
            <input
                id={props.id}
                disabled={props.disabled}
                {...props.register(props.id, { required: props.required })}
                placeholder=" "
                type={props.type}
                className={`peer w-full p-4 pt-6 font-light bg-white
                    border-2 rounded-md outline-none transition
                    disabled:opacity-70 disabled:cursor-not-allowed
                    ${props.formatPrice ? 'pl-7' : 'pl-3'}
                    ${props.errors[props.id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${props.errors[props.id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
             />
                <label 
                className={`absolute text-md duration-150 transform -translate-y-3 top-4 z-1
                    origin-[0]
                ${props.formatPrice ? "left-7" : "left-3"}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-2
                ${props.errors[props.id] ? "text-rose-500" : "text-zinc-400"}
                `}>
                {props.label}
                </label>
            
        </div>
    );
}

