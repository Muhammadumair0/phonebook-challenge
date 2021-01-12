import { Exception } from "./Exception";
import * as HttpStatus from "http-status-codes";

export class Success {
  constructor(message?: string, data: any = null) {
    const responseObject: any = {
      status: HttpStatus.OK,
      name: "Success",
      message,
    };
    if (data) responseObject.data = data;
    return responseObject;
  }
}
