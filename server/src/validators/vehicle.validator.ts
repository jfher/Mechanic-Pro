import z from "zod";

export const vehicleCreateSchema = z.object({
    brand: z.string({ message: 'Brand is required' })
        .min(3, { error: 'Brand must have at least 3 characters' })
        .max(20, { error: 'Brand must have less than 20 characters' }),
    model: z.string({ message: 'Model is required' })
        .min(3, { error: 'Model must have at least 3 characters' })
        .max(20, { error: 'Model must have less than 20 characters' }),
    year: z.string({ message: 'Year is required' })
        .min(4, { error: 'Year must be at least 4 characters long' })
        .max(4, { error: 'Year must be less than 4 characters' }),
    plate: z.string({ message: 'Plate is required' })
        .min(7, { error: 'Plate must be at least 7 characters long' })
        .max(7, { error: 'Plate must be less than 7 characters' }),
    color: z.string({ message: 'Color is required' })
        .min(3, { error: 'Color must have at least 3 characters' })
        .max(20, { error: 'Color must have less than 20 characters' }),
    ownerId: z.string({ message: 'Owner ID is required' }).uuid({ message: 'Owner ID is not valid' }),
});


export const vehicleUpdateSchema = z.object({
    brand: z.string({ message: 'Brand is required' })
        .min(3, { error: 'Brand must have at least 3 characters' })
        .max(20, { error: 'Brand must have less than 20 characters' }).optional(),
    model: z.string({ message: 'Model is required' })
        .min(3, { error: 'Model must have at least 3 characters' })
        .max(20, { error: 'Model must have less than 20 characters' }).optional(),
    year: z.string({ message: 'Year is required' })
        .min(4, { error: 'Year must be at least 4 characters long' })
        .max(4, { error: 'Year must be less than 4 characters' }).optional(),
    plate: z.string({ message: 'Plate is required' })
        .min(7, { error: 'Plate must be at least 7 characters long' })
        .max(7, { error: 'Plate must be less than 7 characters' }).optional(),
    color: z.string({ message: 'Color is required' })
        .min(3, { error: 'Color must have at least 3 characters' })
        .max(20, { error: 'Color must have less than 20 characters' }).optional(),
    ownerId: z.string({ message: 'Owner ID is required' }).uuid({ message: 'Owner ID is not valid' }).optional(),
});