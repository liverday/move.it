import React from 'react';

import ReactSwitch from 'react-switch';

import { useChallenges } from '../../contexts/ChallengesContext';
import { useTheme } from '../../contexts/ThemeContext';

import styles from '../../styles/components/Profile.module.css';


const Profile: React.FC = () => {
    const { level } = useChallenges();
    const { theme, themeName, toggleTheme } = useTheme();

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/liverday.png" alt="Vitor Medeiro" />
            <div>
                <header>
                    <strong>Vitor Medeiro</strong>
                    <p><img src="icons/level.svg" alt="Level Up Icon" />Level {level}</p>
                </header>
                <ReactSwitch
                    checked={themeName === 'dark'}
                    height={15}
                    width={50}
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