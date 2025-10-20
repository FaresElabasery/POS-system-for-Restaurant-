import z from "zod";
import { RegisterSchema } from './register.schema'

export type RegisterFormData = z.infer<typeof RegisterSchema>