import { useEffect, useLayoutEffect, useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { paths } from "../router/paths";
import { toast, Toaster } from "react-hot-toast";
import Password from "./Password";
import StrenghtIndicator from "../modules/StrenghtIndicator";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, registration } from "../store/actions/middlewareActions";

export default function SignUp({ setStatus }) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(
    Array(4).fill(false)
  );
  const { isAuth, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    toast.dismiss();
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate(paths.MAIN);
    }
  }, [isAuth]);

  const updateEmail = () => {
    setIsValidEmail(true);
  };

  const validateForm = async () => {
    const isValidEmail = validateEmail(email);
    setIsValidEmail(isValidEmail);

    const isValidUsername = username.length > 0;

    if (!isValidUsername) {
      toast.error("User name is required");
    } else if (!isValidPassword) {
      toast.error("Use correct password");
    } else if (!isValidEmail) {
      toast.error("Use correct email");
    } else {
      const loadingToastId = toast.loading("Processing registration...");
      try {
        await dispatch(registration(email, password, username));
        navigate(paths.MAIN);
      } catch (e) {
        toast.error(e.response?.data?.message || "Registration failed!");
      } finally {
        toast.dismiss(loadingToastId);
      }
    }
  };

  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return isValid;
  };

  const checkPasswordValidation = (isValid, password) => {
    setIsValidPassword(isValid);

    if (isValid) {
      setPassword(password);
    }
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
            changeHandler={setEmail}
            color={isValidEmail ? "#757575" : "rgba(248, 50, 43, 0.5)"}
          />
        </div>
        <Password
          passwordStrength={setPasswordStrength}
          passwordValidation={checkPasswordValidation}
        />
        <StrenghtIndicator strengthLevel={passwordStrength} />
        <Button
          variant={"classic"}
          size={{ width: "100%" }}
          clickHandler={validateForm}
        >
          Sign Up
        </Button>
      </form>
      <div className="sign-in-link">
        <p>Already have an account?</p>
        <Button
          variant={"outline"}
          size={{ width: "40%" }}
          clickHandler={() => setStatus(true)}
        >
          Sign In
        </Button>
      </div>
    </>
  );
}
