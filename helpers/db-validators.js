const Contacto = require('../models/contac');
const Type = require('../models/type');

const idValidatorContact = async ( id ) => {
    const existeId = await Contacto.findById(id);
    if(!existeId) throw new Error(`El id ${id} que se ingreso no existe en la BD`);
}

const EmailValidator = async (correo = '') => {
    const existeEmail = await Contacto.findOne({correo});
    if(existeEmail) throw new Error(`El correo ${correo} que se ingreso ya existe en la BD`);
} 

const TypeValidator = async (typeNumber = '') => {
    const existeType = await Type.findOne({typeNumber});
    if( !existeType ) throw new Error(`El tipo ${ typeNumber } que se ingreso no es valido o no existe en la BD`);
}

module.exports = {
    idValidatorContact,
    EmailValidator,
    TypeValidator
}