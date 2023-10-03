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
    },
    find: ''
}

const defaultValuesCodeVerification = {
    codeVerification: ''
}

const defaultValuesResetPWD = {
    password: '',
    repeat_password: ''
}

const defaultValuesCreateValoration = {
    studyMethod: '',
    reason: '',
    description: '',
    conclusion: '',
}

const defaultValuesVerifyPWD = {
    password: '',
}

const itemDefaultValues = {
    bodyPart: '',
    description: '',
    image: '',
}

export {
    userDefaultValues,
    contactFormDefaultValues,
    itemDefaultValues,
    defaultValuesCreateValoration,
    defaultFilters,
    defaultResult,
    defaultValuesCodeVerification,
    defaultValuesResetPWD,
    defaultValuesVerifyPWD
}