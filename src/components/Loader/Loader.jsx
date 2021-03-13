import React from 'react';
import styles from './loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles['lds-hourglass']}></div>
        </div>
    );
};

export default Loader;