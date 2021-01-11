import { Exception } from "./Exception";
import * as HttpStatus from "http-status-codes";

export const Success = (message?: string, data?: any) => {
    return {
        status: HttpStatus.OK,
        name: 'Success',
        message,
        data
    }
}