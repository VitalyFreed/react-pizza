import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Switch, Route, Link} from "react-router-dom";

import styles from './main.module.scss';
import Cart from "./Cart/Cart";
import Loader from "../Loader/Loader";

import {
    fetch_pizzas,
    getPizzaTastes,
    getStatusLoading,
    getPizzaTastesActive,
    changeTaste,
    filterReverse,
    getCurrentFilter,
} from "../../reducers/pizzaReducer";
import SortSelectContainer from "../SortSelect/SortSelectContainer";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";

const Main = () => {
    const dispatch = useDispatch();

    const items = [
        {
            id: 1,
            title: 'цене',
            sort: 'price'
        },
        {
            id: 2,
            title: 'популярности',
            sort: 'rating'
        },
        {
            id: 3,
            title: 'алфавиту',
            sort: 'alphabet'
        }
    ];

    const tastes = useSelector(getPizzaTastes);
    const statusLoading = useSelector(getStatusLoading);
    const tastesActive = useSelector(getPizzaTastesActive);
    const currentFilter = useSelector(getCurrentFilter);

    const [filterNormal, setFilterNormal] = useState(true);

    const tastesEng = useRef(['', 'meat', 'vegan', 'grill', 'spicy', 'closed']);

    useEffect(() => {
        dispatch(fetch_pizzas());
    }, []);

    const handleChangeTaste = (id) => {
        dispatch(changeTaste({id}));
    };

    const handleToggleSortByPrice = e => {
        e.preventDefault();
        setFilterNormal(filterNormal => !filterNormal)
        dispatch(filterReverse(currentFilter));
    };

    return (
        <div className={styles.main}>
            {statusLoading === 'loading' ? <Loader/> :
                <React.Fragment>
                    <div className={styles.categories}>
                        <div className={styles['categories-row']}>
                            {
                                tastes.map((t, i) => <Link to={'/pizzas/' + tastesEng.current[i]}>
                                    <button
                                        key={t.id}
                                        className={styles.category + (tastesActive === t.id ? ' ' + styles.active : '')}
                                        onClick={e => handleChangeTaste(t.id)}
                                    >
                                        <span>{t.taste}</span>
                                    </button>
                                </Link>)
                            }
                        </div>
                        <div className={styles['sort-row']}>
                            <a
                                href="#"
                                className={styles['sort-link']}
                                onClick={handleToggleSortByPrice}
                            >
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                                     style={{transform: filterNormal ? 'rotate(180deg)' : 'rotate(0deg)'}}
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                                        fill="#2C2C2C"/>
                                </svg>
                            </a>
                            <div className={styles['sort-title']}><span>Сортировка по:</span></div>
                            <SortSelectContainer items={items} filterNormal={filterNormal}/>
                        </div>
                    </div>
                    <Switch>
                        {
                            tastes.map((taste, i) => <Route exact path={'/pizzas/' + tastesEng.current[i]}>
                                <Cart key={taste.id} handleChangeTaste={() => handleChangeTaste(taste.id)}/>
                            </Route>)
                        }
                        <Route exact path='/pizzas/profile'>
                            <Profile/>
                        </Route>
                    </Switch>
                </React.Fragment>
            }
        </div>
    );
};

export default Main;