import z from "zod";

export const LoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must contain at least one letter, one number, and one special character'),
})