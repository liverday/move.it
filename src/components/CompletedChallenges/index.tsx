import React from 'react';

import { useChallenges } from '../../contexts/ChallengesContext';

import styles from '../../styles/components/CompletedChallenges.module.css';


const CompletedChallenges: React.FC = () => {
  const { challengesCompleted } = useChallenges();

  return (
      <div className={styles.completedChallengesContainer}>
          <span>Desafios Completos</span>
          <span>{challengesCompleted}</span>
      </div>
  );
}

export default CompletedChallenges;