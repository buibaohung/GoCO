import React, {Component} from 'react'
import { connect } from 'react-redux';
import Head from 'next/head'
import Link from 'next/link'
import { Card } from 'antd';
import Particles from 'react-particles-js';
import particlesParams from '../utils/particlesParams'
import SignupForm from '../components/SignupForm'
import css from '../assert/styles/signup.scss'
import Logo from "../assert/images/logo.svg"

class Signup extends Component {
    render() {
        return (
            <div className={css.container}>
                <Head>
                    <title>Signup</title>
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
                        <Card style={{ width: 500 }}>
                            <SignupForm/>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    facilityType: state.facilityType,
})

const mapDispatchToProps = dispatch => ({
    getFacilityTypeRequest: ()=>dispatch(FacilityTypeAction.getFacilityTypeRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);