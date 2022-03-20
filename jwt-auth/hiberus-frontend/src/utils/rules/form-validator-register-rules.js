export const  validateRegister = (values) => {
    let errors = {};

    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is not valid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be 8 or more characters';
    }
    if (!values.name) {
        errors.name = 'Name is required';
    }
    if (!values.surname) {
        errors.surname = 'Surname is required';
    }
    if (!values.confPassword) {
        errors.confPassword = 'Confirm Password is required';
    } else if (values.confPassword.length < 8) {
        errors.confPassword = 'Confirm Password must be 8 or more characters';
    }
    return errors;
};

export default validateRegister