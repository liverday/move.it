import React from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/client';

import Login from '../pages/login';
import Loader from '../components/Loader';

const withAuth = (Component: NextPage) => {
    const Auth: NextPage = (props: any) => {
        const [session, loading] = useSession();

        if (loading) {
            return <Loader />
        }

        if (!session) {
            return <Login />;
        }

        return <Component {...props} />;
    }

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
}

export default withAuth;