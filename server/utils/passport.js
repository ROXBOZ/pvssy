import * as dotenv from "dotenv";
dotenv.config();
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../models/userModel.js  ";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.privateKey,
};

const jwtStrategy = new JwtStrategy(options, function (jwt_payload, done) {
  userModel.findOne({ _id: jwt_payload.sub }, function (error, user) {
    if (error) {
      return done(error, false);
    }
    if (user) {
      console.log("sending user");
      return done(null, user);
    } else {
      console.log("no user found");
      return done(null, false);
    }
  });
});

export default jwtStrategy;
