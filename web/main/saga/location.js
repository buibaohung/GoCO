import { put, all, call, takeEvery } from 'redux-saga/effects'
import { LocationAction, LocationTypes} from '../redux/location'
import { getLocations } from '../api/location'

function* request({parentCode}) {
    try {
        const { data: {locations}} = yield call(getLocations, parentCode)
        yield put(LocationAction.getLocationsSuccess(parentCode, locations))
    } catch (error) {
        yield put(LocationAction.getLocationsFailure(error))
    }
}

export default function* locationSaga() {
    yield all([
        takeEvery(LocationTypes.GET_LOCATIONS_REQUEST, request),
    ])
}