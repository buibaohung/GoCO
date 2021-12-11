import React, { Component } from 'react'
import { Picker, StyleSheet, Text, Button, View, TextInput } from 'react-native'
import { setUser, setToken, setOrg, setFacility } from '../utils/user'
import { refreshAxios } from '../utils/http'
import { handleAPIError, showError } from '../utils/error'
import { signin as signinAPI } from '../api/signin'
import { getFacilityInfo } from '../api/facility'

export default class Login extends Component {
    state = {
        loading: false,
        phone: "",
        pass: "",
        orgs: [
            {
                name: "Org 0",
                endpoint: "http://34.125.115.98:3005",
            },
            {
                name: "Org 1",
                endpoint: "http://34.125.115.98:3005",
            },
            {
                name: "Org 2",
                endpoint: "http://34.125.115.98:3005",
            },
        ],
        selectedOrg: "http://34.125.115.98:3005",
    }

    signin = () => {
        const { phone, pass } = this.state

        let isSuccess = false
        this.setState({ loading: true })

        setOrg(this.state.selectedOrg)
            .then(() => refreshAxios())
            .then(() => getFacilityInfo())
            .then(({ data: { facility } }) => setFacility(facility))
            .then(() => signinAPI(phone, pass))
            .then(({ data }) => {
                return Promise.all([
                    setUser(data.user),
                    setToken(data.token),
                ])
            })
            .then(() => refreshAxios())
            .then(() => isSuccess = true)
            .catch(err => {
                let errMsg = handleAPIError(err)
                showError(errMsg)
            })
            .finally(() => {
                this.setState({ loading: false })

                if (isSuccess) {
                    this.props.navigation.navigate('App')
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formItem}>
                    <Text>Phone number</Text>
                    <TextInput
                        keyboardType="phone-pad"
                        editable={!this.state.loading}
                        style={styles.pkeyInput}
                        onChangeText={text => this.setState({ phone: text })}
                        autoCompleteType="off"
                        secureTextEntry={true}
                        value={this.state.phone}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text>Password</Text>
                    <TextInput
                        editable={!this.state.loading}
                        style={styles.pkeyInput}
                        onChangeText={text => this.setState({ pass: text })}
                        autoCompleteType="password"
                        secureTextEntry={true}
                        value={this.state.pass}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text>Organization</Text>
                    <View style={styles.pkeyInput}>
                        <Picker
                            style={{ height: 40 }}
                            selectedValue={this.state.selectedOrg}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedOrg: itemValue })}
                        >
                            {
                                this.state.orgs.map((org, index) => (
                                    <Picker.Item key={index} label={org.name} value={org.endpoint} />
                                ))
                            }
                        </Picker>
                    </View>
                </View>
                <Button
                    disabled={this.state.loading}
                    title="Sign In"
                    color="#ff8000"
                    onPress={this.signin}
                />
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
    formItem: {
        width: "100%",
    },
    pkeyInput: {
        height: 40,
        // width: "100%",
        marginVertical: 10,
        borderColor: 'gray',
        borderWidth: 1,
    }
});