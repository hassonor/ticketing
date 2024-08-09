import buildClient from "@/api/build-client";
import {GetServerSideProps} from "next";

interface CurrentUser {
    id: string;
    email: string;
}

interface LandingPageProps {
    currentUser: CurrentUser | null;
}

const LandingPage = ({currentUser}: LandingPageProps) => {
    console.log(currentUser);

    return currentUser ? (
        <h1>You are signed in</h1>
    ) : (
        <h1>You are not signed in</h1>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = buildClient(context);
    const {data} = await client.get('/api/users/currentuser');

    return {
        props: {
            currentUser: data.currentUser || null,
        },
    };
};

export default LandingPage;
