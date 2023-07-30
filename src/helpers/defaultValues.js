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
    role: 'USER_ROLE'
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
}

export {
    userDefaultValues,
    contactFormDefaultValues,
    defaultResult,
    defaultFilters,
}