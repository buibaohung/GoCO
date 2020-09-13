import querystring from 'querystring'
import {getAxios} from '../utils/http'

export function getUsers(offset = 0, limit = 10) {
    let q = querystring.encode({
        offset,
        limit,
    })
    return getAxios().get(`/auth/users?${q}`)
}

export function deleteUser(userID) {
    return getAxios().delete(`/auth/users/${userID}`)
}

export function createUser(name, phone_number, password, permission = 0) {
    return getAxios().post(`/auth/users`, {
        user: {name, phone_number, permission},
        password,
    })
}

export function getUserByID(userID) {
    return getAxios().get(`/auth/users/${userID}`)
}

export function updateUser(userID, name, phone_number, password, permission = 0) {
    return getAxios().put(`/auth/users/${userID}`, {
        name,
        phone_number,
        permission,
    })
}