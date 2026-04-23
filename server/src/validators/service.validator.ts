import z from "zod";
import { Status } from "../../generated/prisma/enums";

export const serviceCreateSchema = z.object({
    name: z.string({ message: 'Name is required' })
        .min(3, { error: 'Name must have at least 3 characters' })
        .max(20, { error: 'Name must have less than 20 characters' }),
    description: z.string({ message: 'Description is required' })
        .min(3, { error: 'Description must have at least 3 characters' })
        .max(20, { error: 'Description must have less than 20 characters' }),
    price: z.number({ message: 'Price is required' }).gt(0, { message: 'Price must be greater than 0' }).lt(10000, { message: 'Price must be less than 10000' }),
    startDate: z.string({ message: 'Start date is required' }).transform((value) => new Date(value)),
    endDate: z.string({ message: 'End date is required' }).transform((value) => new Date(value)).optional(),
    status: z.enum(Status, { message: 'Status is required' }),
    operatorId: z.string({ message: 'Operator ID is required' }).uuid({ message: 'Operator ID is not valid' }),
    historyId: z.string({ message: 'History ID is required' }).uuid({ message: 'History ID is not valid' }),
});


export const serviceUpdateSchema = z.object({
    name: z.string({ message: 'Name is required' })
        .min(3, { error: 'Name must have at least 3 characters' })
        .max(20, { error: 'Name must have less than 20 characters' }).optional(),
    description: z.string({ message: 'Description is required' })
        .min(3, { error: 'Description must have at least 3 characters' })
        .max(20, { error: 'Description must have less than 20 characters' }).optional(),
    price: z.number({ message: 'Price is required' }).gt(0, { message: 'Price must be greater than 0' }).lt(10000, { message: 'Price must be less than 10000' }).optional(),
    startDate: z.string({ message: 'Start date is required' }).transform((value) => new Date(value)).optional(),
    endDate: z.string({ message: 'End date is required' }).transform((value) => new Date(value)).optional(),
    status: z.enum(Status, { message: 'Status is required' }).optional(),
    operatorId: z.string({ message: 'Operator ID is required' }).uuid({ message: 'Operator ID is not valid' }).optional(),
    historyId: z.string({ message: 'History ID is required' }).uuid({ message: 'History ID is not valid' }).optional(),
});