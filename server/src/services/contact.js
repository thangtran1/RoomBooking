import db from "../models";

export const createContact = async (req, res) => {
  try {
    const { name, phone, content } = req.body;

    if (!name || !phone || !content) {
      return res.status(400).json({ msg: "Missing required fields!" });
    }

    const newContact = await db.Contact.create({ name, phone, content });

    return res
      .status(201)
      .json({ msg: "Contact created successfully!", data: newContact });
  } catch (e) {
    console.error("Error:", e); // Ghi lại lỗi chi tiết
    return res
      .status(500)
      .json({ msg: `Failed to create contact: ${e.message}` });
  }
};

export const getAllContactService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Contact.findAll({
        raw: true,
      });
      resolve({
        err: 0,
        msg: response ? "OK" : "Failed to get contact.",
        response,
      });
    } catch (e) {
      reject({
        err: -1,
        msg: `Failed at contact service: ${e.message}`,
      });
    }
  });

export const updateContactService = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const [updated] = await db.Contact.update(data, {
        where: { id },
      });
      if (updated) {
        const updatedContact = await db.Contact.findOne({ where: { id } });
        resolve({
          err: 0,
          msg: "Contact updated successfully.",
          response: updatedContact,
        });
      } else {
        resolve({
          err: 1,
          msg: "Contact not found.",
        });
      }
    } catch (e) {
      reject({
        err: -1,
        msg: `Failed at contact service: ${e.message}`,
      });
    }
  });

export const deleteContactService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const deleted = await db.Contact.destroy({
        where: { id },
      });
      if (deleted) {
        resolve({
          err: 0,
          msg: "Contact deleted successfully.",
        });
      } else {
        resolve({
          err: 1,
          msg: "Contact not found.",
        });
      }
    } catch (e) {
      reject({
        err: -1,
        msg: `Failed at contact service: ${e.message}`,
      });
    }
  });
