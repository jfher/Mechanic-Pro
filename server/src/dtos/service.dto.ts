import type { Status } from "../../generated/prisma/enums";

export type CreateServiceDTO = {
    name: string;
    description: string;
    price: number;
    startDate: Date;
    endDate: Date;
    status: Status;
    operatorId: string;
    historyId: string;
};

export type UpdateServiceDTO = {
    name?: string;
    description?: string;
    price?: number;
    startDate?: Date;
    endDate?: Date;
    status?: Status;
    operatorId?: string;
    historyId?: string;
};
