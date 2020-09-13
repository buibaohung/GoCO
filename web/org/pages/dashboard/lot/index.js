import React, { Component } from 'react'
import Head from 'next/head'
import { connect } from 'react-redux';
import { Button, Table, Divider, Popconfirm, Modal } from 'antd';
import QRCode from 'qrcode.react'
import DashboardLayout from '../../../components/layouts/Dashboard'
import { ProductLotAction } from '../../../redux/productLot'
import { withAuthSync } from '../../../utils/auth'
import css from '../../../assert/styles/dashboard/product.scss'

class Lot extends Component {
    state = {
        pagination: {
            current: 1,
            pageSize: 5,
            total: -1,
        },
        showQRCode: false,
        qrCodeValue: "",
    }

    initedGetProductLots = false
    componentWillReceiveProps({productLotRedux, facilityInfo}){
        const {pagination} = this.state
        if (productLotRedux && productLotRedux.size) {
            this.setState({
                pagination: {
                    ...pagination,
                    total: productLotRedux.size,
                }
            });
        }
        
        if (facilityInfo && !this.initedGetProductLots) {
            const {current, pageSize} = pagination
            let filter = {
                facility_id: facilityInfo.id
            }
            this.props.getProductLots(filter, (current-1)*pageSize, pageSize, null, null)
            this.initedGetProductLots = true
        }
    }

    componentDidMount(){
        // fetch api when switch tab
        let { facilityInfo } = this.props
        const {current, pageSize} = this.state.pagination
        if (facilityInfo && current && pageSize) {
            let filter = {
                facility_id: facilityInfo.id
            }
            this.props.getProductLots(filter, (current-1)*pageSize, pageSize, null, null)
        }
    }

    get data(){
        const {current, pageSize} = this.state.pagination
        const {productLots} = this.props.productLotRedux
        let result = productLots.slice((current-1)*pageSize, current*pageSize)
        return result
    }

    get columns(){
        let { productLots } = this.props.productLotRedux
        productLots = productLots.filter(lot => lot.product_name)

        // get unique name
        productLots = productLots.filter((lot, index, self) => self.findIndex(l => l.product_id == lot.product_id) === index)

        let nameFilter = productLots.map(lot => ({
            text: lot.product_name,
            value: lot.product_name,
        }))

        return [
            {
                title: 'Lot ID',
                dataIndex: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'product_name',
                render: name => name,
                filters: nameFilter,
                sorter: true,
            },
            {
                title: 'Price',
                dataIndex: 'price',
                render: price => price + "đ",
            },
            {
                title: 'Expiry date',
                dataIndex: 'expiry_date',
                sorter: (a, b) => new Date(a.expiry_date) - new Date(b.expiry_date),
                sortDirections: ['descend', 'ascend'],
                render: expiry_date => new Date(expiry_date).toLocaleString(),
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, record) => (
                    <>
                        <Button
                            ghost
                            icon="qrcode"
                            className={css["action-btn"]}
                            onClick={() => this.showQRCode(record.id)}
                        />
                        <Divider type="vertical" />
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => this.props.deleteProductLot(record.id)}
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
            let filter = {
                facility_id: this.props.facilityInfo.id
            }
            this.props.getProductLots(filter, (current-1)*pageSize, pageSize, null, null)
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
                    <title>Dashboard - Lot</title>
                </Head>
                <Table
                    columns={this.columns}
                    loading={this.props.productLotRedux.isLoading || this.props.productLotRedux.isDeleting}
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
    productLotRedux: state.productLot,
    facilityInfo: state.facility.facilityInfo,
})

const mapDispatchToProps = dispatch => ({
    getProductLots: (filter, offset, limit, order_field, order_by) => dispatch(ProductLotAction.getProductLotsRequest(filter, offset, limit, order_field, order_by)),
    deleteProductLot: (productLotId) => dispatch(ProductLotAction.deleteProductLotRequest(productLotId)),
})

const LotWrapted = withAuthSync(connect(mapStateToProps, mapDispatchToProps)(Lot))
LotWrapted.Layout = DashboardLayout;

export default LotWrapted