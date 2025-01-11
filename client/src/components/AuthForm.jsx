import { useState } from "react";
import Banner from "../modules/Banner";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Toaster } from "react-hot-toast";

export default function AuthForm() {
  const [isSignedUP, setIsSignedUP] = useState(false);

  return (
    <>
      <Toaster />
      <div className="auth">
        <Banner />
        <div className="wrapper">
          <div className="form-container">
            {!isSignedUP && <SignUp setStatus={setIsSignedUP} />}

            {isSignedUP && <SignIn setStatus={setIsSignedUP} />}
          </div>
        </div>
      </div>
    </>
  );
}
