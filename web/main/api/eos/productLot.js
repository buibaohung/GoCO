import eos from './index'

export const createProductLot = (id, productId, fromProductItemId) => {
    let data = {
        id,
        productId,
        fromProductItemId: fromProductItemId || "0",
    }
    return eos.callAction("newpitem", data)
}

export const deleteProductLot = (id) => {
    let data = {
        id,
    }
    return eos.callAction("delproitem", data)
}

export const updateProductName = (id, name) => {
    let data = {
        id,
        _name: name,
    }
    return eos.callAction("updproname", data)
}