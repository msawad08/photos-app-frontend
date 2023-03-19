import { useSlotProps } from "@mui/base";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LoginComponent from "../../components/Login";
import { appDataSelector, closeError, login } from "../../reducers/appReducer";

export default function Login() {
  const navigate = useNavigate();

  const { isLoggedIn, error } = useSelector(appDataSelector);
  const dispatch = useDispatch()

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [emailError, onChangeEmailError] = useState("");
  const [passwordError, onChangePasswordError] = useState("");

  const validateEmail = () => {
    if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        onChangeEmailError("");
        return true
    }
    onChangeEmailError("Invalid Email");
  };

  const validatePassword = () => {
    if (password && password.length >= 8) {
        onChangePasswordError("");
        return true
    }
    onChangePasswordError("Password should be atleast 8 characters")
  };

  const onSubmit = ()=>{
    if(validateEmail() && validatePassword()){
        dispatch(login({email, password}))
    }
  }

  const onCloseError = () =>{
    dispatch(closeError({}))
  }

  useEffect(() => {
    if (navigate && isLoggedIn) navigate("/app");
  }, [navigate, isLoggedIn]);

  return (
    <LoginComponent
      email={email}
      onChangeEmail={onChangeEmail}
      password={password}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
      validateEmail={validateEmail}
      validatePassword={validatePassword}
      emailError={emailError}
      passwordError={passwordError}
      error={error}
      onCloseError={onCloseError}
    />
  );
}
