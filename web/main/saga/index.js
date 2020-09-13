import { fork, all } from 'redux-saga/effects'
import userSaga from './user'
import facilityTypeSaga from './facilityType'
import facilityRegistration from './facilityRegistration'
import locationSaga from './location'

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(facilityTypeSaga),
        fork(facilityRegistration),
        fork(locationSaga),
    ])
}
