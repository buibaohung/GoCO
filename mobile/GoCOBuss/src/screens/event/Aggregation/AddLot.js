import React, { Component } from 'react';
import { PermissionsAndroid, StyleSheet, View, Platform, Text, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { QRScannerView } from 'ac-qrcode';

class QRScan extends Component {
    state = {
        hasCameraPermission: false,
    }

    coords = {
        latitude: 0,
        longitude: 0,
    }

    componentDidMount() {
        let that = this
        if (Platform.OS === "android") {
            this.requestCameraPermission(PermissionsAndroid.PERMISSIONS.CAMERA, "App needs access to your camera")
                .then(() => {
                    that.setState({ hasCameraPermission: true });
                    return that.requestCameraPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, "App needs access to your location")
                })
        }
    }

    requestCameraPermission = (permission, message) => {
        var p = Promise.reject();

        for (let i = 0; i < 500; i++) {
            p = p.catch(() => {
                // try
                return PermissionsAndroid.request(
                    permission,
                    {
                        'title': 'Permission',
                        'message': message,
                    }
                )
            })
                .then((granted) => {
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        throw "not granted"
                    }

                    return PermissionsAndroid.RESULTS.GRANTED
                })
        }

        return p
    }

    onBottomButtonPressed(event) {
        const captureImages = JSON.stringify(event.captureImages);
        Alert.alert(
            `${event.type} button pressed`,
            `${captureImages}`,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }

    detectQR = (e) => {
        let callback = this.props.navigation.getParam("callback", () => { })
        callback(e.data)
        this.props.navigation.goBack()
    }

    ///////
    _renderTitleBar() {
        return (
            <Text
                style={{ color: 'white', textAlignVertical: 'center', textAlign: 'center', font: 20, padding: 12 }}
            >GoCO QRscan</Text>
        );
    }

    _renderMenu() {
        return (
            <Text
                style={{ color: 'white', textAlignVertical: 'center', textAlign: 'center', font: 20, padding: 12 }}
            >...</Text>
        )
    }

    barcodeReceived(e) {
        Alert.alert('Type: ' + e.type + '\nData: ' + e.data);
        //console.log(e)
    }

    render() {
        if (!this.state.hasCameraPermission || !this.props.isFocused) {
            return null
        }

        return (
            // <CameraKitCameraScreen
            //     actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
            //     onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
            //     scanBarcode={true}
            //     laserColor={"blue"}
            //     frameColor={"yellow"}

            //     onReadCode={(event) => this.detectQR(event.nativeEvent.codeStringValue)} //optional
            //     hideControls={false}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
            //     showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
            //     offsetForScannerFrame={10}   //(default 30) optional, offset from left and right side of the screen
            //     heightForScannerFrame={1000}  //(default 200) optional, change height of the scanner frame
            //     colorForScannerFrame={'red'} //(default white) optional, change colot of the scanner frame
            // />
            <View style={styles.container}>
                < QRScannerView
                    onScanResultReceived={this.detectQR.bind(this)}

                    renderTopBarView={() => this._renderTitleBar()}

                    renderBottomMenuView={() => this._renderMenu()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default withNavigationFocus(QRScan)