import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {GetServerSidePropsContext} from "next";
import buildClient from "@/api/build-client";
import Header from "@/components/Header";
import {useEffect} from "react";

interface CustomAppProps extends AppProps {
    pageProps: {
        currentUser?: any;
        [key: string]: any;
    };
}

const AppComponent = ({Component, pageProps}: CustomAppProps) => {
    const {currentUser} = pageProps;
    return (
        <>
            <Header currentUser={currentUser}/>
            <Component {...pageProps} />
        </>
    );
};

export default AppComponent;


export const fetchCurrentUser = async (context: GetServerSidePropsContext) => {
    const {req} = context;

    try {
        const client = buildClient({req});
        const {data} = await client.get('/api/users/currentuser');

        return {
            currentUser: data.currentUser || null,
        };
    } catch (error) {
        console.error('Error fetching current user:', error);
        return {
            currentUser: null,
        };
    }
};
