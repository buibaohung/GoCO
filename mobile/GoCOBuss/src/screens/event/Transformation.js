import React, { Component } from 'react'
import { Platform, StyleSheet, Text, Alert, Image, View, FlatList, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import DialogInput from 'react-native-dialog-input';
import { handleAPIError, showError } from '../../utils/error'
import { getFacility } from '../../utils/user'
import { getProducts } from '../../api/getProducts'
import { createEvent } from '../../api/event'
import checkIcon from '../../assert/check.png'

export default class Transformation extends Component {
    state = {
        products: [],
        selectedProduct: null,
        expiryDate: new Date('2020-06-12T14:42:42'),

        mode: 'date',
        show: false,

        isDialogVisible: false,
        price: 0,
    }

    constructor(props) {
        super(props)

        this.lotID = props.navigation.getParam("lotID", "")
    }

    componentDidMount() {
        getFacility()
            .then(facility => {
                return getProducts(facility.id)
            })
            .then(({ data }) => {
                this.setState({
                    products: data.products,
                })
            })
            .catch(err => {
                let errMsg = handleAPIError(err)
                showError(errMsg)
            })
    }

    renderProduct = (product, selected) => {
        return (
            <TouchableOpacity
                style={styles.product}
                onPress={() => this.setState({ selectedProduct: product })}
            >
                <Text style={styles.productText}>{product.name}</Text>
                {
                    selected && selected.id == product.id && (
                        <Image
                            style={styles.productCheck}
                            source={checkIcon}
                        />
                    )
                }
            </TouchableOpacity>
        )
    }

    setExpiryDate = (event, expiryDate) => {
        expiryDate = expiryDate || this.state.expiryDate;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            expiryDate,

            isDialogVisible: true,
        });
    }

    handle = async () => {
        let { selectedProduct, price, expiryDate } = this.state
        if (!selectedProduct) {
            return showError("Please select product")
        }

        try {
            let { data: { new_product_item_id } } = await createEvent(
                {
                    name: "TRANSFORMATION",
                    product_item_id: this.lotID,
                    from_product_item_id: this.lotID,
                },
                selectedProduct.id,
                price,
                expiryDate
            )

            Alert.alert(
                'New lot id:',
                new_product_item_id,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            this.props.navigation.goBack()

                            let callback = this.props.navigation.getParam("callback", () => { })
                            callback()
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            let errMsg = handleAPIError(error)
            showError(errMsg)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Transformation</Text>
                <FlatList
                    style={styles.list}
                    data={this.state.products}
                    renderItem={({ item }) => this.renderProduct(item, this.state.selectedProduct)}
                    keyExtractor={item => item.id}
                    extraData={this.state.selectedProduct}
                />
                {this.state.show && <DateTimePicker
                    value={this.state.expiryDate}
                    mode={this.state.mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setExpiryDate} />
                }
                <DialogInput
                    isDialogVisible={this.state.isDialogVisible}
                    title={"Price"}
                    message={"Price of the new lot"}
                    submitInput={(price) => this.setState({ isDialogVisible: false, price: parseInt(price) }, () => this.handle())}
                    closeDialog={() => this.setState({ isDialogVisible: false })}
                />
                <TouchableOpacity
                    style={styles.btnOK}
                    onPress={() => this.setState({ show: true })}
                >
                    <Text style={styles.btnOKText}>Set Expiry Date</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#000",
    },
    list: {
        width: "100%",
    },
    product: {
        backgroundColor: "#cecece",
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginVertical: 2,
        flexDirection: "row",
    },
    productText: {
        fontSize: 20,
        flexGrow: 1,
    },
    productCheck: {
        width: 20,
        height: 20,
        flexGrow: 0,
    },
    btnOK: {
        width: "100%",
        backgroundColor: "#ff8000",
        marginVertical: 2,
        alignItems: "center",
    },
    btnOKText: {
        fontSize: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
});