import { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { paths } from "../router/paths";
import { toast, Toaster } from "react-hot-toast";
import Password from "./Password";
import StrenghtIndicator from "../modules/StrenghtIndicator";

export default function SignUp({setStatus}) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [username, setUsername] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(
    Array(4).fill(false)
  );

  const updateEmail = (email) => {
    setEmail(email);
    setIsValidEmail(true);
  };

  const validateForm = () => {
    const isValidEmail = validateEmail(email);
    setIsValidEmail(isValidEmail);

    const isValidUsername = username.length > 0;
    const isUserExists = username === "admin";
    //TODO: check if user exists in the database

    if (!isValidUsername) {
      toast.error("User name is required");
    } else if (isUserExists) {
      toast.error("User already exists");
    } else {
      navigate(paths.MAIN);
    }
  };

  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return isValid;
  };

  return (
    <>
      <Toaster />
      <form
        className="login-form"
        method="post"
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <h1>Sign up</h1>
        <div className="input-group">
          <Input
            placeholder="Username"
            width={"100%"}
            changeHandler={setUsername}
          />
        </div>
        <div className="input-group">
          <Input
            placeholder="Email"
            width={"100%"}
            focus={updateEmail}
            color={isValidEmail ? "#757575" : "rgba(248, 50, 43, 0.5)"}
          />
        </div>
        <Password passwordStrength={setPasswordStrength}/>
        <StrenghtIndicator strengthLevel={passwordStrength}/>
        <Button variant={"classic"} size={"100%"} clickHandler={validateForm}>
          Sign Up
        </Button>
      </form>
      <div className="sign-in-link">
        <p>Already have an account?</p>
        <Button
          variant={"outline"}
          size={"40%"}
          clickHandler={() => setStatus(true)}
        >
          Sign In
        </Button>
      </div>
    </>
  );
}
