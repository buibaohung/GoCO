import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE ={
    isLoading: false,
    facilityInfo: null,
}

// action
const { Types, Creators } = createActions({
    getFacilityInfoRequest: null,
    getFacilityInfoSuccess: ['facilityInfo'],
    getFacilityInfoFailure: ['error'],
})

export const FacilityAction = Creators
export const FacilityTypes = Types

// reducer
export const request = (state = INITIAL_STATE, action) => {
    return {...state, isLoading: true}
}

export const success = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        facilityInfo: action.facilityInfo,
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
    [Types.GET_FACILITY_INFO_REQUEST]: request,
    [Types.GET_FACILITY_INFO_SUCCESS]: success,
    [Types.GET_FACILITY_INFO_FAILURE]: failure,
})