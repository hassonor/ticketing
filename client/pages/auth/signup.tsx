import {FormEvent, useState} from "react";
import useRequest from "@/hooks/use-request";

const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {doRequest, errors} = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password
        }
    })
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input className="form-control" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
            </div>
            {errors}
            <button className="btn btn bg-primary">Sign Up</button>
        </form>)
}

export default SignUp;