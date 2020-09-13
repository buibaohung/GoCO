import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE ={
    isLoading: false,
    isDeleting: false,
    products: [],
    size: 0,
    success: false,
    error: null
}

// action
const { Types, Creators } = createActions({
    getProductsRequest: ['facilityId', 'offset', 'limit'],
    getProductsSuccess: ['products', 'offset', 'size'],
    getProductsFailure: ['error'],

    deleteProductRequest: ['productId'],
    deleteProductSuccess: ['productId'],
    deleteProductFailure: ['error'],
})

export const ProductAction = Creators
export const ProductTypes = Types

// reducer
export const getProductsRequest = (state = INITIAL_STATE, action) => {
    return {...state, isLoading: true}
}

export const getProductsSuccess = (state = INITIAL_STATE, action) => {
    let products = state.products

    if (action.offset > products.length) {
        // allocate memory
        for (let i = products.length; i < action.offset; i++) {
            products.push({})
        }
    }

    products.splice(action.offset, action.products.length, ...action.products)
    return {
        ...state,
        isLoading: false,
        size: action.size,
        products,
    }
}

export const getProductsFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        error: action.error,
    }
}

export const deleteProductRequest = (state = INITIAL_STATE, action) => {
    return {...state, isDeleting: true}
}

export const deleteProductSuccess = (state = INITIAL_STATE, action) => {
    let products = state.products.filter(product=>product.id!=action.productId)
    return {
        ...state,
        isDeleting: false,
        size: state.size - 1,
        products,
    }
}

export const deleteProductFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isDeleting: false,
        error: action.error,
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.GET_PRODUCTS_REQUEST]: getProductsRequest,
    [Types.GET_PRODUCTS_SUCCESS]: getProductsSuccess,
    [Types.GET_PRODUCTS_FAILURE]: getProductsFailure,

    [Types.DELETE_PRODUCT_REQUEST]: deleteProductRequest,
    [Types.DELETE_PRODUCT_SUCCESS]: deleteProductSuccess,
    [Types.DELETE_PRODUCT_FAILURE]: deleteProductFailure,
})