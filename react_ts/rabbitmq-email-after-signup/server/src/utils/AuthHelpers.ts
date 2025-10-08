import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

export function signAccessToken(payload: object): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(payload: object): string {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): any {
  return jwt.verify(token, ACCESS_SECRET);
}

// export function verifyRefreshToken(token: string): any {
//   return jwt.verify(token, REFRESH_SECRET);
// }

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function passwordCompare(password: string, hash: string): Promise<Boolean>{
    return await bcrypt.compare(password, hash);
}

export function verifyRefreshToken(token: string): any {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    return decoded; // contains { userId, iat, exp }
  } catch (error: any) {
    throw new Error("Invalid or expired refresh token");
  }
}