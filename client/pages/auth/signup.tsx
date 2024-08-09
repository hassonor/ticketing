import AuthForm from "@/components/AuthForm";


const SignUp = () => {
    return (
        <AuthForm
            formTitle="Sign Up"
            buttonText="Sign Up"
            requestUrl="/api/users/signup"
            onSuccessRedirect="/"
        />
    );
};

export default SignUp;
