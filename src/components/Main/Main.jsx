import React, {createRef, useEffect, useRef, useState} from 'react';

import styles from './main.module.scss';
import SortSelect from "../SortSelect/SortSelect";
import Cart from "./Cart/Cart";
import Loader from "../Loader/Loader";

import {
    fetch_pizzas,
    getPizzaTastes,
    getStatusLoading,
    getPizzaTastesActive,
    changeTaste
} from "../../reducers/pizzaReducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Switch, Route, Link} from "react-router-dom";

const Main = () => {
    const dispatch = useDispatch();

    const tastes = useSelector(getPizzaTastes);
    const statusLoading = useSelector(getStatusLoading);
    const tastesActive = useSelector(getPizzaTastesActive);

    const [activeTaste, setActiveTaste] = useState(tastesActive);

    const tastesEng = useRef(['all', 'meat', 'vegan', 'grill', 'spicy', 'closed']);

    useEffect(() => {
        dispatch(fetch_pizzas());
    }, []);

    useEffect(() => {
        setActiveTaste(tastesActive);
    }, [statusLoading]);

    const handleChangeTaste = (id) => {
        setTimeout(() => setActiveTaste(id), 0);
        dispatch(changeTaste({id}));
    }

    return (
        <div className={styles.main}>
            {statusLoading === 'loading' ? <Loader/> :
                <React.Fragment>
                    <div className={styles.categories}>
                        <div className={styles['categories-row']}>
                            {
                                tastes.map((t, i) => <Link to={tastesEng.current[i]}>
                                    <button
                                        key={t.id}
                                        className={styles.category + (activeTaste === t.id ? ' ' + styles.active : '')}
                                        onClick={e => handleChangeTaste(t.id)}
                                    >
                                        <span>{t.taste}</span>
                                    </button>
                                </Link>)
                            }
                        </div>
                        <div className={styles['sort-row']}>
                            <a href="#" className={styles['sort-link']}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                                        fill="#2C2C2C"/>
                                </svg>
                            </a>
                            <div className={styles['sort-title']}><span>Сортировка по:</span></div>
                            <SortSelect/>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path='/'>
                            <Cart/>
                        </Route>
                        {
                            tastes.map((taste, i) => <Route exact path={'/' + tastesEng.current[i]}>
                                <Cart key={taste.id} handleChangeTaste={() => handleChangeTaste(taste.id)}/>
                            </Route>)
                        }
                        <Redirect to="/"/>
                    </Switch>
                </React.Fragment>
            }
        </div>
    );
};

export default Main;