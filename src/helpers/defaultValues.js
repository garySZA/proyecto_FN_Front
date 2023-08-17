const userDefaultValues = {
    first_name: '',
    last_name: '',
    date: '',
    gender: '',
    email: '',
    password: '',
    repeat_password: '',
    phone: '',
    ci: '',
    role: ''
}

const contactFormDefaultValues = {
    emailClient: '',
    text: ''
}

const defaultResult = {
    total: 0,
    pages: 10,
    rows: []
}

const defaultFilters = {
    limit: 5,
    page: 1,
    status: 5,
    sort: {
        first_name: -1
    }
}

const defaultValuesCodeVerification = {
    codeVerification: ''
}

const defaultValuesResetPWD = {
    password: '',
    repeat_password: ''
}

const defaultValuesVerifyPWD = {
    password: '',
}

export {
    userDefaultValues,
    contactFormDefaultValues,
    defaultResult,
    defaultFilters,
    defaultValuesCodeVerification,
    defaultValuesResetPWD,
    defaultValuesVerifyPWD
}