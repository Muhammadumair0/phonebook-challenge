import { NextFunction, Request, Response } from "express";
import { knex } from "../db/knex";
import { BadRequest } from "../exceptions";

export class ContactController {
  public async getAllContacts(req: Request, res: Response, next: NextFunction) {
   
    const contacts = await knex('contacts');

    res.send('done')

  }
}
