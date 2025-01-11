import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { useState } from "react";

export default function SignIn({setStatus}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <form
        className="login-form"
        method="post"
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <h1>Sign in</h1>
        <div className="input-group">
          <Input placeholder="Email" width={"100%"} />
        </div>
        <div className="input-group">
          <Input
            type={!showPassword ? "password" : "text"}
            placeholder="Password"
            style={{ position: "relative" }}
            width={"100%"}
          />
          <span className="password-icon">
            {!showPassword ? (
              <IoEyeOutline onClick={() => setShowPassword((prev) => !prev)} />
            ) : (
              <IoEyeOffOutline
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </span>
        </div>
        <Button variant={"classic"} size={"100%"}>
          Sign In
        </Button>
      </form>
      <div className="sign-in-link">
        <p>Don't have an account?</p>
        <Button
          variant={"outline"}
          size={"40%"}
          clickHandler={() => setStatus(false)}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}
