import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { getAllPhotosFailure, getAllPhotosSuccess, photoDataSelector, getAllPhotos as getAllPhotosAction } from "../reducers/photosReducer";
import { ApiError, ApiResponse, isApiError, photosBackend } from "../services/api";


export function* getAllphotos(){
    let {rowsPerPage, page} = yield select(photoDataSelector);
    const response:(ApiResponse|ApiError)  = yield call(photosBackend.get, '/app/photos', {params: {rowsPerPage, page: page + 1}})
    if(isApiError(response)){
        yield put(getAllPhotosFailure(response))
    }else{
        yield put(getAllPhotosSuccess(response))

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