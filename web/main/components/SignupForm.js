import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Checkbox,
    Button,
    AutoComplete,
    Spin,
} from 'antd';
import { connect } from 'react-redux';
import registerFacility from '../api/registerFacility'
import { handleAPIError, showError, showSuccess } from '../utils/error'
import { toUpWordCaseString } from '../utils/string'
import { FacilityTypeAction } from '../redux/facilityType'
import { getLocations } from '../api/location'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class SignupForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading: false,
        locationsCascader: [],
    };

    componentDidMount(){
        this.props.getFacilityTypes()

        getLocations("0")
        .then(({data: {locations}}) => {
            locations = locations.sort((a,b) => a.name_with_type > b.name_with_type ? 1 : -1)
            this.setState({
                locationsCascader: this.getLocationCascader(locations)
            })
        })
        .catch(error=>{
            let errMsg = handleAPIError(error)
            showError(errMsg);
        })
    }

    getLocationCascader = (locations = []) => {
        let res = []

        locations.forEach(location => {
            let loc = Object.assign(location, {
                value: location.name_with_type,
                label: location.name_with_type,
                isLeaf: false,
            })
            res.push(loc)
        });

        return res
    }

    loadLocation = (selectedOptions) => {
        let targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        getLocations(targetOption.code)
        .then(({data: {locations}}) => {
            locations = locations.sort((a,b) => a.name_with_type > b.name_with_type ? 1 : -1)

            targetOption.loading = false;
            let children = this.getLocationCascader(locations)
            if (children.length > 0) {
                targetOption.children = children
            }
            this.setState({locationsCascader: [...this.state.locationsCascader]})
        })
        .catch(error=>{
            let errMsg = handleAPIError(error)
            showError(errMsg);
        })

        console.log(targetOption);

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({loading: true})
                registerFacility({
                    facility_name: values.facility_name,
                    facility_type: values.facility_type,
                    eos_username: values.eos_username,
                    phone_number: values.phone,
                    email: values.email,
                    location: values.location ? values.location.join(", ") : "",
                    website: values.website,
                })
                .then(()=>{
                    showSuccess("Successfully register facility. Please waiting for approving.")
                })
                .catch(error=>{
                    let errMsg = handleAPIError(error)
                    showError(errMsg);
                })
                .finally(()=>{
                    this.setState({loading: false})
                })
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
          autoCompleteResult = [];
        } else {
          autoCompleteResult = ['.com', '.vn', '.com.vn', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
    
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '84',
        })(
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
                <Option value="87">+87</Option>
            </Select>,
        );
    
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
    
        return (
            <Spin spinning={this.state.loading} style={{maxHeight: "none"}}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input placeholder="your@email.com" />)}
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item label="EOS account name">
                        {getFieldDecorator('eos_username', {
                            rules: [{ required: true, message: 'Please input your EOS account name!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>


                    <Form.Item label="Facility name">
                        {getFieldDecorator('facility_name', {
                            rules: [{ required: true, message: 'Please input your facility name!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Facility type" hasFeedback>
                        {getFieldDecorator('facility_type', {
                            rules: [{ required: true, message: 'Please select your type of facility!' }],
                        })(
                            <Select placeholder="Please select a type">
                                {
                                    this.props.facilityTypes.map(type=>(
                                        <Option key={type} value={type}>{toUpWordCaseString(type)}</Option>
                                    ))
                                }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Location">
                        {getFieldDecorator('location', {
                            rules: [
                                { type: 'array', required: true, message: 'Please select your habitual residence!' },
                            ],
                        })(
                            <Cascader
                                options={this.state.locationsCascader}
                                loadData={this.loadLocation}
                                changeOnSelect
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Address">
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: 'Please input your address!', whitespace: true }],
                        })(<Input placeholder="208 Nguyen Huu Canh" />)}
                    </Form.Item>
                    <Form.Item label="Website">
                        {getFieldDecorator('website', {
                            rules: [{ required: true, message: 'Please input website!' }],
                        })(
                            <AutoComplete
                                dataSource={websiteOptions}
                                onChange={this.handleWebsiteChange}
                                placeholder="website"
                            >
                                <Input />
                            </AutoComplete>,
                        )}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                            rules: [{ required: true, message: 'Please read the agreement before submit' }],
                        })(
                            <Checkbox>
                                I have read the <a href="">agreement</a>
                            </Checkbox>,
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        );
    }
}

SignupForm.propTypes = {
    facilityTypes: PropTypes.array,
}

SignupForm.defaultProps = {
    facilityTypes: [],
}

const mapStateToProps = (state) => ({
    facilityTypes: state.facilityType.types,
})

const mapDispatchToProps = dispatch => ({
    getFacilityTypes: () => dispatch(FacilityTypeAction.getFacilityTypeRequest()),
})

const SignupFormWithRedux = connect(mapStateToProps, mapDispatchToProps)(SignupForm);

const WrappedNormalSignupForm = Form.create({ name: 'signup_form' })(SignupFormWithRedux);

export default WrappedNormalSignupForm
