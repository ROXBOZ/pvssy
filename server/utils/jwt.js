import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const generateToken = (userId) => {
  const payload = { sub: userId };
  const options = {
    expiresIn: "2d",
    issuer: "Pvssy Talk",
  };

  //FIXME + CHANGE ME
  const privateKey = "something";
  const token = jwt.sign(payload, privateKey, options);
  return token;
};

export default generateToken;
