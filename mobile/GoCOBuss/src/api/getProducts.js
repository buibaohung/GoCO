import {getAxios} from '../utils/http'

export function getProducts(facilityID) {
    return getAxios()
    .then(http => {
        return http.get(`/auth/products?facility_id=${facilityID}&offset=0&limit=-1`)
    })
}