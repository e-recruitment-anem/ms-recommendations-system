//  ==============================================================================
//  Errors
//  ==============================================================================
export class ApiError extends Error {
  name: string;
  statusCode: number;
  isOperational: boolean;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'Error';
    this.statusCode = 400;
    this.isOperational = true;
    Error.captureStackTrace(this);
  }
}
