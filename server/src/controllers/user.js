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
      msg: "Failed at user controller: " + e,
      e,
    });
  }
};

//  export const getCurrent = async (req, res) => {
//   const { id } = req.user;
//   try {
//     const response = await service.getOne(id);
//     return res.status(200).json(response);
//   } catch (e) {
//     return res.status(500).json({
//       err: -1,
//       msg: "Failed at category controller: " + e,
//       e,
//     });
//   }
// };

export const updateUser = async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  try {
    if (!payload)
      return response.status(400).json({
        err: 1,
        msg: "Thiếu payload",
      });
    const response = await service.updateUser(id, payload);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + e,
      e,
    });
  }
};
