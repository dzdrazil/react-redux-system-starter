import t from 'tcomb';

const lowercaseRegex = /^(?=.*[a-z]).+$/;
const uppercaseRegex = /^(?=.*[A-Z]).+$/;
const specialRegex = /^(?=.*[0-9_\W]).+$/;

export const PASSWORD_VALIDATION_MESSAGE = 'Passwords must contain at least 5 characters; at least one each of upper case, lower case, and non-letter character';

export const Password = t.refinement(
    t.String,
    p => (
        p.length >= 5 &&
        lowercaseRegex.test(p) &&
        uppercaseRegex.test(p) &&
        specialRegex.test(p)
    ),
    'Password'
);

Password.getValidationErrorMessage = () => PASSWORD_VALIDATION_MESSAGE;
