import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import {filterPizzaByPrice, setCurrentFilter, filterPizzaByAlphabet} from "../../reducers/pizzaReducer";
import SortSelect from "./SortSelect";

const SortSelectContainer = ({items, filterNormal}) => {
    const [isVisible, setVisible] = useState(false);
    const [isActive, setActive] = useState(2);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentFilter(isActive));
    }, [isActive]);

    useEffect(() => {
        document.body.removeEventListener('click', handleToggleVisibility);
        document.body.addEventListener('click', handleToggleVisibility);
    }, [isVisible]);

    const handleToggleVisibility = e => {
        if (isVisible) {
            setVisible(false);
        } else if (e.target.id === 'sort-title' && !isVisible) {
            setVisible(true);
        }
    }

    const handleSetActive = (e, sort) => {
        switch (sort) {
            case 'price':
                dispatch(filterPizzaByPrice(filterNormal));
                break;
            case 'alphabet':
                dispatch(filterPizzaByAlphabet(filterNormal));
                break;

        }
        setActive(Number(e.target.getAttribute('data-id')));
    }

    const activeItem = items.filter(item => item.id === isActive)[0];

    return (
        <SortSelect
            items={items}
            activeItem={activeItem}
            isVisible={isVisible}
            handleSetActive={handleSetActive}
            isActive={isActive}
        />
    );
};

export default SortSelectContainer;