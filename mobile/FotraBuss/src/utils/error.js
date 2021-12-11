import { Alert } from 'react-native'

export function handleAPIError(error, errorMap = {}) {
    error = error || {}

    let defaultMsg = "Can't handle request"

    if (error.response) {
        let errData = error.response.data
        if (!errData) {
            return defaultMsg
        }

        let errMsg = errorMap[errData.code]
        return errMsg || errData.message || defaultMsg
    } else if (error.request) {
        return "Connection refused"
    }

    return defaultMsg
}

export function showError(msg) {
    Alert.alert("Error", msg)
}

export function showSuccess(msg) {
    Alert.alert("Success", msg)
}