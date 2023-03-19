import { all } from "redux-saga/effects"
import appSaga from "./appSaga"
import userSaga from "./usersSaga"

export default function* rootSaga(){
    yield all([
        userSaga(),
        appSaga(),
    ])
}