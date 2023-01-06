import { takeEvery, put, call } from 'redux-saga/effects';
import {buildRoute} from "../api";
import {setRoute} from "./reducers/MapSlice";

export function* handleRoute(action) {
    try {
        const { routes } = yield call(buildRoute, action.payload);
        const route = routes[0].geometry.coordinates;
        yield put(setRoute(route));
    } catch {
        yield console.log('error');
    }
}

export function* watchClickSaga() {
    yield takeEvery('map/buildRoute', handleRoute);
}

export default function* rootSaga() {
    yield watchClickSaga();
}