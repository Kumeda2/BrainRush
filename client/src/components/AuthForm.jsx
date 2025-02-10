import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function AuthForm() {
  const [isSignedUP, setIsSignedUP] = useState(false);

  return (
    <div className="auth">
      <div className="form-container">
        {!isSignedUP ? (
          <SignUp setStatus={setIsSignedUP} />
        ) : (
          <SignIn setStatus={setIsSignedUP} />
        )}
      </div>
    </div>
  );
}
