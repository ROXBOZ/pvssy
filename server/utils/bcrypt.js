import bcrypt from "bcrypt";

const passwordEncryption = async (userPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(userPassword, salt);
  return hashedPassword;
};

const verifyPassword = async (userPassword, hashedPassword) => {
  const result = await bcrypt.compare(userPassword, hashedPassword);
  return result;
};

export { passwordEncryption, verifyPassword };
