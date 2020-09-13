import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Row,
    Col,
    Form,
    DatePicker,
    Select,
    InputNumber,
    Button,
    Spin,
} from 'antd';
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
import { ProductAction } from '../redux/product'

export class NewProductLotForm extends Component {
    initedGetProducts = false
    componentDidMount(){
        if (this.props.facilityInfo && !this.initedGetProducts) {
            this.props.getAllProducts(this.props.facilityInfo.id)
            this.initedGetProducts = true
        }
    }

    componentWillReceiveProps({facilityInfo}){
        if (facilityInfo && !this.initedGetProducts) {
            this.props.getAllProducts(facilityInfo.id)
            this.initedGetProducts = true
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
                    <Form.Item label="Product" hasFeedback>
                        {getFieldDecorator('productId', {
                            rules: [{ required: true, message: 'Please select your product' }],
                        })(
                            <Select placeholder="Please select a product">
                                {
                                    this.props.products.map(product=>(
                                        <Option key={product.id} value={product.id}>{product.name}</Option>
                                    ))
                                }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Expiry date">
                        {getFieldDecorator('expiryDate', {
                            rules: [{ type: 'object', required: true, message: 'Please select expiry date!' }],
                        })(
                            <DatePicker />
                        )}
                    </Form.Item>
                    <Form.Item label="Price">
                        {getFieldDecorator('price', { initialValue: 3 })(
                            <InputNumber
                                min={1000}
                                step={1000}
                                decimalSeparator="."
                            />
                        )}
                        <span className="ant-form-text"> VNĐ</span>
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

NewProductLotForm.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    products: PropTypes.array,
}

NewProductLotForm.defaultProps = {
    onSubmit: (e)=>{},
    onChange: (changedFields)=>{},
    products: [],
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
})(NewProductLotForm);

const mapStateToProps = (state) => ({
    products: state.product.products,
    facilityInfo: state.facility.facilityInfo,
})

const mapDispatchToProps = (dispatch) => ({
    getAllProducts: (facilityId) => dispatch(ProductAction.getProductsRequest(facilityId, 0, -1))
})



export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm)
