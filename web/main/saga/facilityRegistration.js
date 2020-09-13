import { put, all, call, takeEvery } from 'redux-saga/effects'
import { FacilityRegistrationAction, FacilityRegistrationTypes} from '../redux/facilityRegistration'
import { getFacilityRegistrations } from '../api/facilityRegistration'

function* request() {
    try {
        const { data: {facility_registrations}} = yield call(getFacilityRegistrations)
        yield put(FacilityRegistrationAction.getFacilityRegistrationSuccess(facility_registrations))
    } catch (error) {
        yield put(FacilityRegistrationAction.getFacilityRegistrationFailure(error))
    }
}

export default function* locationSaga() {
    yield all([
        takeEvery(FacilityRegistrationTypes.GET_FACILITY_REGISTRATION_REQUEST, request),
    ])
}