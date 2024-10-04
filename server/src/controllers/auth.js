import * as authService from "../services/auth";

export const register = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    if (!name || !phone || !email || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing Inputs!",
      });

    const response = await authService.registerService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + e.message,
    });
  }
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    if (!identifier || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing Inputs!",
      });

    const response = await authService.loginService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + e.message,
    });
  }
};
