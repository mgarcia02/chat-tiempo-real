import { z } from "zod";


export const sendMessageBodySchema = z
    .object({
        message: z.string().trim().min(1, "El mensaje no puede estar vacío").max(500, "El mensaje no puede superar los 500 caracteres")
    })


export const messageParamsSchema = z
    .object({
        id: z.string().trim().regex(/^[0-9a-fA-F]{24}$/, "El id debe ser un ObjectId válido")
    })