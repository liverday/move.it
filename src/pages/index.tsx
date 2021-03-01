import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';

import ExperienceBar from "../components/ExperienceBar";
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';
import withAuth from '../hoc/withAuth';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { getDatabase } from '../utils/database';


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

const Home: NextPage<HomeProps> = ({ level, currentExperience, challengesCompleted }) => {
  return (
    <ChallengesProvider 
      level={level} 
      currentExperience={currentExperience} 
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export default withAuth(Home);

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {
    theme
  } = ctx.req.cookies;

  const { id } = await getSession({ req: ctx.req });
  const database = await getDatabase();

  const {
    level,
    currentExperience,
    challengesCompleted,
  } = await database.collection('users').findOne({ _id: new ObjectId(id) });

  return {
    props: {
      theme,
      level,
      currentExperience,
      challengesCompleted
    }
  }
}