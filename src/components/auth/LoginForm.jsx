import * as Yup from "yup";
import BaseForm from "../form/BaseForm";

const SignIn = ({ onSubmit }) => {
  return (
    <BaseForm
      title="Sign in"
      submitText="SIGN IN"
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email format").required("Required field"),
        password: Yup.string().min(6, "Minimum of 6 characters").required("Required field"),
      })}
      fields={[
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
      ]}
      onSubmit={onSubmit}
    />
  );
};

export default SignIn;