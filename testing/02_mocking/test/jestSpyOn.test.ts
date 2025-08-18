function sendEmail(to: string): string {
    return `Email sent to ${to}`;
}

async function registerUser(email: string){
    return sendEmail(email);
}


describe("register with spyOn", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should mock sendEmail", ()=>{
        cosnt 
    })
})