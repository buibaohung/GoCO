import React, { PureComponent } from 'react'
import Link from 'next/link'
import Particles from 'react-particles-js';
import particlesParams from '../utils/particlesParams'
import { Layout, Menu, Button, Icon, Drawer, Typography } from 'antd';
const { Header, Content } = Layout;
import css from "../assert/styles/home.scss"
import Banner from "../assert/images/banner.svg"
import "../assert/styles/home.global.scss"
import Logo from "../assert/images/logo.svg"

class Home extends PureComponent {

    state = {
        visibleDrawer: false,
        headerAlpha: 0,
    };

    componentDidMount() {
        window.addEventListener("scroll", this.changeHeaderAlpha)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.changeHeaderAlpha)
    }

    changeHeaderAlpha = () => {
        let rate = window.pageYOffset / window.innerHeight;
        rate = Math.min(rate, 1)
        this.setState({ headerAlpha: rate })
    }

    openDrawer = () => {
        this.setState({ visibleDrawer: true })
    }

    closeDrawer = () => {
        this.setState({ visibleDrawer: false })
    }

    renderMenuItem() {
        let menuItems = [
            {
                name: "Intro",
            },
            {
                name: "For customer",
            },
            {
                name: "For partner",
            },
            {
                name: "FAQ",
            },
        ]

        let res = []
        menuItems.forEach(menuItem => {
            res.push(<Menu.Item key="1">{menuItem.name}</Menu.Item>)
        });

        return res;
    }

    render() {
        return (
            <Layout>
                <Drawer
                    title="Menu"
                    placement="right"
                    closable={true}
                    onClose={this.closeDrawer}
                    visible={this.state.visibleDrawer}
                    bodyStyle={{
                        padding: 0
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key="1">Intro</Menu.Item>
                        <Menu.Item key="2">For customer</Menu.Item>
                        <Menu.Item key="3">For partner</Menu.Item>
                        <Menu.Item key="4">FAQ</Menu.Item>
                    </Menu>
                </Drawer>
                <Header
                    className={css.header}
                    style={{ backgroundColor: "rgba(0, 200, 83, " + this.state.headerAlpha + ")" }}
                >
                    <Link href="/">
                        <div className={css.logo}>
                            <Logo className={css["logo-svg"]} />
                        </div>
                    </Link>
                    <Menu
                        className={css.menu}
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key="1">Intro</Menu.Item>
                        <Menu.Item key="2">For customer</Menu.Item>
                        <Menu.Item key="3">For partner</Menu.Item>
                        <Menu.Item key="4">FAQ</Menu.Item>
                    </Menu>
                    <Link href="/signup">
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            className={css["btn-started"]}
                        >
                            Get Started
                            <Icon type="arrow-right" />
                        </Button>
                    </Link>
                    <Button
                        className={css["btn-menu"]}
                        ghost
                        icon="menu"
                        size="large"
                        onClick={this.openDrawer}
                    />
                </Header>
                <Content>
                    <div className={css.particles}>
                        <Particles
                            className={css["particles-container"]}
                            params={particlesParams}
                        />
                        <div className={css["particles-overlay"]}>
                            <div>
                                <Typography.Title className={css.slogan}>New lands, where deception is only in imagination
.</Typography.Title>
                                <div className={css["download-section"]}>
                                    <div className={css["download-section-title"]}>Customer</div>
                                    <Button
                                        shape="round"
                                        icon="download"
                                        size="large"
                                        href="/download/GoCO-customer.apk"
                                        target="_blank"
                                        ghost
                                    >
                                        Mobile app
                                    </Button>
                                </div>
                                <div className={css["download-section"]}>
                                    <div className={css["download-section-title"]}>Organization</div>
                                    <Button
                                        shape="round"
                                        icon="download"
                                        size="large"
                                        href="/download/GoCO-org.apk"
                                        target="_blank"
                                        ghost
                                    >
                                        Mobile app
                                    </Button>
                                    <Button
                                        shape="round"
                                        icon="download"
                                        size="large"
                                        href="https://org.GoCO.tk"
                                        target="_blank"
                                        ghost
                                    >
                                        Web app
                                    </Button>
                                </div>
                            </div>
                            <Banner className={css["banner-img"]} />
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Home;