import passport from "passport";
import passportLocal from "passport-local";
// import passportApiKey from "passport-headerapikey";
import passportJwt from "passport-jwt";
import {  } from "../models/user";
import { JWT_SECRET } from "../util/secrets";


const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
}));

passport.use(new JwtStrategy());


