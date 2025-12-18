import { Request, Response, NextFunction } from 'express';
import ApiError from '../util/api.error';
import { EHttpStrictCode, EHttpMessages, EApplicationEnvironment } from '../constants/application';
import logger from '../util/logger';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || EHttpStrictCode.INTERNAL_SERVER_ERROR;
    let message = err.message || EHttpMessages.Something_Went_Wrong;
    let data = err.data || null;

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        data,
        stack: process.env.NODE_ENV === EApplicationEnvironment.DEVELOPMENT ? err.stack : undefined
    });
    logger.error({message:err.message,stack:err.stack,})
};

export default globalErrorHandler;
