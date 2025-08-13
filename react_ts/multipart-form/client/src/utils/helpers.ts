export function validateEmail(email: string): boolean {
    return (/^\S+@\S+\.\S+$/.test(email))
}

export function validatePassword(password: string): boolean {
    // Regex Explanation:
    // ^                                  # start of string
    // (?=.*[a-z])                        # must contain at least one lowercase
    // (?=.*[A-Z])                        # must contain at least one uppercase
    // (?=.*\d)                           # must contain at least one digit
    // (?=.*[@$!%*?&])                    # must contain at least one special character
    // [A-Za-z\d@$!%*?&]{8,}               # allowed characters, length of at least 8
    // $                                  # end of string
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

export function validatePhoneNumber(phoneNo: number): boolean {
    return /^\d{10}$/.test(phoneNo.toString())
}