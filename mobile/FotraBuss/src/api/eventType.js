import config from '../config'

export function getEventTypes() {
    return fetch(config.apiEndpoint+"/public/event-type", {
        method: "GET",
    })
    .then(res => res.json())
}