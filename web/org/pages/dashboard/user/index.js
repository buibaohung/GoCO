import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux';
import { Button, Table, Divider, Popconfirm, Modal } from 'antd';
import QRCode from 'qrcode.react'
import DashboardLayout from '../../../components/layouts/Dashboard'
import { UserAction } from '../../../redux/user'
import { withAuthSync } from '../../../utils/auth'
import css from '../../../assert/styles/dashboard/product.scss'

class User extends Component {
    state = {
        pagination: {
            current: 1,
            pageSize: 5,
            total: -1,
        },
        showQRCode: false,
        qrCodeValue: "",
    }

    componentWillReceiveProps({userRedux}){
        const {pagination} = this.state
        if (userRedux && userRedux.size) {
            this.setState({
                pagination: {
                    ...pagination,
                    total: userRedux.size,
                }
            });
        }
    }

    componentDidMount(){
        // fetch api when switch tab
        const {current, pageSize} = this.state.pagination
        this.props.getUsers((current-1)*pageSize, pageSize)
    }

    get data(){
        const {current, pageSize} = this.state.pagination
        const {users} = this.props.userRedux
        let result = users.slice((current-1)*pageSize, current*pageSize)
        return result
    }

    get columns(){
        return [
            {
                title: 'User ID',
                dataIndex: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Phone number',
                dataIndex: 'phone_number',
            },
            {
                title: 'Created at',
                dataIndex: 'created_at',
                sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
                render: created_at => new Date(created_at).toLocaleString(),
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, record) => (
                    <>
                        <Link href="/dashboard/user/[id]" as={`/dashboard/user/${record.id}`}>
                            <Button ghost icon="edit" className={css["action-btn"]} />
                        </Link>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => this.props.deleteUser(record.id)}
                        >
                            <Button ghost icon="delete" className={css["action-btn"]} type="danger" />
                        </Popconfirm>
                    </>
                ),
            },
        ];
    }

    onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);

        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        }, ()=>{
            const {current, pageSize} = pagination
            this.props.getUsers((current-1)*pageSize, pageSize)
        })
    }

    showQRCode = (qrCodeValue) => {
        this.setState({
            showQRCode: true,
            qrCodeValue,
        })
    }

    render() {
        return (
            <>
                <Head>
                    <title>Dashboard - User</title>
                </Head>
                <Table
                    columns={this.columns}
                    loading={this.props.userRedux.isLoading || this.props.userRedux.isDeleting}
                    dataSource={this.data}
                    rowKey={record => record.id}
                    pagination={this.state.pagination}
                    onChange={this.onChange}
                />
                <Modal
                    visible={this.state.showQRCode}
                    footer={null}
                    onCancel={()=>this.setState({showQRCode: false})}
                    width={248}
                    closable={false}
                >
                    <QRCode
                        value={this.state.qrCodeValue}
                        renderAs="svg"
                        size={200}
                        level="M"
                    />
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    userRedux: state.user,
})

const mapDispatchToProps = dispatch => ({
    getUsers: (offset, limit) => dispatch(UserAction.getUsersRequest(offset, limit)),
    deleteUser: (userId) => dispatch(UserAction.deleteUserRequest(userId)),
})

const UserWrapted = withAuthSync(connect(mapStateToProps, mapDispatchToProps)(User))
UserWrapted.Layout = DashboardLayout;

export default UserWrapted