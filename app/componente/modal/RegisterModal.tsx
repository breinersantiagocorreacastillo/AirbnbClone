'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import { toast } from 'react-hot-toast';

import useRegisterModal from '@/app/hooks/useRegistreModal';
import Modal from './Modal';
import Titulo from '../titulo';
import Input from '../input/input';
import Button from '../Button';
import { FaFacebook } from 'react-icons/fa6';
import { error } from 'console';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/UseLoginModal';

export default function RegisterModal() {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

   
     const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post('api/register', data)
            .then(() => {
                toast.success('¡Cuenta creada con éxito!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                console.log(error);
                toast.error('Ocurrió un error al crear la cuenta');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
       const cerrarAbrir = useCallback(() =>{
            registerModal.onClose();
            loginModal.onOpen();
           }, [registerModal, loginModal]);
    
   
    const bodyContent = (
        <div className='flex flex-col gap-2'>
            <Titulo
                title='Te damos la bienvenida a Airbnb'
                subtitle='¡Crea una cuenta!'
            />

            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="email"
            />

            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id="password"
                label="Password"
                type='password' 
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-3 mt-2'>
            <hr />
            <Button
            outline
            label='Continuar con Google'
            icon={FcGoogle}
            onClick={()=>signIn('google')}
            />
            <hr />
            <Button
            outline
            label='Continuar con Facebook'
            icon={FaFacebook}
            onClick={()=>{}}
            />
            <div className='justify-center text-neutral-500 text-center mt-3 font-light'>
                <span>¿Ya tienes una cuenta?</span>
               <span onClick={cerrarAbrir}
               className=' text-neutral-800
               cursor-pointer hover:underline'>Acceso</span>
            </div>
         </div>
        )
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Registrarse' 
            actionLabel='Continúa'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)} 
            body={bodyContent}
            footer={footerContent}
        />
    );
}