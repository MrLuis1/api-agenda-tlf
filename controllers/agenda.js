const { response } = require("express");
const Contacto = require('../models/contac')

const getContact = async ( req, res = response) => {
    const query = { estado: true };

    const [ total, contactos ] = await Promise.all([
        Contacto.countDocuments(query),
        Contacto.find(query)
    ]);

    res.status(200).json({
        total,
        contactos
    });
};

const createContact = async ( req, res = response ) => {
    const { telefono, nombre, apellido, correo, typeNumber } = req.body;
    const newContacto = new Contacto({ nombre, apellido, correo, telefono, typeNumber }) 

    await newContacto.save();

    res.status(201).json({
        ok: true,
        results: [newContacto]
    });
};

const updateContact = async ( req, res = response ) => {
    const { id } = req.params;
    const { _id, ...data } = req.body;

    const contacto = await Contacto.findByIdAndUpdate(id, data, {new: true});
    res.status(200).json(contacto);
};

const deleteContact = async ( req, res = response ) => {
    const { id } = req.params
    const contacto = await Contacto.findByIdAndUpdate( id ,{estado: false} , {new: true});

    res.status(200).json({
        msg: 'El siguiente usuario fue borrado',
        contacto
    });
};

module.exports = {
    getContact,
    createContact,
    updateContact,
    deleteContact
}