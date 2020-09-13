import React, { Component } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Spin } from 'antd';
import css from '../assert/styles/signin-form.scss'
import { UserAction } from '../redux/user'

class SigninForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.signin({
                    username: values.username,
                    password: values.password,
                    role: "admin",
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={this.props.isSignining} style={{maxHeight: "none"}}>
                <Form onSubmit={this.handleSubmit} className={css["signin-form"]}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className={css["signin-form-forgot"]} href="">
                            Forgot password
                        </a>
                        <Button type="primary" htmlType="submit" className={css["signin-form-button"]}>
                            Log in
                        </Button>
                        Or <Link href="/"><a>register now!</a></Link>
                    </Form.Item>
                </Form>
            </Spin>
        );
    }
}

const mapStateToProps = (state) => ({
    isSignining: state.user.isSignining,
})

const mapDispatchToProps = dispatch => ({
    signin: (data) => dispatch(UserAction.signinRequest(data)),
})

const SigninFormWithRedux = connect(mapStateToProps, mapDispatchToProps)(SigninForm);

const WrappedNormalSigninForm = Form.create({ name: 'signin_form' })(SigninFormWithRedux);

export default WrappedNormalSigninForm
