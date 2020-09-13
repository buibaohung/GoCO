import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { connect } from 'react-redux'
import { List, Avatar, Button, Skeleton, Spin } from 'antd';
import { FacilityRegistrationAction } from '../../redux/facilityRegistration'
import { UserAction } from '../../redux/user'
import { accept as acceptAPI, reject as rejectAPI } from '../../api/facilityRegistration'
import { withAuthSync } from '../../utils/auth'
import { handleAPIError, showError } from '../../utils/error'
import StoreIcon from "../../assert/images/retail-store.png"
import css from '../../assert/styles/admin/facilityRegistration.scss'

class Admin extends Component {
    state = {
        loading: false,
    }

    componentDidMount(){
        this.props.getFacilityRegistration();
    }

    accept = (id) => {
        this.setState({loading: true})

        acceptAPI(id)
        .catch(error => {
            let errMsg = handleAPIError(error)
            showError(errMsg)
        })
        .finally(() => {
            this.props.getFacilityRegistration();
            this.setState({loading: false})
        })
    }

    reject = (id) => {
        this.setState({loading: true})

        rejectAPI(id)
        .catch(error => {
            let errMsg = handleAPIError(error)
            showError(errMsg)
        })
        .finally(() => {
            this.props.getFacilityRegistration();
            this.setState({loading: false})
        })
    }

    render() {
        let {facilityRegistrations, isLoading} = this.props
        return (
            <>
                <Head>
                    <title>Facility Register - Admin</title>
                </Head>
                <Button
                    className={css.signoutbtn}
                    onClick={() => this.props.signout()}
                >
                    Signout
                </Button>
                <div className={css.list}>
                    <Spin spinning={this.props.isLoading || this.state.loading} style={{maxHeight: "none"}}>
                        <List
                            loading={isLoading}
                            itemLayout="horizontal"
                            dataSource={facilityRegistrations}
                            renderItem={item => (
                                <List.Item
                                    actions={item.status == 1 && [
                                        <a key="list-loadmore-edit" onClick={() => this.accept(item.id)}>Accept</a>,
                                        <a key="list-loadmore-more" onClick={() => this.reject(item.id)}>Reject</a>,
                                    ]}
                                >
                                    <Skeleton avatar title={false} loading={isLoading} active>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src={StoreIcon} />
                                            }
                                            title={item.facility_name}
                                            description={`Email: ${item.email}. Phone: ${item.phone_number}`}
                                        />
                                        <div>{item.status == 2 ? "Accepted" : (item.status == 3 ? "Rejected" : "Pending")}</div>
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </div>
            </>
        );
    }
}

Admin.propTypes = {
    facilityRegistrations: PropTypes.array,
}

Admin.defaultProps = {
    facilityRegistrations: [1, 2, 3],
}

const mapStateToProps = (state) => ({
    facilityRegistrations: state.facilityRegistration.facilityRegistrations,
    isLoading: state.facilityRegistration.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
    getFacilityRegistration: () => dispatch(FacilityRegistrationAction.getFacilityRegistrationRequest()),
    signout: () => dispatch(UserAction.signout()),
})


var AdminWithAuth = withAuthSync(connect(mapStateToProps, mapDispatchToProps)(Admin))

export default AdminWithAuth