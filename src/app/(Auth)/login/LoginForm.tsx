'use client'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { LoginSchema } from './login.schema'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'


export default function LoginForm() {
    const RhfObj = useForm({
        resolver: zodResolver(LoginSchema),
    })

    const {
        handleSubmit,
        control,
    } = RhfObj

    const handleLogin = async (data: z.infer<typeof LoginSchema>) => {
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })
        if (res?.ok) {
            toast.success("Login successful")
            window.location.href = "/table"
        } else {
            toast.error("Invalid email or password")
        }

    }
    return (
        <Form {...RhfObj}>
            <form className='form w-full h-150 flex items-center justify-center' onSubmit={handleSubmit(handleLogin)}>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                            <Button asChild variant="link">
                                <Link href="/register">Sign in</Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <FormField
                                    name='email'
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem>
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
                            <div className="flex items-center">
                                <Link

                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
