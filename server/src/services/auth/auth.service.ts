import bcrypt from "bcrypt";
import { sessionModel } from "../../models/auth/auth.model";
import { generateTokens } from "../../lib/auth.utils";
import { userModel } from "../../models/user.model";


const loginUser = async (email: string, password: string) => {
    const user = await userModel.findByEmail(email);

    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new Error("Invalid credentials");

    const { accessToken, refreshToken } = generateTokens(user.id);

    await sessionModel.createSession({
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { user, accessToken, refreshToken };
};

const refreshTokenService = async (token: string) => {
    const session = await sessionModel.findSessionByToken(token);

    if (!session) throw new Error("Invalid session");

    await sessionModel.deleteSession(session.id);

    const { accessToken, refreshToken } = generateTokens(session.userId);

    await sessionModel.createSession({
        userId: session.userId,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { accessToken, refreshToken };
};

const logoutService = async (token: string) => {
    await sessionModel.deleteSessionByToken(token);
};

export const authService = {
    loginUser,
    refreshTokenService,
    logoutService,
}