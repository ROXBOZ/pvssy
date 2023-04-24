import { contactModel } from "../models/contactModel.js";

const getAllContacts = async (req, res) => {
  try {
    const allContacts = await contactModel.find({}).exec();
    res.status(200).json({
      number: allContacts.length,
      allContacts,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Problème serveur",
    });
  }
};
const addContact = async (req, res) => {
  const { name, address, city, region, specialities } = req.body;

  try {
    const newContact = new contactModel({
      name,
      address,
      city,
      region,
      specialities,
    });
    const savedContact = await newContact.save();

    res.status(201).json({
      msg: "new contact added successfully",
      contact: {
        name: savedContact.name,
        address: savedContact.address,
        city: savedContact.city,
        region: savedContact.region,
        specialities: savedContact.specialities,
      },
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "you can't add a new contact",
    });
  }
};

export { getAllContacts, addContact };
