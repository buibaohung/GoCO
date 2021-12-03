import {getAxios} from '../utils/http'

export function createEvent(event, to_product_id = "", price = 0, expiry_date = new Date()) {
    return getAxios()
    .then(http => {
        return http.post("/auth/events", {
            event,
            to_product_id,
            price,
            expiry_date,
        })
    })
}