const validator = require("validator");

exports.validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("All fields (firstName, lastName, emailId, and password) are required.");
    }

    // Validate names
    if (typeof firstName !== 'string' || firstName.trim() === '') {
        throw new Error("First name is not valid.");
    }

    if (typeof lastName !== 'string' || lastName.trim() === '') {
        throw new Error("Last name is not valid.");
    }

    // Validate email
    if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid.");
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be strong. It should contain at least 8 characters, including uppercase, lowercase, numbers, and symbols.");
    }
};
