import querystring from 'querystring'
import http from '../utils/http'

export function getProducts(facilityId, offset = 0, limit = 10) {
    let q = querystring.encode({
        facility_id: facilityId,
        offset,
        limit,
    })
    
    let minDuration = 300
    return new Promise((resolve, reject) => {
        let start = Date.now()
        http.get(`/auth/products?${q}`)
        .then(data=>{
            let diff = Date.now() - start
            
            if (diff > minDuration) {
                diff = minDuration
            }

            setTimeout(() => {
                resolve(data)
            }, minDuration - diff);
        })
        .catch(reject)
    })
}

export function createProduct(product, avatar, images = []) {
    let formData = new FormData();
    formData.append("product", JSON.stringify(product));
    formData.append("avatar", avatar);
    images.forEach(image => {
        formData.append("images", image);
    });
    return http.post(`/auth/products`,
        formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },
    )
}

export function deleteProduct(productID) {
    return http.delete(`/auth/products/${productID}`)
}

export function getProductByID(productID) {
    return http.get(`/public/product/${productID}`)
}