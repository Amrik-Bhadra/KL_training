export function generateOTP(): { otp: string, expiry: Date } {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    return { otp, expiry };
}