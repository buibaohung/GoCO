import { fork, all } from 'redux-saga/effects'
import userSaga from './user'
import facilitySaga from './facility'
import facilityTypeSaga from './facilityType'
import locationSaga from './location'
import productSaga from './product'
import productLotSaga from './productLot'

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(facilitySaga),
        fork(facilityTypeSaga),
        fork(locationSaga),
        fork(productSaga),
        fork(productLotSaga),
    ])
}
