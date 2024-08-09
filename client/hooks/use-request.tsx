import axios, {AxiosResponse, AxiosError} from 'axios';
import {useState} from 'react';

interface UseRequestProps {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    body?: any;
    onSuccess?: (data: any) => void;
}

interface ErrorResponse {
    message: string;
    field?: string;
}

interface AxiosErrorResponse {
    errors: ErrorResponse[];
}

const useRequest = ({url, method, body, onSuccess}: UseRequestProps) => {
    const [errors, setErrors] = useState<JSX.Element | null>(null);

    const doRequest = async (): Promise<any> => {
        try {
            setErrors(null);
            const response: AxiosResponse = await axios[method](url, body);

            if (onSuccess) {
                onSuccess(response.data);
            }
            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError<AxiosErrorResponse>;

            if (axiosError.response && axiosError.response.data) {
                setErrors(
                    <div className="alert alert-danger">
                        <h4>Ooops....</h4>
                        <ul className="my-0">
                            {axiosError.response.data.errors.map((err) => (
                                <li key={err.message}>{err.message}</li>
                            ))}
                        </ul>
                    </div>
                );
            } else {
                console.error(err);
            }
        }
    };
    return {doRequest, errors};
};

export default useRequest;
