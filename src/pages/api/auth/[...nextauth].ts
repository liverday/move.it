import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        signIn: (user: any, session: any) => {
            return Promise.resolve(session);
        },
        session: (session, user) => {
            session.id = user.sub
            return Promise.resolve(session);
        },
        jwt: (token, user, account, profile, isNewUser) => {
            return Promise.resolve(token);
        },
        redirect: (_: string, _2: string) => {
            return Promise.resolve(process.env.NEXTAUTH_URL as string)
        }
    },
    secret: process.env.SECRET,
    debug: true,
    session: {
        jwt: true
    },
    database: process.env.DATABASE_URL,
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);