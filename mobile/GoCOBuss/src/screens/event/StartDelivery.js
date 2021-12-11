import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { handleAPIError, showError } from '../../utils/error'
import { createEvent } from '../../api/event'
import { getFacilityByType } from '../../api/facility'
import { getFacility } from '../../utils/user'
import checkIcon from '../../assert/check.png'

export default class StartDelivery extends Component {
    state = {
        facilities: [],
        transporters: [],
        selectedFacility: null,
        selectedTransporter: null,
    }

    constructor(props) {
        super(props)

        this.lotID = props.navigation.getParam("lotID", "")
    }

    componentDidMount() {
        getFacilityByType()
            .then(({ data: { facilities } }) => {
                this.setState({
                    facilities: facilities.filter(f => f.type != "TRANSPORTATION_CARRIER")
                })
            })
            .catch(err => {
                let errMsg = handleAPIError(err)
                showError(errMsg)
            })

        getFacilityByType("TRANSPORTATION_CARRIER")
            .then(({ data: { facilities } }) => {
                this.setState({ transporters: facilities })
            })
            .catch(err => {
                let errMsg = handleAPIError(err)
                showError(errMsg)
            })
    }

    renderFacility = (facility, onPress, selected) => {
        return (
            <TouchableOpacity
                style={styles.facility}
                onPress={onPress}
            >
                <Text style={styles.facilityText}>{facility.name}</Text>
                {
                    selected && selected.id == facility.id && (
                        <Image
                            style={styles.facilityCheck}
                            source={checkIcon}
                        />
                    )
                }
            </TouchableOpacity>
        )
    }

    selectFacility = (facility) => {
        this.setState({ selectedFacility: facility })
    }

    selectTransporter = (transporter) => {
        this.setState({ selectedTransporter: transporter })
    }

    handle = async () => {
        let { selectedFacility, selectedTransporter } = this.state
        if (!selectedFacility || !selectedTransporter) {
            return showError("Please select facility & transporter")
        }

        let { navigation } = this.props

        try {
            let myFacility = await getFacility()
            await createEvent({
                name: "START_DELIVERY",
                product_item_id: this.lotID,
                from_facility_id: myFacility.id,
                to_facility_id: selectedFacility.id,
                delivered_by_facility_id: selectedTransporter.id,
            })

            navigation.goBack()

            let callback = navigation.getParam("callback", () => { })
            callback()
        } catch (error) {
            let errMsg = handleAPIError(error)
            showError(errMsg)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Delivery to</Text>
                <FlatList
                    style={styles.list}
                    data={this.state.facilities}
                    renderItem={({ item }) => this.renderFacility(item, () => this.selectFacility(item), this.state.selectedFacility)}
                    keyExtractor={item => item.id}
                    extraData={this.state.selectedFacility}
                />

                <Text style={styles.title}>By transporter</Text>
                <FlatList
                    style={styles.list}
                    data={this.state.transporters}
                    renderItem={({ item }) => this.renderFacility(item, () => this.selectTransporter(item), this.state.selectedTransporter)}
                    keyExtractor={item => item.id}
                    extraData={this.state.selectedTransporter}
                />
                <TouchableOpacity
                    style={styles.btnOK}
                    onPress={this.handle}
                >
                    <Text style={styles.btnOKText}>OK</Text>
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
    facility: {
        backgroundColor: "#cecece",
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginVertical: 2,
        flexDirection: "row",
    },
    facilityText: {
        fontSize: 20,
        flexGrow: 1,
    },
    facilityCheck: {
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