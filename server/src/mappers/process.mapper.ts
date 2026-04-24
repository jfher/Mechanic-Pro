export const toProcessResponse = (process: any) => ({
    id: process.id,
    date: process.date,
    type: process.type,
    description: process.description,
    vehicleId: process.vehicleId,
    operatorId: process.operatorId,
    createdAt: process.createdAt,
});