import { FormEvent, useState } from "react";
import { useRouter } from 'next/router';
import useRequest from "@/hooks/use-request";

interface AuthFormProps {
    formTitle: string;
    buttonText: string;
    requestUrl: string;
    onSuccessRedirect: string;
}

const AuthForm = ({ formTitle, buttonText, requestUrl, onSuccessRedirect }: AuthFormProps) => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { doRequest, errors } = useRequest({
        url: requestUrl,
        method: 'post',
        body: { email, password },
        onSuccess: () => router.push(onSuccessRedirect)
    });

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>{formTitle}</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            {errors}
            <button className="btn btn bg-primary">{buttonText}</button>
        </form>
    );
};

export default AuthForm;
