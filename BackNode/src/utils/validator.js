exports.isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};

exports.isValidCedula = (cedula) => {
    return /^[0-9]{8,10}$/.test(cedula);
};

exports.isValidString = (str, minLength = 1) => {
    return typeof str === 'string' && str.trim().length >= minLength;
};
