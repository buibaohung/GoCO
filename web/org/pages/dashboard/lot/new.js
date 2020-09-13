import React, { Component } from 'react'
import { connect } from 'react-redux';
import Head from 'next/head'
import moment from 'moment'
import DashboardLayout from '../../../components/layouts/Dashboard'
import NewProductLotForm from '../../../components/NewProductLotForm'
import { withAuthSync } from '../../../utils/auth'
import { showSuccess, showError, handleAPIError } from '../../../utils/error'
import { createProductLot } from '../../../api/productLot'

export class New extends Component {
    defaultFields = {
        productId: {
            value: "",
        },
        expiryDate: {
            value: moment(),
        },
        price: {
            value: 1000,
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
        
        let productLot = {
            product_id: fields.productId.value,
            expiry_date: fields.expiryDate.value.format(),
            price: fields.price.value,
        }
        
        this.setState({loading: true})
        createProductLot(productLot)
        .then(({data}) => {
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
                    <title>Dashboard - New Lot</title>
                </Head>
                <NewProductLotForm
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
