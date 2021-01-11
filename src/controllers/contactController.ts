import { NextFunction, Request, Response } from "express";
import { knex } from "../db/knex";
import { BadRequest } from "../responseHandlers";
import { v4 as uuidv4 } from "uuid";

export class ContactController {
  public async getAllContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        sortField = "creation_stamp",
        sortOrder = "desc",
        offset = 0,
        limit = 50,
      }: any = req.params;

      const contacts = await knex("contacts")
        .orderBy(sortField, sortOrder)
        .offset(offset)
        .limit(limit);

      res.send(contacts);
    } catch (e) {
      res.send(new BadRequest(e));
    }
  }

  public async createContact(req: Request, res: Response, next: NextFunction) {
    try {
      req.checkBody({
        name: {
          notEmpty: true,
          errorMessage: "Name is required",
        },
        work_phone: {
          notEmpty: true,
          errorMessage: "Work phone is required",
        },
        home_phone: {
          notEmpty: true,
          errorMessage: "Home phone is required",
        },
        other_phone: {
          notEmpty: false,
          errorMessage: "Other phone is optional",
        },
        email: {
          notEmpty: true,
          errorMessage: "Email is required",
        },
        mailing_address: {
          notEmpty: true,
          errorMessage: "Mailing address is required",
        },
      });

      const validateResults: any = await req.getValidationResult().catch(next);

      if (validateResults.array().length > 0) {
        return next(new BadRequest(validateResults.array()[0].msg));
      }

      const contactId = await knex("contact")
        .returning("id")
        .insert({
          id: uuidv4(),
          ...req.body,
        });

      res.send({
        id: contactId,
        message: "Contact successfully created!",
      });
    } catch (e) {
      res.send(new BadRequest(e));
    }
  }
}
