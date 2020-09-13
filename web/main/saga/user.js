import { put, all, call, takeEvery } from 'redux-saga/effects'
import Router from 'next/router'
import { UserAction, UserTypes } from '../redux/user'
import { MessageAction } from '../redux/message'
import { signin } from '../api/auth'
import { handleAPIError } from '../utils/error'
import { storeToken } from '../utils/auth'
import { newAxios } from '../utils/http'

function* signinRequest({signData}) {
    try {
        const {data: {user, facilities, token}} = yield call(signin, signData)
        storeToken({token})
        newAxios()
        yield put(UserAction.signinSuccess(user, facilities))
    } catch (error) {
        let errMsg = handleAPIError(error)
        yield put(UserAction.signinFailure(errMsg))
    }
}

function* signinSuccess() {
    setTimeout(() => {
        window.location.href = window.location.origin + "/admin"
    }, 1000);
}

function* signinFailure({error}) {
    yield put(MessageAction.addError(error))
}

export default function* authSaga() {
    yield all([
        takeEvery(UserTypes.SIGNIN_REQUEST, signinRequest),
        takeEvery(UserTypes.SIGNIN_SUCCESS, signinSuccess),
        takeEvery(UserTypes.SIGNIN_FAILURE, signinFailure),
    ])
}