import querystring from 'querystring'
import { getAxios } from '../utils/http'

export function getProducts(facilityId, offset = 0, limit = 10) {
    let q = querystring.encode({
        facility_id: facilityId,
        offset,
        limit,
    })

    let minDuration = 300
    return new Promise((resolve, reject) => {
        let start = Date.now()
        getAxios().get(`/auth/products?${q}`)
            .then(data => {
                let diff = Date.now() - start

                if (diff > minDuration) {
                    diff = minDuration
                }

                data.data.products = data.data.products.map(p => {
                    p.avatar = p.avatar.replace(process.env.IPFS_IP, process.env.IPFS_BASE_URL)
                    return p;
                });

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
    return getAxios().post(`/auth/products`,
        formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },
    )
}

export function updateProduct(id, product, avatar, images = [], delete_image_ids = []) {
    let formData = new FormData();

    formData.append("product", JSON.stringify(product));
    formData.append("delete_image_ids", JSON.stringify(delete_image_ids));
    if (avatar) {
        formData.append("avatar", avatar);
    }
    images.forEach(image => {
        formData.append("images", image);
    });

    return getAxios().put(`/auth/products/${id}`,
        formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },
    )
}

export function deleteProduct(productID) {
    return getAxios().delete(`/auth/products/${productID}`)
}

export function getProductByID(productID) {
    return getAxios().get(`/public/products/${productID}`)
        .then(result => {
            result.data.avatar = result.data.avatar.replace(process.env.IPFS_IP, process.env.IPFS_BASE_URL);
            result.data.images = result.data.images.map(i => i.replace(process.env.IPFS_IP, process.env.IPFS_BASE_URL));
            return result
        })
}