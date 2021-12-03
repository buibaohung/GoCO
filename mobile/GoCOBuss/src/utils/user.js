import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode'

export const setUser = (user) => {
    return AsyncStorage.setItem("user", JSON.stringify(user))
}

export const getUser = async () => {
    let data = await AsyncStorage.getItem("user")
    return data ? JSON.parse(data) : null
}

export const setFacility = (facility) => {
    return AsyncStorage.setItem("facility", JSON.stringify(facility))
}

export const removeFacility = () => {
    return AsyncStorage.removeItem("facility")
}

export const getFacility = async () => {
    let data = await AsyncStorage.getItem("facility")
    return data ? JSON.parse(data) : null
}

export const setOrg = (org) => {
    return AsyncStorage.setItem("org", org)
}

export const removeOrg = () => {
    return AsyncStorage.removeItem("org")
}

export const getOrg = () => {
    return AsyncStorage.getItem("org")
}

export const setToken = (token) => {
    return AsyncStorage.setItem("token", token)
}

export const getToken = async () => {
    let token = await AsyncStorage.getItem("token")
    return token ? token : null
}

export const removeToken = () => {
    return AsyncStorage.removeItem("token")
}

export const checkTokenExpire = (token) => {
    let decoded = jwtDecode(token)
    return decoded.exp*1000 > Date.now()
}