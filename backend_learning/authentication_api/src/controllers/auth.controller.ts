import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.services";
import { env } from "../config/env";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
const userService = new AuthService();

const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: env.NODE_ENV === 'production',
    domain: env.COOKIE_DOMAIN,
};

export const register = asyncHandler(async (req: Request, res: Response) => {
    const userData = registerSchema.parse(req.body);
    const user = await userService.register(userData);
    res.status(201).json({ user, message: 'Registration successful!' })
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const userData = loginSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await userService.login(userData);

    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: ms('1h') });
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: ms('7d') });

    res.json({ user, message: 'Login successful!' });
});


export const logout = asyncHandler(async (req: Request, res: Response) => {
    const accessToken = String(req.cookies.accessToken) || undefined;
    console.log('i am here');
    if (accessToken) {
        try {
            console.log('i am inside');
            const payload = jwt.verify(accessToken, env.JWT_ACCESS_SECRET) as { id: string };
            await userService.logout(payload.id);
            console.log('exiting try');
        } catch (error) {
            console.log(error)
        }

        res.clearCookie('accessToken', cookieOptions);
        res.clearCookie('refreshToken', cookieOptions);
        res.status(200).json({ message: 'Logout successful!' });
    }
});

export const me = asyncHandler(async (req: Request, res: Response) => {
    // protected route - req.user populated by requireAuth
    res.json({ user: (req as any).user });
});


export const refresh = asyncHandler(async (req: Request, res: Response) => {
    const rt = req.cookies.refreshToken as string | undefined;
    if (!rt) throw new Error('No refresh token');

    const { accessToken, refreshToken, user } = await userService.rotateRefresh(rt);

    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: ms('15m') });
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: ms('7d') });

    res.json({ user });
});


function ms(ttl: string) {
    // accept forms '15m', '7d', '3600' (seconds) — simple parser
    if (ttl.endsWith('m')) return parseInt(ttl) * 60 * 1000;
    if (ttl.endsWith('h')) return parseInt(ttl) * 60 * 60 * 1000;
    if (ttl.endsWith('d')) return parseInt(ttl) * 24 * 60 * 60 * 1000;
    const s = Number(ttl);
    if (!isNaN(s)) return s * 1000;
    return 0;
}