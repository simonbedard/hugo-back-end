import { Response } from 'express';
import { response_status_codes } from './model';

export function successResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        STATUS: 'SUCCESS',
        MESSAGE: message,
        DATA: DATA
    });
}

export function unauthorizedRequest(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.unauthorized).json({
        STATUS: 'Unauthorized',
        MESSAGE: message,
        DATA: DATA
    });
}
export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA: DATA
    });
}

export function insufficientParameters(res: Response) {
    (Object.keys(res.req.body).length === 0) ? console.log('empty') : console.log('no empty');

    res.status(response_status_codes.bad_request).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters',
        DATA: {
            body: !(Object.keys(res.req.body).length === 0) ? res.req.body : "Oups the body of the request look empty to me"
        }
    });
}

export function mongoError(err: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        STATUS: 'FAILURE',
        MESSAGE: 'MongoDB error',
        DATA: err
    });
}

/**
 * Send mail services
 */
