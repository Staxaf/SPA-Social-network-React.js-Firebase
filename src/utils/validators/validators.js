

export const required = value => {
    if(value) return undefined
    return 'Field is required'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if(value && value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined
}

export const minLengthCreator = (minLength) => (value) => {
    if(value && value.length < minLength) return `Min length is ${minLength} symbols`
    return undefined
}

export const validateConfirmPassword = (value, allValues) => value !== allValues.password ? 'Passwords don\'t match' : undefined

export const validateEmail = (value) => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return undefined
    return 'You have entered an invalid email'
}