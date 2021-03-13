import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    pizzasData: {
        pizzas: []
    },
    tastesData: {
        tastes: [],
        activeTaste: null
    },
    loadingStatus: 'loading'
};

const pizzaReducer = createSlice({
    name: 'pizzaReducer',
    initialState,
    reducers: {
        addPizzas: (state, action) => {
            state.pizzasData = action.payload.pizzas;
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
        }
    }
});

export default pizzaReducer.reducer;

export const {fetch_pizzas, setLoading, addPizzas, changeTaste} = pizzaReducer.actions;

export const getPizzas = state => state.pizzaReducer.pizzasData;

export const getPizzaTastes = state => state.pizzaReducer.tastesData.tastes;

export const getPizzaTastesActive = state => state.pizzaReducer.tastesData.activeTaste;

export const getStatusLoading = state => state.pizzaReducer.loadingStatus;

export const getPizzasFilterByTaste = state => {
    const activeTaste = state.pizzaReducer.tastesData.activeTaste;
    if (activeTaste === state.pizzaReducer.tastesData.tastes[0].id) return state.pizzaReducer.pizzasData;
    return state.pizzaReducer.pizzasData.filter(pizza => pizza.tastes.some(taste => taste['pizza_tastes_id'] === activeTaste));
}
