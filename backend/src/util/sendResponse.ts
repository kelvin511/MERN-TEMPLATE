import { Response } from 'express';

const sendResponse = (res: Response, message: string, data?: unknown, statusCode: number = 200): void => {
    const responseObj = {
        success: true,
        message,
        data
    };
    res.status(statusCode).json(responseObj);
};

export default sendResponse;
