import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Row,
    Col,
    Form,
    Icon,
    Input,
    InputNumber,
    TextArea,
    Button,
    Upload,
    Tooltip,
    Spin,
    Alert,
    message
} from 'antd';
import '../assert/styles/dashboard/profile-form.global.scss'


export class NewProfileForm extends Component {
    state = {
        avatarLoading: false,
        avatar: null,
    }

    constructor(props){
        super(props)

        let {avatar} = props
        if (avatar && avatar.value) {
            this.state.avatar = avatar.value.url
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.onSubmit(e)
            }
        });
    };

    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        
        return e && e.file;
    };    

    normFileList = e => {
        if (Array.isArray(e)) {
            return e;
        }
        
        return e && e.fileList;
    };

    getBase64 = (img) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }

    beforeUploadAvatar = (file, fileList) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        
        return false;
    }

    handleChangeAvatar = info => {
        this.getBase64(info.file)
        .then(imageUrl =>{
            this.setState({
                avatar: imageUrl,
                avatarLoading: false,
            })
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            // labelCol: {
            //     xs: { span: 24 },
            //     sm: { span: 5 },
            // },
            // wrapperCol: {
            //     xs: { span: 24 },
            //     sm: { span: 19 },
            // },
        };

        const uploadAvatarButton = (
            <div>
                <Icon type={this.state.avatarLoading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <Spin spinning={this.props.loading} style={{maxHeight: "none"}}>
                <Form onSubmit={this.handleSubmit} {...formItemLayout} layout="vertical">
                    <Row gutter={32}>
                        <Col span={15}>
                            <Form.Item label="Name">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please input your product name!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Carrot"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="Phone">
                                {getFieldDecorator('phone_number')(
                                    <Input
                                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="Description">
                                {getFieldDecorator('description', {
                                    rules: [{ required: true, message: 'Please input product description!' }],
                                })(
                                    <Input.TextArea
                                        rows={4}
                                        placeholder="Description..."
                                    />,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Avatar">
                                {getFieldDecorator('avatar', {
                                    valuePropName: 'file',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        showUploadList={false}
                                        className="upload-avatar"
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={this.beforeUploadAvatar}
                                        onChange={this.handleChangeAvatar}
                                    >
                                        {this.state.avatar ? <img src={this.state.avatar} alt="avatar" style={{ width: '100%' }} /> : uploadAvatarButton}
                                    </Upload>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        )
    }
}

NewProfileForm.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
}

NewProfileForm.defaultProps = {
    onSubmit: (e)=>{},
    onChange: (changedFields)=>{},
}

const WrappedForm = Form.create({
    name: 'new_product_form',
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
})(NewProfileForm);

export default WrappedForm
