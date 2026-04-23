export const toVehicleResponse = (vehicle: any) => ({
    id: vehicle.id,
    brand: vehicle.brand,
    model: vehicle.model,
    plate: vehicle.plate,
    owner: vehicle.owner?.name,
    createdAt: vehicle.createdAt,
});