import type { ProcessType } from "../../generated/prisma/enums";

export type CreateProcessDTO = {
    date: string;
    type: ProcessType;
    operatorId: string;
    vehicleId: string;
};

export type UpdateProcessDTO = {
    date?: string;
    type?: ProcessType;
    operatorId?: string;
    vehicleId?: string;
};
