import { combineReducers } from "redux"
import user, { UserTypes } from "./user";
import facility from './facility'
import facilityType from './facilityType'
import message from './message'
import location from './location'
import product from './product'
import productLot from './productLot'

const appReducer = combineReducers({
    user,
    facility,
    facilityType,
    message,
    location,
    product,
    productLot,
});

const rootReducer = (state, action) => {
    if (action.type === UserTypes.SIGNOUT) {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;