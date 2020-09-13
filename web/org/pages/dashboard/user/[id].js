import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import DashboardLayout from '../../../components/layouts/Dashboard'
import NewUserForm from '../../../components/NewUserForm'
import { getUserByID, updateUser } from '../../../api/user'
import { withAuthSync } from '../../../utils/auth'
import { showSuccess, showError, handleAPIError } from '../../../utils/error'

class EditUser extends Component {
    static async getInitialProps(ctx){
        const {id} = ctx.query
        const {data} = await getUserByID(id)
        return {user: data}
    }

    constructor(props){
        super(props)

        const {user} = props
        let perms = []

        let availablePerms = [
            {
                value: 'product',
                code: 1,
            },
            {
                value: 'lot',
                code: 16,
            },
            {
                value: 'user',
                code: 256,
            },
        ]
        availablePerms.forEach(availablePerm => {
            if ((user.permission&availablePerm.code) == availablePerm.code) {
                perms.push(availablePerm.value)
            }
        });

        this.state = {
            loading: false,
            fields: {
                name: {
                    value: user.name,
                },
                phone_number: {
                    value: user.phone_number,
                },
                password: {
                    value: "default",
                },
                confirm: {
                    value: "default",
                },
                permission: {
                    value: perms,
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
        
        updateUser(this.props.user.id, name.value, phone_number.value, password.value, permissionNum)
        .then(()=>{
            showSuccess("Successfully update user.")
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
            <NewUserForm
                {...this.state.fields}
                onChange={this.handleFormChange}
                onSubmit={this.handleFormSubmit}
                loading={this.state.loading}
            />
        )
    }
}

var EditUserWithRouter = withAuthSync(withRouter(EditUser))
EditUserWithRouter.Layout = DashboardLayout;

export default EditUserWithRouter
