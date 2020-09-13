import { createActions, createReducer } from 'reduxsauce'
import { signout as signoutUtil } from '../utils/auth'

const INITIAL_STATE = {
    isSignining: false,
    user: {},
    success: false,
    error: null,

    isLoading: false,
    isDeleting: false,
    users: [],
    size: 0,
}

// action
const { Types, Creators } = createActions({
    signinRequest: ['signData'],
    signinSuccess: ['user'],
    signinFailure: ['error'],
    signout: null,

    getUsersRequest: ['offset', 'limit'],
    getUsersSuccess: ['users', 'offset', 'size'],
    getUsersFailure: ['error'],

    deleteUserRequest: ['userId'],
    deleteUserSuccess: ['userId'],
    deleteUserFailure: ['error'],
})

export const UserAction = Creators
export const UserTypes = Types

// reducer
export const request = (state = INITIAL_STATE, action) => {
    return {...state, isSignining: true}
}

export const success = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSignining: false,
        success: true,
        user: action.user,
    }
}

export const failure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSignining: false,
        error: action.error,
    }
}

export const signout = (state = INITIAL_STATE, action) => {
    signoutUtil();
    return INITIAL_STATE
}

export const getUsersRequest = (state = INITIAL_STATE, action) => {
    return {...state, isLoading: true}
}

export const getUsersSuccess = (state = INITIAL_STATE, action) => {
    let users = state.users

    if (action.offset > users.length) {
        // allocate memory
        for (let i = users.length; i < action.offset; i++) {
            users.push({})
        }
    }

    users.splice(action.offset, action.users.length, ...action.users)
    users = users.slice(0, action.size)
    return {
        ...state,
        isLoading: false,
        size: action.size,
        users,
    }
}

export const getUsersFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        error: action.error,
    }
}

export const deleteUserRequest = (state = INITIAL_STATE, action) => {
    return {...state, isDeleting: true}
}

export const deleteUserSuccess = (state = INITIAL_STATE, action) => {
    let users = state.users.filter(user=>user.id!=action.userId)
    return {
        ...state,
        isDeleting: false,
        size: state.size - 1,
        users,
    }
}

export const deleteUserFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isDeleting: false,
        error: action.error,
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.SIGNIN_REQUEST]: request,
    [Types.SIGNIN_SUCCESS]: success,
    [Types.SIGNIN_FAILURE]: failure,
    [Types.SIGNOUT]: signout,

    [Types.GET_USERS_REQUEST]: getUsersRequest,
    [Types.GET_USERS_SUCCESS]: getUsersSuccess,
    [Types.GET_USERS_FAILURE]: getUsersFailure,

    [Types.DELETE_USER_REQUEST]: deleteUserRequest,
    [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
    [Types.DELETE_USER_FAILURE]: deleteUserFailure,
})