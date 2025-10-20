'use client'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { RegisterUser } from './register.action'
import { RegisterSchema } from './register.schema'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


export default function RegisterForm() {
    const route = useRouter()
    const RhfObj = useForm({
        resolver: zodResolver(RegisterSchema),
    })

    const { handleSubmit, control } = RhfObj

    const handleRegister = async (values: z.infer<typeof RegisterSchema>) => {
        const res = await RegisterUser(values)
        if (res.message) {
            toast.success(res.message);
            route.push('/login')
        }else{
            toast.error(res.error)
        }
    }
    return (
        <Form {...RhfObj}>
            <form className='form w-full h-150 flex items-center justify-center' onSubmit={handleSubmit(handleRegister)}>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Register to your account</CardTitle>
                        <CardDescription>
                            Enter your details below to register to your account
                        </CardDescription>
                        <CardAction>
                            <Button asChild variant="link">
                                <Link href="/login">Sign in</Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <FormField
                                    name='name'
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    name='email'
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="m@example.com"
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    name='password'
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    name='rePassword'
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
