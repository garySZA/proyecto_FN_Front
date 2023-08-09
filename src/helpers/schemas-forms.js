import * as yup from 'yup';

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
        .oneOf([yup.ref('password')], 'Debe coincidir con la contraseña')
});

const newContactSchema = yup.object().shape({
    emailClient: yup.string()
        .required('El email es requerido')
        .email('El email ingresado no es válido'),

    text: yup.string()
        .required('El campo no puede estar vacío')
})

const resetPasswordSchema = yup.object().shape({
    password: yup.string()
        .required('La contraseña es requerida'),

    repeat_password: yup.string()
        .required('La contraseña es requerida')
        .oneOf([yup.ref('password')], 'Debe coincidir con la contraseña')
})

export {
    newUserSchema,
    editUserSchema,
    newContactSchema,
    resetPasswordSchema,
}