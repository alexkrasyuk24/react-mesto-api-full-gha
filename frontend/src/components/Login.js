import AuthForm from "./AuthForm";

const Login = ({ onLogin }) => {
  return <AuthForm title="Вход" buttonText="Войти" onSubmit={onLogin} />;
};

export default Login;
