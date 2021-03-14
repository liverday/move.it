import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';

import { useChallenges } from './ChallengesContext';

interface CountdownContextData {
    time: number;
    challengeTime: number;
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown(): void;
    resetCountdown(): void;
}

const CountdownContext = createContext({} as CountdownContextData);

export const CountdownProvider: React.FC = ({ children }) => {
    const { startNewChallenge } = useChallenges();
    const challengeTime = 25 * 60;

    const [time, setTime] = useState(challengeTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const startCountdown = useCallback(() => {
        setIsActive(true);
    }, [isActive, time]);

    const resetCountdown = useCallback(() => {
        setIsActive(false);
        setTime(challengeTime);
        setHasFinished(false);
    }, [])

    useEffect(() => {
        if (isActive && time > 0) {
            const timeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);

            return () => {
                clearTimeout(timeout);
            }
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <CountdownContext.Provider 
            value={{
                time,
                challengeTime,
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}

export function useCountdown(): CountdownContextData {
    const context = useContext(CountdownContext);

    if (!context) {
        throw new Error('shoulde be used with CountdownProvider');
    }

    return context;
}