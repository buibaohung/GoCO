import { put, all, call, takeEvery } from 'redux-saga/effects'
import { FacilityTypeAction, FacilityTypeTypes} from '../redux/facilityType'
import { getFacilityTypes } from '../api/facilityType'

function* getFacilityTypeRequest() {
    try {
        const types = yield call(getFacilityTypes)
        yield put(FacilityTypeAction.getFacilityTypeSuccess(types.data.facility_types))
    } catch (error) {
        yield put(FacilityTypeAction.getFacilityTypeFailure(error))
    }
}

export default function* facilityTypeSaga() {
    yield all([
        takeEvery(FacilityTypeTypes.GET_FACILITY_TYPE_REQUEST, getFacilityTypeRequest),
    ])
}