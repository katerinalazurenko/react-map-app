import {createAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
    route: []
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setRoute: (state, action) => {
            state.route = [...action.payload].map(i => i.reverse());
        },
    },
});

export const buildRouteAction = createAction('map/buildRoute', (coordinates) => {
    return {
        payload: coordinates,
    };
})

export const { setRoute } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
