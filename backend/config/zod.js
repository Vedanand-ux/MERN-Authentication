import {z} from 'zod';

export const registerSchema = z.object({

})

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8,"Password must me atleast 8 chars long"),
})