import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE ={
    isLoading: false,
    locations: {},
}

// action
const { Types, Creators } = createActions({
    getLocationsRequest: ['parentCode'],
    getLocationsSuccess: ['parentCode', 'locations'],
    getLocationsFailure: ['error'],
})

export const LocationAction = Creators
export const LocationTypes = Types

// reducer
export const request = (state = INITIAL_STATE, action) => {
    return {...state, isLoading: true}
}

export const success = (state = INITIAL_STATE, action) => {
    let locations = { ...state.locations }
    locations[action.parentCode] = action.locations

    return {
        ...state,
        isLoading: false,
        locations,
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
    [Types.GET_LOCATIONS_REQUEST]: request,
    [Types.GET_LOCATIONS_SUCCESS]: success,
    [Types.GET_LOCATIONS_FAILURE]: failure,
})