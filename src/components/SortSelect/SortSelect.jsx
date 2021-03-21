import React from 'react';

import styles from './sortSelect.module.scss';

const SortSelect = ({items, activeItem, isVisible, handleSetActive, isActive}) => {
    return (
        <div className={styles['sort-select']}>
            <div className={styles['select-active__container']}>
                <div key={activeItem.id} className={styles['select-active']}>
                    <span id='sort-title'>{activeItem.title}</span>
                </div>
            </div>
            <div
                className={styles['all-select__container'] + ' ' + (isVisible ? styles['select-visible'] : styles['select-hidden'])}>
                <ul className={styles['all-select']}>
                    {
                        items.map(item => {
                            return <li
                                data-id={item.id}
                                key={item.id}
                                onClick={e => handleSetActive(e, item.sort)}
                                className={styles['select-item'] + ' ' + (item.id === isActive ? styles['select-item-active'] : '')}
                            >
                                {item.title}
                            </li>;
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default SortSelect;