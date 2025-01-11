import { errors, MIN_LENGTH } from "../utils/consts";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Input from "../UI/Input/Input";
import { useState } from "react";

export default function Password({ passwordStrength }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [validationDetails, setValidationDetails] = useState({
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
    properLength: false,
  });

  const getErrorMessage = () => {
    if (!validationDetails.upperCase) return errors.UPPERCASE_ERROR;
    if (!validationDetails.lowerCase) return errors.LOWERCASE_ERROR;
    if (!validationDetails.number) return errors.NUMBER_ERROR;
    if (!validationDetails.specialChar) return errors.SPECIAL_CHAR_ERROR;
    if (!validationDetails.properLength) return errors.PROPER_LENGTH_ERROR;
    return null;
  };

  const handlePasswordChange = (password) => {
    validatePassword(password);
    checkPasswordStrength(password);
  };

  const validatePassword = (password) => {
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const specialChar = /[!@#$%^&*(),.?_":{}|<>]/.test(password);
    const properLength = password.length >= MIN_LENGTH;

    const isValid =
      properLength && upperCase && lowerCase && number && specialChar;

    setValidationDetails({
      properLength,
      upperCase,
      lowerCase,
      number,
      specialChar,
    });
    setIsValidPassword(isValid);
    return isValid;
  };

  const checkPasswordStrength = (password) => {
    const levels = 4;
    const thresholds = [8, 12, 16, 20];
    const strength = Array.from(
      { length: levels },
      (_, i) => password.length >= thresholds[i]
    );
    passwordStrength(strength);
  };


  return (
    <>
      <div className="input-group">
        <Input
          type={!showPassword ? "password" : "text"}
          placeholder="Password"
          changeHandler={handlePasswordChange}
          width={"100%"}
        />
        <span className="password-icon">
          {!showPassword ? (
            <IoEyeOutline onClick={() => setShowPassword((prev) => !prev)} />
          ) : (
            <IoEyeOffOutline onClick={() => setShowPassword((prev) => !prev)} />
          )}
        </span>
      </div>
      {!isValidPassword && (
        <p className="password-error">{getErrorMessage()}</p>
      )}
    </>
  );
}
