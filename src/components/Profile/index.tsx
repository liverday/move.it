import React from 'react';

import ReactSwitch from 'react-switch';

import { useChallenges } from '../../contexts/ChallengesContext';
import { useTheme } from '../../contexts/ThemeContext';

import styles from '../../styles/components/Profile.module.css';

import { useSession } from 'next-auth/client';


const Profile: React.FC = () => {
    const { level, accumulatedExperience } = useChallenges();
    const { theme, themeName, toggleTheme } = useTheme();
    const [session] = useSession();

    const { image, name } = session.user;

    return (
        <div className={styles.profileContainer}>
            <img src={image} alt={name} />
            <div>
                <header>
                    <strong>{name}</strong>
                    <p><img src="icons/level.svg" alt="Level Up Icon" />Level {level}</p>
                    <p><span>{accumulatedExperience}</span> xp</p>
                </header>
                <ReactSwitch
                    checked={themeName === 'dark'}
                    height={10}
                    width={40}
                    handleDiameter={20}
                    onChange={toggleTheme}
                    className={styles.themeSwitcher}
                    onColor={theme.blue}
                    offColor={theme.blue}
                    boxShadow="0px 1px 3px rgba(0, 0, 0, 0.3)"
                    uncheckedIcon={false}
                    checkedIcon={false}
                />
            </div>
        </div>
    );
}

export default Profile;