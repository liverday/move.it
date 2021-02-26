import React from 'react';

import styles from '../../styles/components/CompletedChallenges.module.css';

// import { Container } from './styles';

const CompletedChallenges: React.FC = () => {
  return (
      <div className={styles.completedChallengesContainer}>
          <span>Desafios Completos</span>
          <span>5</span>
      </div>
  );
}

export default CompletedChallenges;