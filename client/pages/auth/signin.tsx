import AuthForm from "@/components/AuthForm";


const SignIn = () => {
    return (
        <AuthForm
            formTitle="Sign In"
            buttonText="Sign In"
            requestUrl="/api/users/signin"
            onSuccessRedirect="/"
        />
    );
};

export default SignIn;
