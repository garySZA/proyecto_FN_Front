const validarEmail = ( value ) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i

    return regex.test(value);
}

export { validarEmail }