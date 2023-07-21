const { Schema, model } = require('mongoose');

const ContactoSchema = Schema({
    telefono: {
        type: String,
        required: [true, 'El número telefonico es un campo obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es un campo obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es un campo obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es un campo obligatorio'],
        unique: true
    },
    typeNumber: {
        type: String,
        required: [true, 'El tipo es obligatorio'],
        enum: ['MOVIL', 'HOGAR']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

ContactoSchema.methods.toJSON = function() {
    const { _id, __v, ...contacto } = this.toObject();
    contacto.id = _id;
    return contacto;
}

module.exports = model('Contact', ContactoSchema)