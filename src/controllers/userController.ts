import bcrypt from "bcrypt-nodejs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/secrets";
import { BadRequest } from "../responseHandlers";
import { knex } from "../db/knex";

export class UserController {
  public async loginUser(req: any, res: Response, next: NextFunction) {
    req.checkBody({
      email: {
        notEmpty: true,
        errorMessage: "Email is required",
      },
      password: {
        notEmpty: true,
        errorMessage: "Password is required",
      },
    });

    const validateResults: any = await req.getValidationResult().catch(next);

    if (validateResults.array().length > 0) {
      return next(new BadRequest(validateResults.array()[0].msg));
    }

    const { email, password } = req.body;

    const [loggedIn] = await knex("users").where({
      email,
      password,
    });

    if (!loggedIn) {
      return next(new BadRequest("Wrong email or password"));
    }

    const token = jwt.sign(
      {
        id: loggedIn.id,
        email: loggedIn.email,
      },
      JWT_SECRET as string,
      { expiresIn: 60 * 2880 } // expire in 2 days
    );

    res.send({
      user: {
        id: loggedIn.id,
        email: loggedIn.email,
      },
      accessToken: token,
    });
  }
}
