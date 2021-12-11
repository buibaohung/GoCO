import React, { Component } from 'react'
import { StyleSheet, Image, Text, Alert, View, FlatList, TouchableOpacity } from 'react-native'
import { getFacility } from '../../../utils/user'
import { handleAPIError, showError } from '../../../utils/error'
import { getProducts } from '../../../api/getProducts'
import { createEvent } from '../../../api/event'
import checkIcon from '../../../assert/check.png'

export default class Aggregation extends Component {
    state = {
        lots: [],
        products: [],
        selectedProduct: null,
    }

    constructor(props) {
        super(props)

        this.lotID = props.navigation.getParam("lotID", "")
    }

    componentDidMount() {
        this.setState({
            lots: [{ id: this.lotID }],
        })

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
                console.error(err);

                let errMsg = handleAPIError(err)
                showError(errMsg)
            })
    }

    removeLot = (lotID) => {
        let lots = [...this.state.lots]
        lots = lots.filter(lot => lot.id !== lotID)
        this.setState({ lots })
    }

    newLot = (lotID) => {
        let lots = [...this.state.lots]
        lots.push({ id: lotID })

        // filter duplicate
        lots = lots.filter((value, index, self) => self.findIndex(v => v.id === value.id) === index)

        this.setState({ lots })
    }

    handle = async () => {
        let { selectedProduct, lots } = this.state
        if (!selectedProduct) {
            return showError("Please select product")
        }
        if (lots.length <= 1) {
            return showError("Please select more lots")
        }

        let product_item_ids = []
        lots.forEach(lot => {
            product_item_ids.push(lot.id)
        });

        try {
            let { data: { new_product_item_id } } = await createEvent({
                name: "AGGREGATION",
                product_item_id: this.lotID,
                product_item_ids,
            }, selectedProduct.id)

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
            console.error(error);

            let errMsg = handleAPIError(error)
            showError(errMsg)
        }
    }

    renderItem = (item) => {
        return (
            <View
                style={styles.item}
            >
                <Text style={styles.itemText}>{item.id}</Text>
                <TouchableOpacity
                    style={styles.itemBtnDel}
                    onPress={() => this.removeLot(item.id)}
                >
                    <Text>Xóa</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderProduct = (product) => {
        let selected = this.state.selectedProduct
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.title}>Aggregation</Text>
                    <FlatList
                        style={styles.list}
                        data={this.state.lots}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={item => item.id}
                    />
                    <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={() => this.props.navigation.navigate("AddLot", { callback: this.newLot })}
                    >
                        <Text style={styles.btnAddText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>To Product</Text>
                    <FlatList
                        style={styles.list}
                        data={this.state.products}
                        renderItem={({ item }) => this.renderProduct(item)}
                        keyExtractor={item => item.id}
                        extraData={this.state.selectedProduct}
                    />
                </View>
                <TouchableOpacity
                    style={styles.btnOK}
                    onPress={this.handle}
                >
                    <Text style={styles.btnAddText}>OK</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    section: {
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#000",
    },
    list: {
        width: "100%",
        flexGrow: 0,
    },
    item: {
        flexDirection: "row",
        backgroundColor: "#cecece",
        marginVertical: 2,
    },
    itemText: {
        flexGrow: 1,
        fontSize: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    itemBtnDel: {
        flexGrow: 0,
        paddingHorizontal: 15,
        backgroundColor: "#f00",
        alignItems: "center",
        justifyContent: "center",
    },
    btnAdd: {
        width: "100%",
        backgroundColor: "#78ffb0",
        marginVertical: 2,
        alignItems: "center",
    },
    btnAddText: {
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    btnOK: {
        width: "100%",
        backgroundColor: "#ff8000",
        marginVertical: 2,
        alignItems: "center",
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
});