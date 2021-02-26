import React from 'react';
import styles from '../../styles/components/Profile.module.css';

// import { Container } from './styles';

const Profile: React.FC = () => {
  return (
      <div className={styles.profileContainer}>
          <img src="https://github.com/liverday.png" alt="Vitor Medeiro" />
          <div>
              <strong>Vitor Medeiro</strong>
              <p><img src="icons/level.svg" alt="Level Up Icon" />Level 1</p>
          </div>
      </div>
  );
}

export default Profile;