const { Router } = require('express');
const { check } = require('express-validator');

// ! Controladores de cada ruta
const { getContact, createContact, updateContact, deleteContact } = require('../controllers/agenda');

/*
    function validarCampos() Recibe cualquier posible error proveniente de los check y lo retorna
    function idValidatorContact() Se encarga de validar si el id es valido y si existe en BD 
    function EmailValidator() Se encarga de verificar si el correo ya existe para no agregar duplicados
*/ 
const { validarCampos } = require('../middlewares/validar-campos');
const { idValidatorContact, EmailValidator, TypeValidator } = require('../helpers/db-validators')

const router = Router();

router.get('/', getContact);

router.post('/', [
    check('nombre', 'El campo nombre es requerido'),
    check('apellido', 'El campo apellido es requerido'),
    check('telefono', 'El campo telefono es requerido'),
    check('correo').custom( EmailValidator ),
    check('typeNumber').custom( TypeValidator ),
    validarCampos
], createContact);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( idValidatorContact ), 
    validarCampos
], updateContact);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( idValidatorContact ), 
    validarCampos
], deleteContact);

module.exports = router;

