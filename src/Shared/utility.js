
export const checkValidity = (value, rules) => {    // look arrow function is not used

    let isValid = true;

    if (!rules) {
        return true;    // when to handle err when validation (i.e rules) obejct is not defined 
    }
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }


    return isValid;
}
