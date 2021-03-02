import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Home from '../../assets/home.svg';
import Award from '../../assets/award.svg';
import Logo from '../../assets/logo-base.svg';

import styles from '../../styles/components/SideBar.module.css';

const SideBar: React.FC = () => {
    const { asPath } = useRouter();

    return (
        <div className={styles.container}>
            <header>
                <Logo />
            </header>
            <main>
                <Link href="/" passHref>
                    <a className={asPath === '/' ? styles.linkActive : ''}>
                        <Home />
                    </a>
                </Link>
                <Link href="/leaderboard" passHref>
                    <a className={asPath === '/leaderboard' ? styles.linkActive : ''}>
                        <Award />
                    </a>
                </Link>
            </main>
            <footer />
        </div>
    );
}

export default SideBar;