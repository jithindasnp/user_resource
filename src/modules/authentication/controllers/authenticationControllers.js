import authenticationServices from "../services/authenticationServices.js";

const login = async (req, res) => {
  try {
    const loginResponse = await authenticationServices.loginService(
      req.body,
      res
    );
    return loginResponse;
  } catch (error) {
    console.log("error", error);
  }
};




export default { login };
