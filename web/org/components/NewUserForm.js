import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Form,
    Input,
    Button,
    Spin,
    Switch,
    Checkbox,
    Row,
    Col,
} from 'antd';

export class NewUserForm extends Component {
    state = {}

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.onSubmit(e)
            }
        });
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }

        callback();
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <Spin spinning={this.props.loading} style={{maxHeight: "none"}}>
                <Form onSubmit={this.handleSubmit} {...formItemLayout}>
                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input user name!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        {getFieldDecorator('phone_number', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item label="Permission">
                        {getFieldDecorator('permission')(
                            <Checkbox.Group style={{ width: '100%' }}>
                                <Row>
                                    <Col span={8}>
                                        <Checkbox value="product">Product</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="lot">Lot</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="user">User</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>,
                        )}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 5 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }
}

NewUserForm.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
}

NewUserForm.defaultProps = {
    onSubmit: (e)=>{},
    onChange: (changedFields)=>{},
}

const WrappedForm = Form.create({
    name: 'new_user_form',
    onFieldsChange(props, changedFields) {
        props.onChange && props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        let fields = {}
        for (const key in props) {
            if (props.hasOwnProperty(key)) {
                const field = props[key];
                fields[key] = Form.createFormField({
                    ...field,
                })
            }
        }
        return fields
    },
})(NewUserForm);

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm)
