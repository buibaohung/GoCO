import { put, all, call, takeEvery } from 'redux-saga/effects'
import Router from 'next/router'
import { UserAction, UserTypes } from '../redux/user'
import { MessageAction } from '../redux/message'
import { signin } from '../api/auth'
import { getUsers, deleteUser } from '../api/user'
import { handleAPIError } from '../utils/error'
import { storeToken } from '../utils/auth'

function* signinRequest({signData}) {
    try {
        const {data: {user, token}} = yield call(signin, signData)
        storeToken({token})
        yield put(UserAction.signinSuccess(user))
    } catch (error) {
        let errMsg = handleAPIError(error)
        yield put(UserAction.signinFailure(errMsg))
    }
}

function* signinSuccess() {
    setTimeout(() => {
        window.location.href = window.location.origin + "/dashboard"
    }, 1000);
    // Router.push("/dashboard", "/dashboard", {shallow: true})
}

function* failure({error}) {
    yield put(MessageAction.addError(error))
}

function* getUserRequest({offset, limit}) {
    try {
        const { data: {users, pagination}} = yield call(getUsers, offset, limit)
        yield put(UserAction.getUsersSuccess(users, offset, pagination.size))
    } catch (error) {
        yield put(UserAction.getUsersFailure(error))
    }
}

function* deleteUserRequest({userId}) {
    try {
        yield call(deleteUser, userId)
        yield put(UserAction.deleteUserSuccess(userId))
    } catch (error) {
        yield put(UserAction.deleteUserFailure(error))
    }
}

export default function* authSaga() {
    yield all([
        takeEvery(UserTypes.SIGNIN_REQUEST, signinRequest),
        takeEvery(UserTypes.SIGNIN_SUCCESS, signinSuccess),
        takeEvery(UserTypes.SIGNIN_FAILURE, failure),

        takeEvery(UserTypes.GET_USERS_REQUEST, getUserRequest),
        takeEvery(UserTypes.GET_USERS_FAILURE, failure),

        takeEvery(UserTypes.DELETE_USER_REQUEST, deleteUserRequest),
        takeEvery(UserTypes.DELETE_USER_FAILURE, failure),
    ])
}