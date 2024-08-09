import {CustomError} from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Route Not Found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }


    serializeErrors(): { message: string; field?: string }[] {
        return [{message: 'Not Found'}];
    }
}