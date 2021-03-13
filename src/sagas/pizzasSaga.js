import {takeEvery, put, call} from 'redux-saga/effects';

import {setLoading, addPizzas} from "../reducers/pizzaReducer";

import {fetchApi} from "../server/api";

const delay = async (ms) => {
    return new Promise(res => setTimeout(res, ms));
}

function* fetchPizzas() {
    yield put(setLoading());
    const data = yield call(() => fetchApi('http://localhost:3001'));
    yield call(() => delay(1000));
    yield put(addPizzas(data));
}

function* pizzasSaga() {
    yield takeEvery('pizzaReducer/fetch_pizzas', fetchPizzas);
}

export default pizzasSaga;