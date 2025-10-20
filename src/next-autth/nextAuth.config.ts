import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const nextAuthConfig: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Pos Resturant',
            authorize: async (credentials) => {
                try {
                    const res = await fetch(`${process.env.BASE_URL}/api/v1/auth/signin`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        })
                    })
                    const finalResult = await res.json()
                    if (finalResult.message === 'successfully signed in') {
                        return {
                            id: finalResult.user.id,
                            role: finalResult.user.role,
                            email: finalResult.user.email,
                            name: finalResult.user.name,
                        }
                    } else {
                        return null
                    }
                } catch (error) {
                    return null
                }
            },
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
            },
        }

        )

    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.role = token.role
            }
            return session
        },
    },
}