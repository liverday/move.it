import React, { useCallback } from 'react';

import { useChallenges } from '../../contexts/ChallengesContext';
import { useCountdown } from '../../contexts/CountdownContext';

import styles from '../../styles/components/ChallengeBox.module.css';

const ChallengeBox: React.FC = () => {
    const { activeChallenge, completeChallenge, resetChallenge } = useChallenges();
    const { resetCountdown } = useCountdown();

    const handleChallengeSucceeded = useCallback(() => {
        completeChallenge();
        resetCountdown();
    }, [completeChallenge, resetCountdown]); 

    const handleChallengeFailed = useCallback(() => {
        resetChallenge();
        resetCountdown();
    }, [resetChallenge, resetCountdown]); 

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Body" />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                            type="button" 
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button 
                            type="button" 
                            className={styles.challengeSucceededButton}
                            onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>
                        Finalize um ciclo para receber um desafio.
                    </strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                        Avance de level completando desafios.
                    </p>
                </div>
            )}
        </div>
    );
}

export default ChallengeBox;