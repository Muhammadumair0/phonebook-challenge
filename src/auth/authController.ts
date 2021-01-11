import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/secrets";
import {
  BadRequest,
  UnauthorizedError,
} from "../exceptions";

export class AuthController {
  public async authorizeJWT(req: Request, res: Response, next: NextFunction) {
    try {
      req.checkHeaders({
        authorization: {
          notEmpty: true,
          errorMessage: "Auth token is required",
        },
      });

      const validateResults = await req.getValidationResult();

      if (validateResults.array().length > 0) {
        return next(new BadRequest(validateResults.array()[0].msg));
      }

      const { authorization } = req.headers;

      const existingUser = jwt.verify(authorization, JWT_SECRET);

      if (!existingUser) {
        return next(new UnauthorizedError("Wrong Auth token"));
      }

      next();
    } catch (e) {
      res.send(new UnauthorizedError(e));
    }
  }
}
