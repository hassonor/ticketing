import axios, {AxiosInstance} from "axios";
import {IncomingMessage} from "http";

interface BuildClientProps {
    req?: IncomingMessage;
}

const BuildClient = ({req}: BuildClientProps): AxiosInstance => {
    if (typeof window === 'undefined' && req) {
        // We are on the server
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers as any,  // Casting headers to any to satisfy type requirements
        });
    } else {
        // We are on the browser
        return axios.create({
            baseURL: '/'
        });
    }
};

export default BuildClient;
