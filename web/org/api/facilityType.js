import {getAxios} from '../utils/http'

export function getFacilityTypes() {
    return getAxios().get("/public/facility-type")
}