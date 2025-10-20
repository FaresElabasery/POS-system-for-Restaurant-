import z from "zod";
import { LoginSchema } from './login.schema'

export type LoginFormData = z.infer<typeof LoginSchema>