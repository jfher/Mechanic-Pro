export const toRoleResponse = (role: any) => ({
    id: role.id,
    name: role.name,
    createdAt: role.createdAt,
});