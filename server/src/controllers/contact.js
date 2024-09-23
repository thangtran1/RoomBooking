import * as service from "../services/contact";
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
    console.error("Error:", e);
    return res
      .status(500)
      .json({ msg: `Failed to create contact: ${e.message}` });
  }
};

export const getAllContact = async (req, res) => {
  try {
    const response = await service.getAllContactService();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: `Failed at contact controller: ${e.message}`,
    });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params; // Lấy id từ params
  const { name, phone, content } = req.body;

  try {
    const response = await service.updateContactService(id, {
      name,
      phone,
      content,
    });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: `Failed at contact controller: ${e.message}`,
    });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await service.deleteContactService(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: `Failed at contact controller: ${e.message}`,
    });
  }
};
