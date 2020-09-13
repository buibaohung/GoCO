import querystring from 'querystring'
import http from '../utils/http'

export function getProductLots(filter, offset, limit, order_field = "created_at", order_by = "desc") {
    let q = querystring.encode({
        ...filter,
        offset,
        limit,
        order_field,
        order_by,
    })

    return http.get(`/auth/product_items?${q}`)
}

export function deleteProductLot(productLotID) {
    return http.delete(`/auth/product_items/${productLotID}`)
}

export function createProductLot(data) {
    return http.post(`/auth/product_items`, {
        product_item: data
    })
}