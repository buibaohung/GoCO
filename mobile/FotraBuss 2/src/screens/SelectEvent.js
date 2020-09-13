import React, { Component } from 'react'
import { Dimensions, TouchableOpacity, StyleSheet, Text, View, Alert, ScrollView } from 'react-native'
import { toUpWordCaseString } from '../utils/string'
import { handleAPIError, showError } from '../utils/error'
import { createEvent } from '../api/event'

var {width} = Dimensions.get('window');

export default class SelectEvent extends Component {
    state = {
        eventType: "",
        screenWidth: width,
        screenCols: 2,
    }

    constructor(props) {
        super(props)

        this.lotID = props.navigation.getParam("lotID", "")
        this.events = [
            {
                name: "AGGREGATION",
                onPress: () => {
                    props.navigation.navigate("Aggregation", {
                        lotID: this.lotID,
                        callback: props.navigation.goBack,
                    })
                },
            },
            {
                name: "DISAGGREGATION",
                onPress: () => this.disaggregation(),
            },
            {
                name: "TRANSFORMATION",
                onPress: () => {
                    props.navigation.navigate("Transformation", {
                        lotID: this.lotID,
                        callback: props.navigation.goBack,
                    })
                },
            },
            // {
            //     name: "SOLD",
            //     onPress: () => this.sold(),
            // },
            {
                name: "START_DELIVERY",
                onPress: () => {
                    props.navigation.navigate("StartDelivery", {
                        lotID: this.lotID,
                        callback: props.navigation.goBack,
                    })
                },
            },
            {
                name: "FINISH_DELIVERY",
                onPress: () => this.finishDelivery(),
            },
            {
                name: "OBSERVATION",
                onPress: () => this.observation(),
            },
            {
                name: "DECOMMISSION",
                onPress: () => this.decommission(),
            },
        ]
    }

    componentDidMount(){
        Dimensions.addEventListener("change", this.onChangeWindow)
    }

    componentWillUnmount(){
        Dimensions.removeEventListener("change", this.onChangeWindow)
    }

    onChangeWindow = ({window, screen}) => {
        this.setState({
            screenWidth: window.width,
            screenCols: window.width < window.height ? 2 : 4,
        })
    }

    observation  = () => {
        Alert.alert(
            'Confirm',
            'Is quality ok?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Bad',
                    onPress: async () => {
                        try {
                            await createEvent({
                                name: "OBSERVATION",
                                product_item_id: this.lotID,
                                quality: -1,
                            })

                            this.props.navigation.goBack()
                        } catch (error) {
                            let errMsg = handleAPIError(error)
                            showError(errMsg)
                        }
                    },
                },
                {
                    text: 'Good',
                    onPress: async () => {
                        try {
                            await createEvent({
                                name: "OBSERVATION",
                                product_item_id: this.lotID,
                                quality: 1,
                            })

                            this.props.navigation.goBack()
                        } catch (error) {
                            let errMsg = handleAPIError(error)
                            showError(errMsg)
                        }
                    },
                },
            ],
            {cancelable: false},
        );
    }

    sold = () => {
        Alert.alert(
            'Confirm',
            'Sold?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        console.log('OK Pressed');
                        try {
                            await createEvent({
                                name: "SOLD",
                                product_item_id: this.lotID,
                            })
    
                            this.props.navigation.goBack()
                        } catch (error) {
                            let errMsg = handleAPIError(error)
                            showError(errMsg)
                        }
                    },
                },
            ],
            {cancelable: false},
        );
    }

    decommission = () => {
        Alert.alert(
            'Confirm',
            'Sure?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        console.log('Yes Pressed');
                        try {
                            await createEvent({
                                name: "DECOMMISSION",
                                product_item_id: this.lotID,
                            })
    
                            this.props.navigation.goBack()
                        } catch (error) {
                            let errMsg = handleAPIError(error)
                            showError(errMsg)
                        }
                    },
                },
            ],
            {cancelable: false},
        );
    }

    finishDelivery = () => {
        Alert.alert(
            'Confirm',
            'Finish delivery?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        console.log('Yes Pressed');
                        try {
                            await createEvent({
                                name: "FINISH_DELIVERY",
                                product_item_id: this.lotID,
                            })
    
                            this.props.navigation.goBack()
                        } catch (error) {
                            let errMsg = handleAPIError(error)
                            showError(errMsg)
                        }
                    },
                },
            ],
            {cancelable: false},
        );
    }

    disaggregation = () => {
        Alert.alert(
            'Confirm',
            'Sure?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        console.log('Yes Pressed');
                        try {
                            await createEvent({
                                name: "DISAGGREGATION",
                                product_item_id: this.lotID,
                            })
    
                            this.props.navigation.goBack()
                        } catch (error) {
                            let errMsg = handleAPIError(error)
                            showError(errMsg)
                        }
                    },
                },
            ],
            {cancelable: false},
        );
    }

    renderItem = () => {
        let width = Math.floor(this.state.screenWidth / this.state.screenCols) - 16 - 4
        let height = width

        return (
            <ScrollView contentContainerStyle={styles.eventTypeContainer}>
                {
                    this.events.map((eventType, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.eventTypeItem, {width, height}]}
                            onPress={eventType.onPress}
                        >
                            <Text style={styles.eventTypeText}>{toUpWordCaseString(eventType.name)}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Select event type</Text>
                {this.renderItem()}
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
    eventTypeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    eventTypeItem: {
        backgroundColor: '#DDDDDD',
        alignItems: 'center',
        justifyContent: "center",
        margin: 2,
    },
    eventTypeText: {
        fontSize: 20,
        fontWeight: "700",
    }
});