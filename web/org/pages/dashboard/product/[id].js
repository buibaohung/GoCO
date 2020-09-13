import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import DashboardLayout from '../../../components/layouts/Dashboard'
import NewProductForm from '../../../components/NewProductForm'
import { getProductByID, updateProduct } from '../../../api/product'
import { showSuccess, showError, handleAPIError } from '../../../utils/error'
import { withAuthSync } from '../../../utils/auth'

class EditProduct extends Component {

    static async getInitialProps(ctx){
        const {id} = ctx.query
        const {data} = await getProductByID(id)
        return {product: data}
    }

    constructor(props){
        super(props)

        const {product} = props

        let images = []

        if (product.images) {
            product.images.forEach((img, index) => {
                images.push({
                    uid: `-${index+1}`,
                    name: 'image.png',
                    status: 'done',
                    url: img,
                })
            });
        }

        this.state = {
            loading: false,
            fields: {
                name: {
                    value: product.name,
                },
                description: {
                    value: product.description,
                },
                avatar: {
                    value: {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: product.avatar,
                    },
                },
                images: {
                    value: images,
                },
            },
        };
    }

    handleFormChange = changedFields => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));

        return
    };

    handleFormSubmit = e => {
        console.log(this.state);
        let {product} = this.props
        const { fields } = this.state
        let productToUpdate = {
            name: fields.name.value,
            description: fields.description.value,
        }

        let avatar;
        if (fields.avatar.value.uid != "-1") {
            avatar = fields.avatar.value
        }

        let images = []
        fields.images.value.forEach(img => {
            if (img.uid != "-1") {
                images.push(img.originFileObj)
            }
        });

        let delete_image_ids = []
        product.raw_images.forEach(raw_image => {
            // check exist
            let exist = fields.images.value.find(i => {
                if(!i.url) return false
                return i.url.includes(raw_image.image_id)
            })

            if (!exist) {
                delete_image_ids.push(raw_image.id)
            }
        });
        
        this.setState({loading: true})
        updateProduct(product.id, productToUpdate, avatar, images, delete_image_ids)
        .then(()=>{
            showSuccess("Success")
        })
        .catch(err=>{
            let errMsg = handleAPIError(err)
            showError(errMsg)
        })
        .finally(()=>this.setState({loading: false}))
    }

    render() {
        return (
            <div>
                <NewProductForm
                    {...this.state.fields}
                    onChange={this.handleFormChange}
                    onSubmit={this.handleFormSubmit}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

var EditProductWithRouter = withAuthSync(withRouter(EditProduct))
EditProductWithRouter.Layout = DashboardLayout;

export default EditProductWithRouter
