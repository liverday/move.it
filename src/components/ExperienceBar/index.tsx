import React from 'react';
import styles from '../../styles/components/ExperienceBar.module.css';

interface ExperienceBarProps {

}

const ExperienceBar: React.FC = () => {
  return (
      <header className={styles.experienceBar}>
        <span>0 xp</span>
        <div>
            <div style={{ width: '50%' }}/>

            <span className={styles.currentExperience} style={{ left: '50%'}}>300 xp</span>
        </div>
        <span>600 xp</span>
      </header>
  );
}

export default ExperienceBar;