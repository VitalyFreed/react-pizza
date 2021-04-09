import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: {
        user: {
            'is_auth': 0
        }
    }

};

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        'setUser': (state, action) => {
            state.data = action.payload;
        },
        'setAuth': (state, action) => {
            state.data.user['is_auth'] = action.payload;
        }
    }
});

export default userReducer.reducer;

export const {setUser, setAuth} = userReducer.actions;

export const getAuth = state => state.userReducer.data.user['is_auth'];

export const getUser = state => state.userReducer.data.user;