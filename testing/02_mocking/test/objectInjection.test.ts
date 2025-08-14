interface Mailer {
    send(to: string, subject: string, body: string): Promise<string>
}

async function sendMail(email: string, subject: string, body: string, mailer: Mailer) {
    return mailer.send(email, subject, body);
}


test("sendMail uses mailer having object/method injection", async () => {
    const mailerMock: Mailer = {
        send: jest.fn().mockResolvedValue('Mail Sent!')
    }

    const email = 'amrik.bhadra@gmail.com';
    const subject = 'test email sent'
    const body = 'this is test email dont reply';

    const result: string = await sendMail(email, subject, body, mailerMock);
    expect(result).toBe("Mail Sent!");
    expect(mailerMock.send).toHaveBeenCalledWith(email, subject, body);
});