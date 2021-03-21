import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    pizzasData: {
        pizzas: []
    },
    tastesData: {
        tastes: [],
        activeTaste: null
    },
    loadingStatus: 'loading',
    user: {
        isAuth: false
    }
};

const pizzaReducer = createSlice({
    name: 'pizzaReducer',
    initialState,
    reducers: {
        addPizzas: (state, action) => {
            state.pizzasData.pizzas = action.payload.pizzas;
            state.tastesData = action.payload.tastesData;
            state.loadingStatus = 'success';
        },
        fetch_pizzas: (state, action) => {
            return state;
        },
        setLoading: (state, action) => {
            state.loadingStatus = 'loading';
        },
        changeTaste: (state, action) => {
            state.tastesData.activeTaste = action.payload.id;
        },
        changeDefaultSize: (state, action) => {
            const index = state.pizzasData.pizzas.indexOf(state.pizzasData.pizzas.find(pizza => pizza.id === action.payload.pizza.id));
            state.pizzasData.pizzas[index]['default_size'] = action.payload.size;

        },
        filterPizzaByPrice: (state, action) => {
            if (action.payload) {
                state.pizzasData.pizzas.sort((a, b) => {
                    const aPrice = a.sizes.find(size => size.size === a['default_size']).price;
                    const bPrice = b.sizes.find(size => size.size === b['default_size']).price;

                    return aPrice - bPrice;
                });
            } else {
                state.pizzasData.pizzas.sort((a, b) => {
                    const aPrice = a.sizes.find(size => size.size === a['default_size']).price;
                    const bPrice = b.sizes.find(size => size.size === b['default_size']).price;

                    return aPrice - bPrice;
                }).reverse();
            }
        },
        filterPizzaByAlphabet: (state, action) => {
            if (action.payload) {
                state.pizzasData.pizzas.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            } else {
                state.pizzasData.pizzas.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                }).reverse();
            }
        },
        filterReverse: (state, action) => {
            state.pizzasData.pizzas.reverse();
        },
        setCurrentFilter: (state, action) => {
            state.pizzasData.currentFilter = action.payload;
        },
        setAuth: (state, action) => {
            state.user.isAuth = action.payload;
        }
    }
});

export default pizzaReducer.reducer;

export const {
    fetch_pizzas,
    setLoading,
    addPizzas,
    changeTaste,
    filterPizzaByPrice,
    changeDefaultSize,
    filterPizzaByAlphabet,
    filterReverse,
    setCurrentFilter,
    setAuth
} = pizzaReducer.actions;

export const getPizzas = state => state.pizzaReducer.pizzasData.pizzas;

export const getPizzaTastes = state => state.pizzaReducer.tastesData.tastes;

export const getPizzaTastesActive = state => state.pizzaReducer.tastesData.activeTaste;

export const getStatusLoading = state => state.pizzaReducer.loadingStatus;

export const getPizzasFilterByTaste = state => {
    const activeTaste = state.pizzaReducer.tastesData.activeTaste;
    if (activeTaste === state.pizzaReducer.tastesData.tastes[0].id) return state.pizzaReducer.pizzasData.pizzas;
    return state.pizzaReducer.pizzasData.pizzas.filter(pizza => pizza.tastes.some(taste => taste['pizza_tastes_id'] === activeTaste));
};

export const getCurrentFilter = state => state.pizzaReducer.pizzasData.currentFilter;

export const getAuth = state => state.pizzaReducer.user.isAuth;