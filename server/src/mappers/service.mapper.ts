export const toServiceResponse = (service: any) => ({
    id: service.id,
    name: service.name,
    description: service.description,
    price: service.price,
    startDate: service.startDate,
    endDate: service.endDate,
    status: service.status,
    operatorId: service.operatorId,
    historyId: service.historyId,
    createdAt: service.createdAt,
    updatedAt: service.updatedAt,
    operator: service.operator.name,
});