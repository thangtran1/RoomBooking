import * as service from "../services/user";

export const getCurrent = async (req, res) => {
  const user = req.user;
  const userId = user?.id;

  if (!userId) {
    return res.status(400).json({
      err: 1,
      msg: "User ID not found in token",
    });
  }

  try {
    const response = await service.getOne(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + e,
      e,
    });
  }
};
