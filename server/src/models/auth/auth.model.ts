import { prisma } from "../../configs/prisma";

const createSession = (data: {
    userId: string;
    refreshToken: string;
    expiresAt: Date;
}) => {
    return prisma.session.create({ data });
};

const findSessionByToken = (refreshToken: string) => {
    return prisma.session.findFirst({
        where: { refreshToken }
    });
};

const deleteSession = (id: string) => {
    return prisma.session.delete({
        where: { id }
    });
};

const deleteSessionByToken = (refreshToken: string) => {
    return prisma.session.deleteMany({
        where: { refreshToken }
    });
};

export const sessionModel = {
    createSession,
    findSessionByToken,
    deleteSession,
    deleteSessionByToken,
}