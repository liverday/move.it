import React from 'react';

import ReactLoading from 'react-loading';

import styles from '../../styles/components/Loader.module.css';

const Loader: React.FC = () => {
    return (
        <div className={styles.container}>
            <ReactLoading type="bars" color="#fff" />
        </div>
    );
}

export default Loader;