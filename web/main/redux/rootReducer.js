import { combineReducers } from "redux"
import user, { UserTypes } from "./user";
import facilityType from './facilityType'
import facilityRegistration from './facilityRegistration'
import message from './message'
import location from './location'

const appReducer = combineReducers({
    user,
    facilityType,
    facilityRegistration,
    message,
    location,
});

const rootReducer = (state, action) => {
    if (action.type === UserTypes.SIGNOUT) {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;