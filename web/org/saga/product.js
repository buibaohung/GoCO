import { put, all, call, takeEvery } from 'redux-saga/effects'
import { MessageAction } from '../redux/message'
import { ProductAction, ProductTypes} from '../redux/product'
import { getProducts, deleteProduct } from '../api/product'

function* getProductRequest({facilityId, offset, limit}) {
    try {
        const { data: {products, pagination}} = yield call(getProducts, facilityId, offset, limit)
        yield put(ProductAction.getProductsSuccess(products, offset, pagination.size))
    } catch (error) {
        yield put(ProductAction.getProductsFailure(error))
    }
}

function* deleteProductRequest({productId}) {
    try {
        yield call(deleteProduct, productId)
        yield put(ProductAction.deleteProductSuccess(productId))
    } catch (error) {
        yield put(ProductAction.deleteProductFailure(error))
    }
}

function* failure({error}) {
    yield put(MessageAction.addError(error))
}

export default function* productSaga() {
    yield all([
        takeEvery(ProductTypes.GET_PRODUCTS_REQUEST, getProductRequest),
        takeEvery(ProductTypes.GET_PRODUCTS_FAILURE, failure),
        takeEvery(ProductTypes.DELETE_PRODUCT_REQUEST, deleteProductRequest),
        takeEvery(ProductTypes.DELETE_PRODUCT_FAILURE, failure),
    ])
}