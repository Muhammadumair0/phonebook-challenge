import bcrypt from "bcrypt-nodejs";

export interface IUser extends Document {
  username: string;
  password: string;
}

export const genSalt = (password: string) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return err; }
    bcrypt.hash(password, salt, undefined, (err: Error, hash) => {
      if (err) { return err; }
      password = hash;
    });
  });
} 

export const comparePassword = function (candidatePassword: string, callback: any) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    callback(err, isMatch);
  });
};
