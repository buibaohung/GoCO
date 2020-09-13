import { put, all, call, takeEvery } from 'redux-saga/effects'
import { FacilityAction, FacilityTypes} from '../redux/facility'
import { getFacilityInfo } from '../api/facility'

function* getFacilityInfoRequest() {
    try {
        const {data: {facility}} = yield call(getFacilityInfo)
        yield put(FacilityAction.getFacilityInfoSuccess(facility))
    } catch (error) {
        yield put(FacilityAction.getFacilityInfoFailure(error))
    }
}

export default function* facilityTypeSaga() {
    yield all([
        takeEvery(FacilityTypes.GET_FACILITY_INFO_REQUEST, getFacilityInfoRequest),
    ])
}