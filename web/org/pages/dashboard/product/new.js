import React, { Component } from 'react'
import { connect } from 'react-redux';
import Head from 'next/head'
import DashboardLayout from '../../../components/layouts/Dashboard'
import NewProductForm from '../../../components/NewProductForm'
import { withAuthSync } from '../../../utils/auth'
import { showSuccess, showError, handleAPIError } from '../../../utils/error'
import { createProduct } from '../../../api/product'

export class New extends Component {
    defaultFields = {
        name: {
            value: "",
        },
        description: {
            value: "",
        },
        avatar: {
            value: null,
        },
        images: {
            value: [],
        },
    }

    state = {
        loading: false,
        fields: this.defaultFields,
    };

    handleFormChange = changedFields => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));

        return
    };

    handleFormSubmit = e => {
        const { fields } = this.state
        let product = {
            name: fields.name.value,
            facility_id: this.props.facilityInfo.id,
            description: fields.description.value,
        }
        let avatar = fields.avatar.value
        let images = []
        fields.images.value.forEach(img => {
            images.push(img.originFileObj)
        });
        
        this.setState({loading: true})
        createProduct(product, avatar, images)
        .then(()=>{
            showSuccess("Success")
            this.setState({fields: this.defaultFields})
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
                <Head>
                    <title>Dashboard - New Product</title>
                </Head>
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

const mapStateToProps = (state) => ({
    facilityInfo: state.facility.facilityInfo,
})

const mapDispatchToProps = dispatch => ({
})

const NewWrapted = withAuthSync(connect(mapStateToProps, mapDispatchToProps)(New))
NewWrapted.Layout = DashboardLayout;

export default NewWrapted
