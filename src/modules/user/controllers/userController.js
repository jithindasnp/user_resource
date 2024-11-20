import userServices from "../services/userServices.js";

const addUser = async (req, res) => {
  try {
    const addUserResponse = await userServices.addUserService(req.body, res);
    return addUserResponse;
  } catch (error) {
    console.log("error", error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const deleteUserResponse = await userServices.deleteUserService(
      req.params,
      res
    );
    return deleteUserResponse;
  } catch (error) {
    console.log("error", error);
  }
};
const updateUser = async (req, res) => {
  try {
    const updateUserResponse = await userServices.updateUserService(
      req.params,
      req.body,
      res
    );
    return updateUserResponse;
  } catch (error) {
    console.log("error", error);
  }
};
const getUser = async (req, res) => {
  try {
    const getUserResponse = await userServices.getUserService(req.params, res);
    return getUserResponse;
  } catch (error) {
    console.log("error", error);
  }
};
const listUser = async (req, res) => {
  try {
    const listUserResponse = await userServices.listUserService(req.params, res);
    return listUserResponse;
  } catch (error) {
    console.log("error", error);
  }
};

export default { addUser, deleteUser, updateUser, getUser,listUser };
