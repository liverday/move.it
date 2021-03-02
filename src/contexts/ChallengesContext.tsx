import { useSession } from 'next-auth/client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

import challenges from '../../challenges.json';
import LevelUpModal from '../components/LevelUpModal';

import api from '../services/api';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    accumulatedExperience: number;
    levelUp(): void;
    activeChallenge: Challenge;
    startNewChallenge(): void;
    completeChallenge(): void;
    resetChallenge(): void;
    closeLevelUpModal(): void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    accumulatedExperience: number;
}

export const ChallengesProvider: React.FC<ChallengesProviderProps> = ({
    children,
    ...rest
}) => {
    const [session] = useSession();
    const [level, setLevel] = useState(rest.level || 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted || 0);
    const [accumulatedExperience, setAccumulatedExperience] = useState(rest.accumulatedExperience || 0);

    const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        async function storeData() {
            await api.put(`/api/user/${session.id}`, {
                level,
                currentExperience,
                challengesCompleted,
                accumulatedExperience
            });
        }

        if (session) {
            storeData();
        }
    }, [level, currentExperience, challengesCompleted, accumulatedExperience]);

    const levelUp = useCallback(() => {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }, [level]);

    const startNewChallenge = useCallback(() => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex] as Challenge;

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if ('Notification' in window) {

            if (Notification.permission === 'granted') {
                new Notification('Novo desafio 🎉', {
                    icon: '/favicon.png',
                    body: `Valendo ${challenge.amount} xp`,
                });
            }
        }
    }, []);

    const completeChallenge = useCallback(async () => {
        if (!activeChallenge) return;

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setAccumulatedExperience(accumulatedExperience + amount);
        setChallengesCompleted(challengesCompleted + 1);
    }, [challengesCompleted, activeChallenge]);

    const resetChallenge = useCallback(() => {
        setActiveChallenge(null);
    }, []);

    const closeLevelUpModal = useCallback(() => {
        setIsLevelUpModalOpen(false);
    }, []);

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            experienceToNextLevel,
            challengesCompleted,
            accumulatedExperience,
            levelUp,
            activeChallenge,
            startNewChallenge,
            completeChallenge,
            resetChallenge,
            closeLevelUpModal
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}

export function useChallenges(): ChallengesContextData {
    const context = useContext(ChallengesContext);

    if (!context) {
        throw new Error('shoulbe use with ChallengesContextProvider');
    }

    return context;
}
