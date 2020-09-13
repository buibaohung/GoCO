import eos from './index'

export const createProduct = (id, name, facility_id) => {
    let data = {
        id,
        _name: name,
        facility_id,
    }
    return eos.callAction("newproduct", data)
}

export const deleteProduct = (id) => {
    let data = {
        id,
    }
    return eos.callAction("delproduct", data)
}

export const updateProductName = (id, name) => {
    let data = {
        id,
        _name: name,
    }
    return eos.callAction("updproname", data)
}