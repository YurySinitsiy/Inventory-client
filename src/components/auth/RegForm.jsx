import * as Yup from "yup";
import AuthForm from "./AuthForm";

const SignUp = ({ onSubmit }) => {
    return (
        <AuthForm
            title="Sign up"
            submitText="SIGN UP"
            initialValues={{ email: "", name: "", surname: "", password: "" }}
            validationSchema={Yup.object({
                email: Yup.string().email("Неверный формат email").required("Обязательное поле"),
                name: Yup.string().required("Обязательное поле"),
                surname: Yup.string().required("Обязательное поле"),
                password: Yup.string().min(6, "Минимум 6 символов").required("Обязательное поле"),
            })}
            fields={[
                { name: "email", label: "Email", type: "email", },
                { name: "name", label: "Name", type: "text", },
                { name: "surname", label: "Surname", type: "text", },
                { name: "password", label: "Password", type: "password", },
            ]}
            onSubmit={onSubmit}
        />
    );
};

export default SignUp;
