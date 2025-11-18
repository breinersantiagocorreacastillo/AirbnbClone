'use client';

import {signIn} from 'next-auth/react';
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
import useLoginModal from '@/app/hooks/UseLoginModal';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    

    const {
        register: registerForm, // Renombrado para evitar conflicto
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

   
   const onSubmit: SubmitHandler<FieldValues> = (data) => {
           setIsLoading(true);
        signIn('credentials',{
            ...data,
            redirect: false,
        })
        .then((callback) =>{
            setIsLoading(false);
            if(callback?.ok){
                toast.success('Login exitoso');
                router.refresh();
                loginModal.onClose();
            }
            if(callback?.error){
                toast.error(callback.error);
            }
        })
           
       };

       const cerrarAbrir = useCallback(() =>{
        loginModal.onClose();
        registerModal.onOpen();
       }, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Titulo
                title='Te damos la bienvenida'
            />

            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={registerForm}
                errors={errors}
                required
            />
           
            <Input
                id="password"
                label="Password"
                type='password' 
                disabled={isLoading}
                register={registerForm}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
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
            <div className='justify-center text-neutral-500 text-center mt-4 font-light'>
                <span>¿Primera vez usando Airbnb?</span>
               <span onClick={cerrarAbrir}
               className=' text-neutral-800
               cursor-pointer hover:underline'>Registrate</span>
            </div>
         </div>
        )
    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Iniciar sesión' 
            actionLabel='Continúa'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)} 
            body={bodyContent}
            footer={footerContent}
        />
    );
}