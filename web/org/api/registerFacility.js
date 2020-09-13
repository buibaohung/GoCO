import {getAxios} from '../utils/http'

export default function registerFacility(data) {
    return getAxios().post("/public/facility-registration", data)
}