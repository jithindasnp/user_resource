import { generateTokens } from "../../../utils/token.js";
import User from "../../../models/userModel.js";
import bcrypt from "bcryptjs"

const loginService = async (credentials, res) => {
  try {
    let { email, password } = credentials;
    let userData = await User.findOne({ email }, "password");
    if (!userData) {
      return res.status(404).json({
        message: "Please check the email",
        statusCode: 404,
        data: {},
      });
    }
    let passwordCheck = await bcrypt.compare(password, userData.password);
    if (!passwordCheck)
      return res.status(404).json({
        message: "Please check the password",
        statusCode: 404,
        data: {},
      });
    let tokens = await generateTokens(userData.email, userData.id);
    return res.status(200).json({
      statusCode: 200,
      message: "Successfully signed in.",
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ statusCode: 500, message: "Internal error" });
  }
};



export default {
  loginService,
};
