export type CreateVehicleDTO = {
    brand: string;
    model: string;
    year: string;
    plate: string;
    color: string;
    ownerId: string;
};

export type UpdateVehicleDTO = {
    brand?: string;
    model?: string;
    year?: string;
    plate?: string;
    color?: string;
    ownerId?: string;
};
