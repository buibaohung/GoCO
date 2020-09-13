import React, { Component } from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import DashboardLayout from '../../components/layouts/Dashboard'
import NewProfileForm from '../../components/NewProfileForm'
import { getProductByID } from '../../api/product'
import { withAuthSync } from '../../utils/auth'

class Profile extends Component {

    constructor(props){
        super(props)

        const {user} = props

        this.state = {
            fields: {
                name: {
                    value: user.name,
                },
                phone_number: {
                    value: user.phone_number,
                },
                avatar: {
                    value: {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: user.avatar,
                    },
                },
            },
        };
    }

    componentDidMount(){
    }

    handleFormChange = changedFields => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));

        return
    };

    handleFormSubmit = e => {
        console.log(this.state);
    }

    render() {
        return (
            <>
                <Head>
                    <title>Dashboard - Profile</title>
                </Head>
                <NewProfileForm
                    {...this.state.fields}
                    onChange={this.handleFormChange}
                    onSubmit={this.handleFormSubmit}
                    loading={false}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({
    
})


var ProfileWithAuth = withAuthSync(connect(mapStateToProps, mapDispatchToProps)(Profile))
ProfileWithAuth.Layout = DashboardLayout;

export default ProfileWithAuth