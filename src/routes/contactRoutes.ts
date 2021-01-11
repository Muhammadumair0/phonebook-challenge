import { Router } from "express";
import { AuthController } from "../auth/authController";
import { ContactController } from "../controllers/contactController";

export class ContactRoutes {
  router: Router;
  public contactController: ContactController = new ContactController();
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.post("/all", this.authController.authorizeJWT,this.contactController.getAllContacts);
  }
}
