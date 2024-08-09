import buildClient from "@/api/build-client";
import {GetServerSideProps} from "next";
import {fetchCurrentUser} from "@/pages/_app";
import {CurrentUser} from "@/interfaces/current-user.interface";


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
    const currentUser = await fetchCurrentUser(context);

    return {
        props: {
            ...currentUser,
        },
    };
};

export default LandingPage;
