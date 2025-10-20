import z from "zod";

export const RegisterSchema = z.object({
    name:z.string().nonempty('Name is required').min(3,'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must contain at least one letter, one number, and one special character'),
    rePassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'confirm password must contain at least one letter, one number, and one special character'),

}).refine((data) => data.password === data.rePassword, {
    path: ['rePassword'],
    message: 'Passwords do not match',
})
