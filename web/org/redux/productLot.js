import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE ={
    isLoading: false,
    isDeleting: false,
    productLots: [],
    size: 0,
    success: false,
    error: null
}

// action
const { Types, Creators } = createActions({
    getProductLotsRequest: ['filter', 'offset', 'limit', 'order_field', 'order_by'],
    getProductLotsSuccess: ['productLots', 'offset', 'size'],
    getProductLotsFailure: ['error'],

    deleteProductLotRequest: ['productLotId'],
    deleteProductLotSuccess: ['productLotId'],
    deleteProductLotFailure: ['error'],
})

export const ProductLotAction = Creators
export const ProductLotTypes = Types

// reducer
export const getProductLotsRequest = (state = INITIAL_STATE, action) => {
    return {...state, isLoading: true}
}

export const getProductLotsSuccess = (state = INITIAL_STATE, action) => {
    let productLots = state.productLots

    if (action.offset > productLots.length) {
        // allocate memory
        for (let i = productLots.length; i < action.offset; i++) {
            productLots.push({})
        }
    }

    // end of list
    if (action.productLots.length == 0) {
        productLots.splice(action.offset, productLots.length)
    }

    productLots.splice(action.offset, action.productLots.length, ...action.productLots)

    // only get "size". in case, new data in less than local data
    productLots.splice(action.size, productLots.length)
    return {
        ...state,
        isLoading: false,
        size: action.size,
        productLots,
    }
}

export const getProductLotsFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        error: action.error,
    }
}

export const deleteProductLotRequest = (state = INITIAL_STATE, action) => {
    return {...state, isDeleting: true}
}

export const deleteProductLotSuccess = (state = INITIAL_STATE, action) => {
    let productLots = state.productLots.filter(lot=>lot.id!=action.productLotId)
    return {
        ...state,
        isDeleting: false,
        size: state.size - 1,
        productLots,
    }
}

export const deleteProductLotFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isDeleting: false,
        error: action.error,
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.GET_PRODUCT_LOTS_REQUEST]: getProductLotsRequest,
    [Types.GET_PRODUCT_LOTS_SUCCESS]: getProductLotsSuccess,
    [Types.GET_PRODUCT_LOTS_FAILURE]: getProductLotsFailure,

    [Types.DELETE_PRODUCT_LOT_REQUEST]: deleteProductLotRequest,
    [Types.DELETE_PRODUCT_LOT_SUCCESS]: deleteProductLotSuccess,
    [Types.DELETE_PRODUCT_LOT_FAILURE]: deleteProductLotFailure,
})