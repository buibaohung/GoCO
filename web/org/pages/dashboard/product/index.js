import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { connect } from 'react-redux';
import { Button, Table, Divider, Popconfirm, Icon } from 'antd';
import DashboardLayout from '../../../components/layouts/Dashboard'
import { ProductAction } from '../../../redux/product'
import { withAuthSync } from '../../../utils/auth'
import css from '../../../assert/styles/dashboard/product.scss'

class Product extends Component {
    state = {
        pagination: {
            current: 1,
            pageSize: 5,
            total: -1,
        },
    }

    initedGetProducts = false
    componentWillReceiveProps({productRedux, facilityInfo}){
        const {pagination} = this.state
        if (productRedux && productRedux.size) {
            this.setState({
                pagination: {
                    ...pagination,
                    total: productRedux.size,
                }
            });
        }
        
        if (facilityInfo && !this.initedGetProducts) {
            const {current, pageSize} = pagination
            this.props.getProducts(facilityInfo.id, (current-1)*pageSize, pageSize)
            this.initedGetProducts = true
        }
    }

    componentDidMount(){
        // fetch api when switch tab
        let { facilityInfo } = this.props
        const {current, pageSize} = this.state.pagination
        if (facilityInfo && current && pageSize) {
            this.props.getProducts(facilityInfo.id, (current-1)*pageSize, pageSize)
        }
    }

    get data(){
        const {current, pageSize} = this.state.pagination
        const {products} = this.props.productRedux
        let result = products.slice((current-1)*pageSize, current*pageSize)
        return result
    }

    columns = [
        {
            title: 'Image',
            dataIndex: 'avatar',
            render: (img, record) => (
                <div
                    className={css["image-container"]}
                    style={{
                        backgroundImage: `url(${img})`,
                    }}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: name => name,
            sorter: true,
        },
        {
            title: 'Created at',
            dataIndex: 'created_at',
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            defaultSortOrder: 'descend',
            sortDirections: ['descend', 'ascend'],
            render: created_at => new Date(created_at).toLocaleString(),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <>
                    <Link href="/dashboard/product/[id]" as={`/dashboard/product/${record.id}`}>
                        <Button ghost icon="edit" className={css["action-btn"]} />
                    </Link>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => this.props.deleteProduct(record.id)}
                    >
                        <Button ghost icon="delete" className={css["action-btn"]} type="danger" />
                    </Popconfirm>
                </>
            ),
        },
    ];

    onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);

        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        }, ()=>{
            this.props.getProducts(this.props.facilityInfo.id, (pagination.current-1)*pagination.pageSize, pagination.pageSize)
        })
    }

    render() {
        return (
            <>
                <Head>
                    <title>Dashboard - Product</title>
                </Head>
                <Table
                    columns={this.columns}
                    loading={this.props.productRedux.isLoading || this.props.productRedux.isDeleting}
                    dataSource={this.data}
                    rowKey={record => record.id}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    pagination={this.state.pagination}
                    onChange={this.onChange}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    productRedux: state.product,
    facilityInfo: state.facility.facilityInfo,
})

const mapDispatchToProps = dispatch => ({
    getProducts: (facilityId, offset, limit) => dispatch(ProductAction.getProductsRequest(facilityId, offset, limit)),
    deleteProduct: (productId) => dispatch(ProductAction.deleteProductRequest(productId)),
})

const ProductWrapted = withAuthSync(connect(mapStateToProps, mapDispatchToProps)(Product))
ProductWrapted.Layout = DashboardLayout;

export default ProductWrapted