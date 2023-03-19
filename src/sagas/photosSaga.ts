import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { closeError } from "../reducers/appReducer";
import { getAllPhotosFailure, getAllPhotosSuccess, photoDataSelector, getAllPhotos as getAllPhotosAction } from "../reducers/photosReducer";
import { ApiError, ApiResponse, isApiError, photosBackend } from "../services/api";
import { handleApiErrors } from "./appSaga";


export function* getAllphotos(){
    let {rowsPerPage, page} = yield select(photoDataSelector);
    const response:(ApiResponse|ApiError)  = yield call(photosBackend.get, '/app/photos', {params: {rowsPerPage, page: page + 1}})
    if(isApiError(response)){
        yield put(getAllPhotosFailure(response))
        yield call(handleApiErrors,response)
    }else{
        yield put(getAllPhotosSuccess(response))
        yield put(closeError({}))

    }
}


function* rootIndex(){
    yield takeLatest(getAllPhotosAction.type, getAllphotos)
}

export default function* photoSaga(){
    yield all([
        rootIndex()
    ])
}