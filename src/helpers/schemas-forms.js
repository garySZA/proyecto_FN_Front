import * as yup from 'yup';

const newUserSchema = yup.object().shape({
    first_name: yup.string()
        .required('El nombre es requerido'),

    last_name: yup.string()
        .required('El apellido es requerido'),

    email: yup.string()
        .required('El email es requerido')
        .email('El email ingresado no es válido'),

    password: yup.string()
        .required('La contraseña es requerida'),

    phone: yup.number()
        .required('El número telefónico es requerido'),

    ci: yup.number()
        .required('El número de C.I. es requerido'),
})


export {
    newUserSchema,
}