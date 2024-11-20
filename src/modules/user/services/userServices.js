import User from "../../../models/userModel.js";
import bcrypt from "bcryptjs";

const addUserService = async (body, res) => {
  const { name, email, password, age } = body;

  try {
    const isExists = await User.findOne({ email });
    if (isExists) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email already exists!",
        data: {},
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age,
    });

    await newUser.save();

    return res.status(201).json({
      statusCode: 201,
      message: "User successfully registered",
      data: { name, email },
    });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ statusCode: 500, message: "Internal error" });
  }
};

const deleteUserService = async (params, res) => {
  const { id } = params;

  try {
    const isExists = await User.findById(id);
    if (!isExists) {
      return res.status(404).json({
        statusCode: 404,
        message: "User doesn't exists!",
        data: {},
      });
    }

    const deleted = await User.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).json({
        statusCode: 200,
        message: "User deleted",
        data: {},
      });
    }
    return res.status(400).json({
      statusCode: 400,
      message: "Failed to delete user",
      data: {},
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error" });
  }
};

const getUserService = async (params, res) => {
  const { id, name, email, age } = params;

  try {
    const userData = await User.findById(id).select({ name: 1, email: 1, age: 1 });
    if (!userData) {
      return res.status(404).json({
        statusCode: 404,
        message: "User doesn't exists!",
        data: {},
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "User fetched successfully",
      data: userData,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error" });
  }
};

const listUserService = async (params, res) => {

  try {
    const userData = await User.find().select({ name: 1, email: 1, age: 1 });
    if (!userData) {
      return res.status(404).json({
        statusCode: 404,
        message: "User doesn't exists!",
        data: {},
      });
    }
    let userDataWithSl = userData.map((data, index) => {
      return { slNo: index + 1, ...data };
    });

    return res.status(200).json({
      statusCode: 200,
      message: "User list fetched successfully",
      data: userDataWithSl,
    });
  } catch (err) {
    console.error("Error fetching user list:", err);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error" });
  }
};

const updateUserService = async (params, body, res) => {
  const { id } = params;

  const { name, email, age } = body;

  try {
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({
        statusCode: 404,
        message: "User doesn't exists!",
        data: {},
      });
    }
    const updateUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true, runValidators: true }
    ).select({ name: 1, email: 1, age: 1 });
    if (updateUser) {
      return res.status(200).json({
        statusCode: 200,
        message: "User updated successfully",
        data: updateUser,
      });
    }
    return res.status(400).json({
      statusCode: 400,
      message: "Failed to update user",
      data: {},
    });
  } catch (err) {
    console.error("Error updating user:", err);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error" });
  }
};

export default {
  addUserService,
  deleteUserService,
  getUserService,
  updateUserService,
  listUserService
};
