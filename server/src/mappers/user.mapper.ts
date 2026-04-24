export const toUserResponse = (user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    roles: user.userRoles.map((r: any) => ({
        id: r.role.id,
        name: r.role.name,
    })),
});

export const toUserListResponse = (users: any[]) => {
    return users.map((user) => toUserResponse(user));
};