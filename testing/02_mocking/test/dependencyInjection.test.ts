import { registerUser, sendOtp } from "../src/utils/userService.util"

describe('Testing registerUser using DI', () => {

    // In the test, we pass a fake mailer created with jest.fn().
    // We control its output: .mockReturnValue("Mocked Email"). 
    // We can observe how it was used: toHaveBeenCalledWith(...).

    test("registerUser calls mailer with subject & body", () => {
        const mailerMockFunc = jest.fn().mockReturnValue("User Registered");

        const email = 'amrik.bhadra@gmail.com';
        const subject = 'test email';
        const body = 'test email dont reply';
        const result = registerUser(email, subject, body, mailerMockFunc);

        expect(mailerMockFunc).toHaveBeenCalledWith(email, subject, body);
        expect(result).toBe("User Registered");
    });
});


describe.only('Testing asynchronous function having DI', ()=>{
    test('registerUser calls async mailer with subject & body', async() => {
        const mailerMock = jest.fn().mockResolvedValue('OTP Sent!');
        const email = 'amrik.bhadra@gmail.com';
        const subject = 'OTP for Login';
        const body = 'Your OTP for login is 4543';
        const result = await sendOtp(email, mailerMock);

        expect(result).toBe('OTP Sent!');
    });
});
