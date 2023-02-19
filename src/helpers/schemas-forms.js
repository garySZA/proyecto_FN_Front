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
})


export {
    newUserSchema,
}