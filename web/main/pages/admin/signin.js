import React, {Component} from 'react'
import { connect } from 'react-redux';
import Head from 'next/head'
import Link from 'next/link'
import { Card } from 'antd';
import Particles from 'react-particles-js';
import particlesParams from '../../utils/particlesParams'
import SigninForm from '../../components/SigninForm'
import css from '../../assert/styles/signin.scss'
import Logo from "../../assert/images/logo.svg"

class Signin extends Component {
    render() {
        return (
            <div className={css.container}>
                <Head>
                    <title>Signin</title>
                </Head>
                <Particles
                    className={css["particles-container"]}
                    params={particlesParams}
                />
                <div className={css["overlay-container"]}>
                    <div className={css["overlay-content"]}>
                        <Link href="/">
                            <div className={css.logo}>
                                <Logo className={css["logo-svg"]}/>
                            </div>
                        </Link>
                        <Card style={{ width: 300 }}>
                            <SigninForm/>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin);