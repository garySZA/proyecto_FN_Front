import * as yup from 'yup';
import { getFileExtension, getImageExtensionsAllowed, isImageExtensionAllowed } from './methods';

const regex = {
    phone: /^[67]\d{7}$/,
    ci: /^[1-9]\d{3,7}$/,
}

const newUserSchema = yup.object().shape({
    first_name: yup.string()
        .required('El nombre es requerido'),

    last_name: yup.string()
        .required('El apellido es requerido'),

    date: yup.string()
        .required('La fecha de nacimiento es requerida'),

    email: yup.string()
        .required('El email es requerido')
        .email('El email ingresado no es válido'),

    gender: yup.string()
        .required('El género es requerido'),

    password: yup.string()
        .required('La contraseña es requerida'),

    phone: yup.string()
        .required('El número de celular es requerido')
        .matches(regex.phone, 'El número de celular no es válido'),

    ci: yup.string()
        .required('El ci es requerido')
        .matches(regex.ci, 'El ci ingresado no es válido'),

    repeat_password: yup.string()
        .required('Debes repetir la contraseña')
        .oneOf([yup.ref('password')], 'Debe coincidir con la contraseña')
});

const newUserAdminSchema = yup.object().shape({
    first_name: yup.string()
        .required('El nombre es requerido'),

    last_name: yup.string()
        .required('El apellido es requerido'),

    date: yup.string()
        .required('La fecha de nacimiento es requerida'),

    email: yup.string()
        .required('El email es requerido')
        .email('El email ingresado no es válido'),

    gender: yup.string()
        .required('El género es requerido'),

    password: yup.string()
        .required('La contraseña es requerida'),

    phone: yup.string()
        .required('El número de celular es requerido')
        .matches(regex.phone, 'El número de celular no es válido'),

    ci: yup.string()
        .required('El ci es requerido')
        .matches(regex.ci, 'El ci ingresado no es válido'),

    repeat_password: yup.string()
        .required('Debes repetir la contraseña')
        .oneOf([yup.ref('password')], 'Debe coincidir con la contraseña'),
    
    role: yup.string()
    .required('El género es requerido'),
});

const editUserSchema = yup.object().shape({
    first_name: yup.string()
        .required('El nombre es requerido'),

    last_name: yup.string()
        .required('El apellido es requerido'),

    date: yup.string()
        .required('La fecha de nacimiento es requerida'),

    email: yup.string()
        .required('El email es requerido')
        .email('El email ingresado no es válido'),

    gender: yup.string()
        .required('El género es requerido'),

    password: yup.string()
        .test('empty-or-min-7', 'La contraseña debe tener al menos 6 caracteres', function(value) {
            if( !value ){
                return true;
            }
            return value.length >= 6;
        }),

    phone: yup.string()
        .required('El número de celular es requerido')
        .matches(regex.phone, 'El número de celular no es válido'),

    ci: yup.string()
        .required('El ci es requerido')
        .matches(regex.ci, 'El ci ingresado no es válido'),
    repeat_password: yup.string()
        .oneOf([yup.ref('password')], 'Debe coincidir con la contraseña'),
    role: yup.string()
    .required('El género es requerido'),
});

const editProfileClientSchema = yup.object().shape({
    first_name: yup.string()
        .required('El nombre es requerido'),

    last_name: yup.string()
        .required('El apellido es requerido'),

    date: yup.string()
        .required('La fecha de nacimiento es requerida'),

    email: yup.string()
        .required('El email es requerido')
        .email('El email ingresado no es válido'),

    gender: yup.string()
        .required('El género es requerido'),

    phone: yup.string()
        .required('El número de celular es requerido')
        .matches(regex.phone, 'El número de celular no es válido'),

    ci: yup.string()
        .required('El ci es requerido')
        .matches(regex.ci, 'El ci ingresado no es válido'),
});

const newContactSchema = yup.object().shape({
    emailClient: yup.string()
        .required('El email es requerido')
        .email('El email ingresado no es válido'),

    text: yup.string()
        .required('El campo no puede estar vacío')
});

const resetPasswordSchema = yup.object().shape({
    password: yup.string()
        .required('La contraseña es requerida'),

    repeat_password: yup.string()
        .required('La contraseña es requerida')
        .oneOf([yup.ref('password')], 'Debe coincidir con la contraseña')
});

const createValorationSchema = yup.object().shape({
    studyMethod: yup.string()
        .required('El método de estudio es obligatorio'),

    reason: yup.string()
        .required('El motivo de estudio es obligatorio'),

    description: yup.string()
        .required('La descripción es obligatoria'),

    conclusion: yup.string()
        .required('La conclusión es obligatoria'),
});

const verifyPasswordSchema = yup.object().shape({
    password: yup.string()
        .required('La contraseña es requerida')
});

const newItemSchema = yup.object().shape({
    bodyPart: yup.string()
            .required('Campo requerido'),

    description: yup.string()
            .required('Campo requerido'),

    files: yup.mixed()
            .test('required', 'Debes seleccionar un archivo', value => {
                return value && value.length;
            })
            .test('fileType', `Sólo se permiten archivos ${ getImageExtensionsAllowed() }`, value => {
                //? Validación para verificar si existe archivo cargado
                if( !value || value.length === 0 ){
                    return true;
                }

                const file = value[0];
                const fileExtension = getFileExtension(file.type, '/');
                if( !isImageExtensionAllowed(fileExtension) ){
                    return false;
                }

                return true;
            }),

});

export {
    createValorationSchema,
    editUserSchema,
    editProfileClientSchema,
    newUserSchema,
    newUserAdminSchema,
    newContactSchema,
    newItemSchema,
    resetPasswordSchema,
    verifyPasswordSchema
}