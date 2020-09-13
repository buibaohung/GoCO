import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE ={
    isLoading: false,
    types: [],
}

// action
const { Types, Creators } = createActions({
    getFacilityTypeRequest: null,
    getFacilityTypeSuccess: ['types'],
    getFacilityTypeFailure: ['error'],
})

export const FacilityTypeAction = Creators
export const FacilityTypeTypes = Types

// reducer
export const request = (state = INITIAL_STATE, action) => {
    return {...state, isLoading: true}
}

export const success = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        types: action.types,
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
    [Types.GET_FACILITY_TYPE_REQUEST]: request,
    [Types.GET_FACILITY_TYPE_SUCCESS]: success,
    [Types.GET_FACILITY_TYPE_FAILURE]: failure,
})