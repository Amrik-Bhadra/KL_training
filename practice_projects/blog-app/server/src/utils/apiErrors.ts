export class ApiError extends Error {
    statusCode: number;
    details?: any;

    constructor(statusCode = 500, message = 'Something went wrong', details?: any){
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}