import bcrypt from "bcrypt";
import { generateTokens } from "../../lib/auth.utils";
import { sessionRepository } from "../../repositories/auth/auth.repository";
import { ConflictError, NotFoundError } from "../../errors/types";
import { userRepository } from "../../repositories/user.repository";


const loginUser = async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new NotFoundError("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new ConflictError("Invalid Credentials");

    const { accessToken, refreshToken } = generateTokens(user.id);

    await sessionRepository.createSession({
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { user, accessToken, refreshToken };
};

const refreshTokenService = async (token: string) => {
    const session = await sessionRepository.findSessionByToken(token);
    if (!session) throw new NotFoundError("Invalid session");

    await sessionRepository.deleteSession(session.id);

    const { accessToken, refreshToken } = generateTokens(session.userId);

    await sessionRepository.createSession({
        userId: session.userId,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { accessToken, refreshToken };
};

const logoutService = async (token: string) => {
    await sessionRepository.deleteSessionByToken(token);
};

export const authService = {
    loginUser,
    refreshTokenService,
    logoutService,
}