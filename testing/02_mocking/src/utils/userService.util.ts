// here dependency injection is happening:
// no email library is imported rather mailer is passed as parameter to function
// mailer is a dependency

type Mailer = (to: string, subject: string, body: string) => string;

export function registerUser(email: string, subject: string, body: string, mailer: Mailer) {
    return mailer(email, subject, body);
}

type otpMailer = (to: string, body: string, subject?: string, ) => string;

export async function sendOtp(email: string, mailer: otpMailer) {
    const otp = 4543;
    const body: string = `Your OTP for login is ${otp}` ;

    return mailer(email, 'OTP for Login', body);
}