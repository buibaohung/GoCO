import React, { Component } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Breadcrumb, Dropdown, Avatar } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import { UserAction } from '../../redux/user'

import css from '../../assert/styles/dashboard/dashboard.scss'
import '../../assert/styles/dashboard/dashboard.global.scss'
import Logo from "../../assert/images/logo.svg"
import LogoIcon from "../../assert/images/logo-icon.svg"

export class DashboardLayout extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    menu = () => (
        <Menu>
            <Menu.Item onClick={this.props.signout}>
                Sign out
            </Menu.Item>
        </Menu>
    );

    getBreadcrumbItems = () => {
        const breadcrumbNameMap = {
            '/dashboard': 'Dashboard',
            '/dashboard/product': 'Product',
            '/dashboard/product/new': 'New',
            '/dashboard/product/[id]': 'Edit',

            '/dashboard/lot': 'Lot',
            '/dashboard/lot/new': 'New',
            '/dashboard/lot/[id]': 'Edit',

            '/dashboard/user': 'User',
        };

        const { router } = this.props;

        const pathSnippets = router.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link href={url}><a>{breadcrumbNameMap[url]}</a></Link>
                </Breadcrumb.Item>
            );
        });

        return extraBreadcrumbItems
    }

    render() {
        const { router } = this.props

        let paths = router.pathname.replace("/", " ").trim().split("/")
        let openKey = "product"
        if (paths.length > 1) {
            openKey = paths[1]
        }

        return (
            <Layout className={css.container}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    className={css.sider}
                    theme="light"
                >
                    <Link href="/dashboard">
                        <div className={css.logo} style={{ width: this.state.collapsed ? "80px" : "120px" }}>
                            {
                                this.state.collapsed ? <LogoIcon className={css["logo-svg"]} /> : <Logo className={css["logo-svg"]} />
                            }
                        </div>
                    </Link>
                    <Menu
                        mode="inline"
                        className={css.menu}
                        id="dashboard-menu"
                        theme="dark"
                        defaultSelectedKeys={['all-product']}
                        defaultOpenKeys={[openKey]}
                        selectedKeys={[router.pathname]}
                    >
                        <Menu.SubMenu
                            key="product"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span className="nav-text">Product</span>
                                </span>
                            }
                        >
                            <Menu.Item
                                key="/dashboard/product"
                                onClick={() => router.push("/dashboard/product")}
                            >
                                All Products
                            </Menu.Item>
                            <Menu.Item
                                key="/dashboard/product/new"
                                onClick={() => router.push("/dashboard/product/new")}
                            >
                                New Product
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                            key="lot"
                            title={
                                <span>
                                    <Icon type="barcode" />
                                    <span className="nav-text">Lot</span>
                                </span>
                            }
                        >
                            <Menu.Item
                                key="/dashboard/lot"
                                onClick={() => router.push("/dashboard/lot")}
                            >
                                All Lots
                            </Menu.Item>
                            <Menu.Item
                                key="/dashboard/lot/new"
                                onClick={() => router.push("/dashboard/lot/new")}
                            >
                                New Lot
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                            key="user"
                            title={
                                <span>
                                    <Icon type="barcode" />
                                    <span className="nav-text">User</span>
                                </span>
                            }
                        >
                            <Menu.Item
                                key="/dashboard/user"
                                onClick={() => router.push("/dashboard/user")}
                            >
                                All Users
                            </Menu.Item>
                            <Menu.Item
                                key="/dashboard/user/new"
                                onClick={() => router.push("/dashboard/user/new")}
                            >
                                New User
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
                <Layout
                    style={{
                        marginLeft: this.state.collapsed ? 80 : 200,
                        transition: 'all 0.2s',
                    }}
                >
                    <Header
                        className={css.header}
                        style={{
                            width: this.state.collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)',
                            transition: 'all 0.2s',
                        }}
                    >
                        <Icon
                            className={css.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div style={{ float: "right" }}>
                            <Dropdown overlay={this.menu}>
                                <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '64px 16px 0',
                            padding: '0 30px',
                            overflow: 'initial',
                        }}
                    >
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {this.getBreadcrumbItems()}
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>GoCO ©2020</Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    signout: () => dispatch(UserAction.signout()),
})



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardLayout))
