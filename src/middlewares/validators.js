import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";

const userValid = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return Promise.reject("Email already in use");
      }
    }),

  body("age")
    .toInt()
    .isInt({ min: 0 })
    .withMessage("Age must be a positive integer"),
];

const userCheckValid = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format"),

  body("age")
    .toInt()
    .isInt({ min: 0 })
    .withMessage("Age must be a positive integer"),
];

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let message = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    return res.status(400).json({
      statusCode: 400,
      message,
      errors: errors.array(),
    });
  }
  next();
};

export default { userValidator: [...userValid, errorHandler],userCheckValidator:[...userCheckValid, errorHandler] };
