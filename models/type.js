const {Schema, model} = require('mongoose');

const TypeSchema = Schema({
    typeNumber: {
        type: String,
        required: [true, 'El Tipo es obligatorio']
    }
});

module.exports = model('Type', TypeSchema);