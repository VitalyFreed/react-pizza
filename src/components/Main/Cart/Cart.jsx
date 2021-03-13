import React, {useEffect, useState} from 'react';
import styles from './cart.module.scss';

import PizzaCard from "./PizzaCard";

import {getPizzasFilterByTaste} from "../../../reducers/pizzaReducer";
import {useSelector} from "react-redux";

const Cart = ({handleChangeTaste}) => {
    const pizzas = useSelector(getPizzasFilterByTaste);

    useEffect(() => {
        if (handleChangeTaste) {
            handleChangeTaste();
        }
    }, []);

    return (
        <div className={styles.carts}>
            <h1 className={styles['carts-title']}>Все пиццы</h1>
            <div className={styles['pizza-items']}>
                {
                    pizzas.map(pizza => <PizzaCard key={pizza.id} pizza={pizza}/>)
                }
            </div>
        </div>
    );
};

export default Cart;