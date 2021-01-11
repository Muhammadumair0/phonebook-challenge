import bcrypt from "bcrypt-nodejs";
import { knex } from "../db/knex";

export interface IUser extends Document {
  username: string;
  password: string;
}

export const genSalt = (password: string) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return err;
    }
    bcrypt.hash(password, salt, undefined, (err: Error, hash) => {
      if (err) {
        return err;
      }
      password = hash;
    });
  });
};

export const comparePassword = async (name: string, password: string) => {
  const [dbUserPassword] = await knex("users")
    .select("password")
    .where({ name });

  const match = bcrypt.compareSync(password, dbUserPassword);

  if (match) {
    // login
  }

  // ...
};
