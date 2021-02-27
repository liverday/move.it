import React from 'react';

import { useChallenges } from '../../contexts/ChallengesContext';

import styles from '../../styles/components/Profile.module.css';


const Profile: React.FC = () => {
    const { level } = useChallenges();

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/liverday.png" alt="Vitor Medeiro" />
            <div>
                <strong>Vitor Medeiro</strong>
                <p><img src="icons/level.svg" alt="Level Up Icon" />Level {level}</p>
            </div>
        </div>
    );
}

export default Profile;