import http from '../utils/http'

export function getFacilityRegistrations() {
    return http.get(`/admin/facility-registration/`)
}

export function accept(id) {
    return http.put(`/admin/facility-registration/${id}/accept`)
}

export function reject(id) {
    return http.put(`/admin/facility-registration/${id}/reject`)
}