import React from 'react';
import { useChallenges } from '../../contexts/ChallengesContext';

import styles from '../../styles/components/LevelUpModal.module.css';

const LevelUpModal: React.FC = () => {
    const { level, closeLevelUpModal } = useChallenges();

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar Modal" />
                </button>
            </div>
        </div>
    );
}

export default LevelUpModal;