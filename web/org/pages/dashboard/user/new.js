import React, { Component } from 'react'
import { connect } from 'react-redux';
import Head from 'next/head'
import moment from 'moment'
import DashboardLayout from '../../../components/layouts/Dashboard'
import NewUserForm from '../../../components/NewUserForm'
import { withAuthSync } from '../../../utils/auth'
import { showSuccess, showError, handleAPIError } from '../../../utils/error'
import { createUser } from '../../../api/user'

export class New extends Component {
    defaultFields = {
        name: {
            value: "",
        },
        phone_number: {
            value: "",
        },
        password: {
            value: "",
        },
        permission: {
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
        let {name, phone_number, password, permission} = this.state.fields
        let permissionNum = 0;

        permission.value.forEach(perm => {
            switch (perm) {
                case "product":
                    permissionNum |= 15
                    break;
                case "lot":
                    permissionNum |= 240
                    break;
                case "user":
                    permissionNum |= 3840
                    break;
            }
        });

        this.setState({loading: true})
        createUser(name.value, phone_number.value, password.value, permissionNum)
        .then(()=>{
            showSuccess("Successfully create user.")
            this.setState({fields: this.defaultFields})
        })
        .catch(error=>{
            let errMsg = handleAPIError(error)
            showError(errMsg);
        })
        .finally(()=>{
            this.setState({loading: false})
        })
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Dashboard - New User</title>
                </Head>
                <NewUserForm
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
})

const mapDispatchToProps = dispatch => ({
})

const NewWrapted = withAuthSync(connect(mapStateToProps, mapDispatchToProps)(New))
NewWrapted.Layout = DashboardLayout;

export default NewWrapted
