import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import Layout from '../../components/Layout';
import SideBar from '../../components/SideBar';

import styles from '../../styles/pages/LeaderBoard.module.css'
import { getDatabase } from '../../utils/database';

interface LeaderBoardProps {
    users: {
        _id: string;
        name: string;
        email: string;
        image: string;
        level: number;
        createdAt: string;
        updatedAt: string;
        challengesCompleted: number;
        currentExperience: number;
        accumulatedExperience: number
    }[];
}

const LeaderBoard: NextPage<LeaderBoardProps> = ({ users }) => {
    return (
        <>
            <Head>
                <title>Ranking | move.it</title>
            </Head>
            <Layout>
                <SideBar />
                <div className={styles.container}>
                    <header>Leaderboard</header>

                    <div className={styles.wrapper}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Posição</th>
                                    <th style={{ width: '100%' }}>Usuário</th>
                                    <th>Desafios</th>
                                    <th>Experiência</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id + `${index}`}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td style={{ width: '100%' }}>
                                            <div className={styles.userInfoContainer}>
                                                <img src={user.image} alt={user.name} />
                                                <div>
                                                    <strong>{user.name}</strong>
                                                    <span>
                                                        <img src="icons/level.svg" alt="Level Up Icon" />Level {user.level}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p><strong>{user.challengesCompleted}</strong> completados</p>
                                        </td>
                                        <td>
                                            <p><strong>{user.accumulatedExperience}</strong> xp</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default LeaderBoard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {
        theme
    } = ctx.req.cookies;

    const database = await getDatabase();

    const users = await database
        .collection('users')
        .find()
        .sort({ level: -1 })
        .limit(10)
        .toArray();

    return {
        props: {
            theme,
            users: users.map(user => ({
                ...user,
                _id: user._id.toString(),
                createdAt: user.createdAt.toString(),
                updatedAt: user.updatedAt.toString()
            })),
        }
    }
}