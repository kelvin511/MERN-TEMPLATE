export enum EApplicationEnvironment {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development'
}

export enum EHttpMessages {
    OK = 'OK',
    CREATED = 'CREATED',
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    This_Action_Is_Forbidden = 'This Action Is Forbidden',
    Resource_Not_Found = 'Resource Not Found',
    Something_Went_Wrong = 'Something Went Wrong',
    USER_NOT_FOUND="User not found",
    WRONG_PASSWORD="Password is wrong"
}

export enum EHttpStrictCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}
