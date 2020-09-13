import querystring from 'querystring'
import {getAxios} from '../utils/http'

export function getProductLots(filter, offset, limit, order_field = "created_at", order_by = "desc") {
    let q = querystring.encode({
        ...filter,
        offset,
        limit,
        order_field,
        order_by,
    })

    return getAxios().get(`/auth/product_items?${q}`)
}

export function deleteProductLot(productLotID) {
    return getAxios().delete(`/auth/product_items/${productLotID}`)
}

export function createProductLot(data) {
    return getAxios().post(`/auth/product_items`, {
        product_item: data
    })
}