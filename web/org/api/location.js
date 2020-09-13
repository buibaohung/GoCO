import {getAxios} from '../utils/http'

export function getLocations(parentCode) {
    return getAxios().get(`/locations?parent_code=${parentCode}`)
}