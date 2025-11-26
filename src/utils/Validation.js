const validator = require("validator");

const ValidateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || firstName.length < 2 || firstName.length > 50) {
    throw new Error("First name must be between 2 and 50 characters.");
  } else if (!lastName) {
    throw new Error("Last name is required.");
  } else if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Invalid email format.");
  } else if (
    !password ||
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error(
      "Password is not strong enough (8 chars, uppercase, lowercase, number, symbol required)."
    );
  }
};

module.exports = { ValidateSignUp };
