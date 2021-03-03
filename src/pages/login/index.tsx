import React from 'react';

import Head from 'next/head';

import { GetServerSideProps, NextPage } from 'next';
import { AiFillGithub } from 'react-icons/ai';

import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

import styles from '../../styles/pages/Login.module.css';

const Login: NextPage= () => {
    const { theme } = useTheme();
    const { signIn } = useAuth();

    return (
        <div className={styles.container}>
            <Head>
                <title>Login | move.it</title>
            </Head>
            <section className={styles.backgroundContainer} />
            <section className={styles.formContainer}>
                <img src="/logo-home-light.svg" alt="logo" />

                <strong>Bem-vindo</strong>

                <div>
                    <AiFillGithub color={theme.textHighlight} />
                    <p>
                        Faça login com seu GitHub para começar
                    </p>
                </div>

                <button 
                    className={styles.loginButton} 
                    onClick={signIn}
                >
                    Login com GitHub 
                    <AiFillGithub />
                </button>
            </section>
        </div>
    );
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {
        theme
    } = ctx.req.cookies;

    return {
        props: {
            theme,
        }
    }
}