'use server'
import { RegisterFormData } from './register.types';

export async function RegisterUser(body:RegisterFormData) {
    try {
        const res =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,{
            method:'POST',
            body:JSON.stringify(body),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await res.json()
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
    }

}