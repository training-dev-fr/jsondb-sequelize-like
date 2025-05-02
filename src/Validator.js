const isString = (v) => typeof v === 'string';
const isNumber = (v) => typeof v === 'number';

const validateIs = (element, value) => {
    return value.test(element);
}
const validateNot = (element, value) => {
    return !value.test(element);
}
const validateIsEmail = (element) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element);
}
const validateIsUrl = (element) => {
    try {
        new URL(element); return true;
    } catch {
        return false;
    }
};
const validateIsIP = (element) => {
    return validateIsIPv4(element) || validateIsIPv6(element);
}
const validateIsIPv4 = (element) => {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(element);
}
const validateIsIPv6 = (element) => {
    return /^[\da-fA-F:]+$/.test(element);
}
const validateIsAlpha = (element) => {
    return /^[A-Za-z]+$/.test(element);
}
const validateIsAlphanumeric = (element) => {
    return /^[A-Za-z0-9]+$/.test(element);
}
const validateIsNumeric = (element) => {
    return /^-?\d+(\.\d+)?$/.test(element);
}
const validateIsInt = (element) => {
    return Number.isInteger(element);
}
const validateIsFloat = (element) => {
    return isNumber(element) && !Number.isInteger(element);
}
const validateIsDecimal = (element) => {
    return validateIsFloat(element);
}
const validateIsLowerCase = (element) => {
    return isString(element) && element === element.toLowerCase();
}
const validateIsUpperCase = (element) => {
    return isString(element) && element === element.toUpperCase();
}
const validateNotNull = (element) => {
    return element !== null && element !== undefined;
}
const validateIsNull = (element) => {
    return element === null || element === undefined;
}
const validateNotEmpty = (element) => {
    return element !== '' && element !== null && element !== undefined;
}
const validateEquals = (element, value) => {
    return element === value;
}
const validateContains = (element, value) => {
    return isString(element) && element.includes(value);
}
const validateNotContains = (element, value) => {
    return isString(element) && !element.includes(value);
}
const validateIsIn = (element, value) => {
    return Array.isArray(value) && value.includes(element);
}
const validateNotIn = (element, value) => {
    return Array.isArray(value) && !value.includes(element);
}
const validateLen = (element, value) => {
    return isString(element) && element.length >= value[0] && element.length <= value[1];
}
const validateIsUUID = (element) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(element);
}
const validateIsDate = (element) => {
    return !isNaN(Date.parse(element));
}
const validateIsAfter = (element, value) => {
    return new Date(element) > new Date(value);
}
const validateIsBefore = (element, value) => {
    return new Date(element) < new Date(value);
}
const validateMin = (element, value) => {
    return isNumber(element) && element >= value;
}
const validateMax = (element, value) => {
    return isNumber(element) && element <= value;
}

const validate = (element, propertyName, validator) => {
    let errorStack = [];
    for (let [property, value] of Object.entries(validator)) {
        if (typeof value === 'function') {
            try {
                value(element)
            } catch (e) {
                errorStack.push(e);
            }
        } else {

            switch (property) {
                case "is":
                    if (!validateIs(element, value)) {
                        errorStack.push(new Error(propertyName + " must match pattern : " + value));
                    }
                    break;
                case "not":
                    if (!validateNot(element, value)) {
                        errorStack.push(new Error(propertyName + " must not match pattern : " + value));
                    }
                    break;
                case "isUrl":
                    if (!validateIsUrl(element)) {
                        errorStack.push(new Error(propertyName + " must be url format"));
                    }
                    break;
                case "isEmail":
                    if (!validateIsEmail(element)) {
                        errorStack.push(new Error(propertyName + " must be email format"));
                    }
                    break;
                case "isIP":
                    if (!validateIsIP(element)) {
                        errorStack.push(new Error(propertyName + " must be IPv4 or IPv6 format"));
                    }
                    break;
                case "isIPv4":
                    if (!validateIsIPv4(element)) {
                        errorStack.push(new Error(propertyName + " must be IPv4 format"));
                    }
                    break;
                case "isIPv6":
                    if (!validateIsIPv6(element)) {
                        errorStack.push(new Error(propertyName + " must be IPv6 format"));
                    }
                    break;
                case "isAlpha":
                    if (!validateIsAlpha(element)) {
                        errorStack.push(new Error(propertyName + " must contains only alpha chars"));
                    }
                    break;
                case "isAlphanumeric":
                    if (!validateIsAlphanumeric(element)) {
                        errorStack.push(new Error(propertyName + " must contains only alpha and numeric chars"));
                    }
                    break;
                case "isNumeric":
                    if (!validateIsNumeric(element)) {
                        errorStack.push(new Error(propertyName + " must contains only numeric chars"));
                    }
                    break;
                case "isInt":
                    if (!validateIsInt(element)) {
                        errorStack.push(new Error(propertyName + " must be Integer"));
                    }
                    break;
                case "isFloat":
                    if (!validateIsFloat(element)) {
                        errorStack.push(new Error(propertyName + " must be Decimal"));
                    }
                    break;
                case "isDecimal":
                    if (!validateIsDecimal(element)) {
                        errorStack.push(new Error(propertyName + " must be Float"));
                    }
                    break;
                case "isLowerCase":
                    if (!validateIsLowerCase(element)) {
                        errorStack.push(new Error(propertyName + " must be in lowerCase"));
                    }
                    break;
                case "isUpperCase":
                    if (!validateIsUpperCase(element)) {
                        errorStack.push(new Error(propertyName + " must be in upperCase"));
                    }
                    break;
                case "notNull":
                    if (!validateNotNull(element)) {
                        errorStack.push(new Error(propertyName + " must be not null"));
                    }
                    break;
                case "isNull":
                    if (!validateIsNull(element)) {
                        errorStack.push(new Error(propertyName + " must be null"));
                    }
                    break;
                case "notEmpty":
                    if (!validateNotEmpty(element)) {
                        errorStack.push(new Error(propertyName + " must be not empty"));
                    }
                    break;
                case "equals":
                    if (!validateEquals(element, value)) {
                        errorStack.push(new Error(propertyName + " must be equals to " + value));
                    }
                    break;
                case "contains":
                    if (!validateContains(element, value)) {
                        errorStack.push(new Error(propertyName + " must contains " + value));
                    }
                    break;
                case "notContains":
                    if (!validateNotContains(element, value)) {
                        errorStack.push(new Error(propertyName + " must not contains " + value));
                    }
                    break;
                case "isIn":
                    if (!validateIsIn(element, value)) {
                        errorStack.push(new Error(propertyName + " must be in " + JSON.stringify(value)));
                    }
                    break;
                case "notIn":
                    if (!validateNotIn(element, value)) {
                        errorStack.push(new Error(propertyName + " must not be in " + JSON.stringify(value)));
                    }
                    break;
                case "len":
                    if (!validateLen(element, value)) {
                        errorStack.push(new Error(propertyName + " must be " + value + " chars length max"));
                    }
                    break;
                case "isUUID":
                    if (!validateIsUUID(element)) {
                        errorStack.push(new Error(propertyName + " must be UUID"));
                    }
                    break;
                case "isDate":
                    if (!validateIsDate(element)) {
                        errorStack.push(new Error(propertyName + " must be a date"));
                    }
                    break;
                case "isAfter":
                    if (!validateIsAfter(element, value)) {
                        errorStack.push(new Error(propertyName + " must be greater than " + value));
                    }
                    break;
                case "isBefore":
                    if (!validateIsBefore(element, value)) {
                        errorStack.push(new Error(propertyName + " must be lower than " + value));
                    }
                    break;
                case "min":
                    if (!validateMin(element, value)) {
                        errorStack.push(new Error(propertyName + " must be greater than " + value));
                    }
                    break;
                case "max":
                    if (!validateMax(element, value)) {
                        errorStack.push(new Error(propertyName + " must be lower than " + value));
                    }
                    break;
                default:
                    errorStack.push(new Error("validator " + propertyName + " is not implemented manage by jsondb tools"));
                    break;
            }
        }
    }
    return errorStack;
}

export { validate };