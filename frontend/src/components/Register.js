import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  return (
    <>
      <AuthForm
        title="Регистрация"
        buttonText="Зарегестрироваться"
        onSubmit={onRegister}
      />
      <Link to="/sign-in" className="auth__login-help">
        Уже зарегистрированы? Войти
      </Link>
    </>
  );
};

export default Register;
