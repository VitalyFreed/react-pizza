import React, {useEffect, useState} from 'react';

import styles from './sortSelect.module.scss';

const SortSelect = () => {
    const [isVisible, setVisible] = useState(false);
    const [isActive, setActive] = useState(2);

    const [items, changeItems] = useState([
        {
            id: 1,
            title: 'цене',
        },
        {
            id: 2,
            title: 'популярности',
        },
        {
            id: 3,
            title: 'алфавиту',
        }
    ]);

    const handleToggleVisibility = e => {
        if (e.target.id !== 'sort-title') {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }

    const handleSetActive = e => {
        setActive(Number(e.target.getAttribute('data-id')));
    }

    const activeItem = items.filter(item => item.id === isActive)[0];

    useEffect(() => document.body.addEventListener('click', handleToggleVisibility), []);

    return (
        <div className={styles['sort-select']}>
            <div className={styles['select-active__container']}>
                <div key={activeItem.id} className={styles['select-active']}>
                    <span onClick={handleToggleVisibility} id='sort-title'>{activeItem.title}</span>
                </div>
            </div>
            <div className={styles['all-select__container']} style={{display: isVisible ? 'inline-block' : 'none'}}>
                <ul className={styles['all-select']}>
                    {
                        items.map(item => {
                            return <li
                                data-id={item.id}
                                onClick={handleSetActive}
                                key={item.id}
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