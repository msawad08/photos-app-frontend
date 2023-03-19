import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { logedOut, loginFailed, loginSuccessful, setAppError } from "../reducers/appReducer";
import { verifyAuth, login as loginAction } from "../reducers/appReducer";
import { ApiError, ApiResponse, isApiError, photosBackend } from "../services/api";


export function* verifyLogin(){
    const response:(ApiResponse|ApiError)  = yield call(photosBackend.get, '/login/verify', {})
    if(isApiError(response)){
        yield put(loginFailed(response))
    }else{
        yield put(loginSuccessful(response))

    }
}

export function* login(action: PayloadAction<object>){
    const response:(ApiResponse|ApiError)  = yield call(photosBackend.post, '/login', {data: action.payload})
    if(isApiError(response)){
        if(response.statusCode === 400 || response.statusCode === 404){
            yield put(loginFailed({error: "Login Failed! Invalid Credentials"}))
        }else{
            yield put(loginFailed({error: "Login Failed!"}))
        }
        
    }else{
        yield put(loginSuccessful(response))

    }
}

export function* handleApiErrors(apiError: ApiError){
    if(apiError.statusCode === 401){
        yield put(logedOut({}))
    }else{
        yield put(setAppError ({error: "Data Fetch Failed"}))
    }
}

function* rootIndex(){
    yield takeLatest(verifyAuth.type, verifyLogin);
    yield takeLatest(loginAction.type, login);
}

export default function* appSaga(){
    yield all([
        rootIndex()
    ])
}