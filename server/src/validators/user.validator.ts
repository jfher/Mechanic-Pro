import z from "zod";

export const userCreateSchema = z.object({
    name: z.string({ message: 'Name is required' })
        .min(3, { error: 'Name must have at least 3 characters' })
        .max(20, { error: 'Name must have less than 20 characters' }),
    email: z.email({ message: 'Email format is not valid' }),
    password: z.string({ message: 'Password is required' })
        .min(8, { error: 'Password must be at least 8 characters long' })
        .max(12, { error: 'Password must be less than 12 characters' }),
    roles: z.array(z.string({ message: 'Role is required' })).length(1, { message: 'At least one role is required' }),
});


export const userUpdateSchema = z.object({
    name: z.string({ message: 'Name is required' })
        .min(3, { error: 'Name must have at least 3 characters' })
        .max(20, { error: 'Name must have less than 20 characters' }).optional(),
    email: z.email({ message: 'Email format is not valid' }).optional(),
    password: z.string({ message: 'Password is required' })
        .min(8, { error: 'Password must be at least 8 characters long' })
        .max(12, { error: 'Password must be less than 12 characters' }).optional(),
    roles: z.array(z.string({ message: 'Role is required' })).min(1, { message: 'At least one role is required' }).optional(),
});