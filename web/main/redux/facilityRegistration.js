import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE ={
    isLoading: false,
    facilityRegistrations: [],
}

// action
const { Types, Creators } = createActions({
    getFacilityRegistrationRequest: null,
    getFacilityRegistrationSuccess: ['facilityRegistrations'],
    getFacilityRegistrationFailure: ['error'],
})

export const FacilityRegistrationAction = Creators
export const FacilityRegistrationTypes = Types

// reducer
export const request = (state = INITIAL_STATE, action) => {
    return {...state, isLoading: true}
}

export const success = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        facilityRegistrations: action.facilityRegistrations,
    }
}

export const failure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        error: action.error,
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.GET_FACILITY_REGISTRATION_REQUEST]: request,
    [Types.GET_FACILITY_REGISTRATION_SUCCESS]: success,
    [Types.GET_FACILITY_REGISTRATION_FAILURE]: failure,
})