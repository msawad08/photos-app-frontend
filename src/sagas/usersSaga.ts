import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { closeError } from "../reducers/appReducer";
import { getAllUsersFailure, getAllUsersSuccess, userDataSelector, getAllUsers as getAllUsersAction } from "../reducers/userReducer";
import { ApiError, ApiResponse, isApiError, photosBackend } from "../services/api";
import { handleApiErrors } from "./appSaga";


export function* getAllUsers(){
    let {rowsPerPage, page} = yield select(userDataSelector);
    const response:(ApiResponse|ApiError)  = yield call(photosBackend.get, '/app/users', {params: {rowsPerPage, page: page + 1}})
    if(isApiError(response)){
        yield put(getAllUsersFailure(response))
        yield call(handleApiErrors,response)
    }else{
        yield put(getAllUsersSuccess(response))
        yield put(closeError({}))


    }
}


function* rootIndex(){
    yield takeLatest(getAllUsersAction.type, getAllUsers)
}

export default function* userSaga(){
    yield all([
        rootIndex()
    ])
}