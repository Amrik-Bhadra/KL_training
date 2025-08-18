export class ApiError extends Error {
  public status: number;
  public meta?: any;

  constructor(status: number, message: string, meta?: any) {
    super(message);
    this.status = status;
    this.meta = meta;

    // Required when extending built-ins like Error
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}
