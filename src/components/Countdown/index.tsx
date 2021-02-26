import React, { useCallback, useState, useEffect } from 'react';

import styles from '../../styles/components/Countdown.module.css';

const Countdown: React.FC = () => {
    const [time, setTime] = useState(25 * 60);
    const [active, setActive] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = minutes.toString().padStart(2, '0').split('');
    const [secondLeft, secondRight] = seconds.toString().padStart(2, '0').split('');

    const startCountdown = useCallback(() => {
        setActive(!active);
    }, [active, time]);

    useEffect(() => {
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
    }, [active, time]);
    
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            <button type="button" className={styles.countdownButton} onClick={startCountdown}>Inciar um ciclo</button>
        </div>
    );
}

export default Countdown;