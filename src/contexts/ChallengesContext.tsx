import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

import challenges from '../../challenges.json';

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
    levelUp(): void;
    activeChallenge: Challenge;
    startNewChallenge(): void;
    completeChallenge(): void;
    resetChallenge(): void;
}

export const ChallengesContext = createContext({ } as ChallengesContextData);

export const ChallengesProvider: React.FC = ({ children }) => {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, []);
    
    const levelUp = useCallback(() => {
        setLevel(level + 1);
    }, [level]);

    const startNewChallenge = useCallback(() => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex] as Challenge;

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount} xp`, 
            });
        }
    }, []);

    const completeChallenge = useCallback(() => {
        if (!activeChallenge) return;

        const { amount } = activeChallenge;
        
        let finalExperience = currentExperience + amount;
        
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }, [challengesCompleted, activeChallenge]);

    const resetChallenge = useCallback(() => {
        setActiveChallenge(null);
    }, []);

    return (
        <ChallengesContext.Provider value={{ 
            level, 
            currentExperience, 
            experienceToNextLevel,
            challengesCompleted, 
            levelUp,
            activeChallenge,
            startNewChallenge,
            completeChallenge,
            resetChallenge,
        }}>
            {children}
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
