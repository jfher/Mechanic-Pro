import z from "zod";
import { ProcessType } from "../../generated/prisma/enums";

export const processCreateSchema = z.object({
    type: z.enum(ProcessType, { message: 'Brand is required' }),
    date: z.string({ message: 'Start date is required' }).transform((value) => new Date(value)),
    operatorId: z.string({ message: 'Operator ID is required' }).uuid({ message: 'Operator ID is not valid' }),
    vehicleId: z.string({ message: 'Vehicle ID is required' }).uuid({ message: 'Vehicle ID is not valid' }),
});


export const processUpdateSchema = z.object({
    type: z.enum(ProcessType, { message: 'Brand is required' }).optional(),
    date: z.string({ message: 'Start date is required' }).transform((value) => new Date(value)).optional(),
    operatorId: z.string({ message: 'Operator ID is required' }).uuid({ message: 'Operator ID is not valid' }).optional(),
    vehicleId: z.string({ message: 'Vehicle ID is required' }).uuid({ message: 'Vehicle ID is not valid' }).optional(),
});