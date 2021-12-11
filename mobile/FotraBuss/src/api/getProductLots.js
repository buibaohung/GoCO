import {getAxios} from '../utils/http'

export function getProductLots(facilityID) {
    return getAxios()
    .then(http => {
        return http.get(`/auth/product_items?facility_id=${facilityID}&offset=0&limit=-1&order_field=created_at&order_by=desc`)
    })
}