import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/middlewareActions";
import { toast, Toaster } from "react-hot-toast";
import { paths } from "../router/paths";
import { useNavigate } from "react-router";

//Validate sign in form!!!!!!!!!!! because executing api call

export default function SignIn({ setStatus }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    toast.dismiss();
  }, []);

  const signIn = useCallback(async () => {
    const loadingToastId = toast.loading("Processing login...");
    try {
      await dispatch(login(email, password));
      navigate(paths.MAIN);
    } catch (e) {
      toast.error(e.response?.data?.message || "Login failed!");
    } finally {
      toast.dismiss(loadingToastId);
    }
  }, [email, password]);

  return (
    <>
      <Toaster />
      <form
        className="login-form"
        method="post"
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <h1>
          Sign <span>in</span>
        </h1>
        <div className="input-group">
          <Input
            value={email}
            placeholder="Email"
            width={"100%"}
            changeHandler={setEmail}
          />
        </div>
        <div className="input-group">
          <Input
            value={password}
            type={!showPassword ? "password" : "text"}
            placeholder="Password"
            style={{ position: "relative" }}
            width={"100%"}
            changeHandler={setPassword}
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
        <Button
          variant={"classic"}
          size={{ width: "100%" }}
          clickHandler={signIn}
        >
          Sign In
        </Button>
      </form>
      <div className="sign-in-link">
        <p>Don't have an account?</p>
        <Button
          variant={"outline"}
          size={{ width: "40%" }}
          clickHandler={() => setStatus(false)}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}
