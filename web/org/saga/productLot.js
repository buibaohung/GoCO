import { put, all, call, takeEvery } from 'redux-saga/effects'
import { MessageAction } from '../redux/message'
import { ProductLotAction, ProductLotTypes} from '../redux/productLot'
import { getProductLots, deleteProductLot } from '../api/productLot'

function* getProductLotRequest({filter, offset, limit, order_field, order_by}) {
    try {
        const { data: {product_items, pagination}} = yield call(getProductLots, filter, offset, limit, order_field, order_by)
        yield put(ProductLotAction.getProductLotsSuccess(product_items, offset, pagination.size))
    } catch (error) {
        yield put(ProductLotAction.getProductLotsFailure(error))
    }
}

function* deleteProductLotRequest({productLotId}) {
    try {
        yield call(deleteProductLot, productLotId)
        yield put(ProductLotAction.deleteProductLotSuccess(productLotId))
    } catch (error) {
        yield put(ProductLotAction.deleteProductLotFailure(error))
    }
}

function* failure({error}) {
    yield put(MessageAction.addError(error))
}

export default function* productSaga() {
    yield all([
        takeEvery(ProductLotTypes.GET_PRODUCT_LOTS_REQUEST, getProductLotRequest),
        takeEvery(ProductLotTypes.GET_PRODUCT_LOTS_FAILURE, failure),
        takeEvery(ProductLotTypes.DELETE_PRODUCT_LOT_REQUEST, deleteProductLotRequest),
        takeEvery(ProductLotTypes.DELETE_PRODUCT_LOT_FAILURE, failure),
    ])
}