import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let accessTokenSecret = process.env.JWT_SECRET;
let accessExpiry = process.env.JWT_ACCESS_EXPIRY;

let refreshTokenSecret = process.env.REFRESH_JWT_SECRET;
let refreshExpiry = process.env.REFRESH_EXPIRY;

export const encrypt = async (data, key) => {
  const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
  return encryptedData;
};

export const decrypt = async (encryptedData, key) => {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, key).toString(
    CryptoJS.enc.Utf8
  );
  return decryptedData;
};

export const generateTokens = async (email, id) => {
  try {
    let encryptEmail = await encrypt(email, process.env.CRYPTO_SECRET);
    let accessToken = jwt.sign({ email: encryptEmail }, accessTokenSecret, {
      expiresIn: accessExpiry,
    });
    let refreshToken = jwt.sign({ email: encryptEmail }, refreshTokenSecret, {
      expiresIn: refreshExpiry,
    });
    return { accessToken, refreshToken };
  } catch (err) {
    console.log({ err });
    return false;
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    let accessToken = authHeader.split(" ")[1];

    let verify = jwt.verify(accessToken, accessTokenSecret);
    if (verify) {
      let decryptedEmail = await decrypt(
        verify.email,
        process.env.CRYPTO_SECRET
      );
      verify.email = decryptedEmail;
      req.user = verify;
      next();
    }
  } catch (err) {
    console.log({ err });
    if (err.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ statusCode: 403, message: "Token expired" });
    }

    return res
      .status(403)
      .json({ statusCode: 403, message: "Token expired !!!" });
  }
};
