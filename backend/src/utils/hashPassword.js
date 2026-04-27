import bcryptjs from "bcryptjs";

export const hashPassword = async (password) => {
  const salts = await bcryptjs.genSalt(12);
  const hash = await bcryptjs.hash(password, salts);

  return hash;
};
