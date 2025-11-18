import { z } from "zod";

const allowedGenders = ["male", "female"];

export const signUpSchema = z
    .object({
        fullName: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
        userName: z.string().trim().min(3, "El usuario debe tener al menos 3 caracteres"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
        confirmPassword: z.string(),
        gender: z.string().trim().toLowerCase().refine((val) => allowedGenders.includes(val), "El género debe ser male o female"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Las contraseñas no coinciden"
    })

export const signInSchema = z
    .object({
        userName: z.string().trim().min(3, "El usuario debe tener al menos 3 caracteres"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
    })