import React, { createContext, useContext, useCallback, FormEvent } from 'react';

import {
    Provider,
    signIn as handleOAuthLogin,
    signOut as handleOAuthLogout
} from 'next-auth/client';

interface AuthContextData {
    signIn(event: FormEvent): void;
    signOut(event: FormEvent): void;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
    session: any;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ session, children }) => {
    const signIn = useCallback(() => {
        handleOAuthLogin('github');
    }, []);

    const signOut = useCallback(() => {
        handleOAuthLogout({ callbackUrl: process.env.NEXTAUTH_URL});
    }, [])

    return (
        <Provider session={session}>
            <AuthContext.Provider value={{ signIn, signOut }}>
                {children}
            </AuthContext.Provider>
        </Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('shoulde be used with AuthProvider');
    }

    return context;
}