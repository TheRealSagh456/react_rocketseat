import {z} from 'zod'

export const photoNewFormSchema = z.object({
    title: z.string().min(1, {message: 'Campos obrigatório'}).max(255, {message: 'Limite de caracteres excedido'}),
    file: z.instanceof(FileList).refine(file => file.length > 0, {message: "Campos obrigatório"}),
    albumsIds: z.array(z.string().uuid()).optional()
});

export type PhotoNewFormSchema = z.infer<typeof photoNewFormSchema>