import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { getToken, setFacility, checkTokenExpire } from '../utils/user'
import { getFacilityInfo } from '../api/facility'

export default class AuthLoading extends Component {
    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        try {
            let {data: {facility}} = await getFacilityInfo()
            await setFacility(facility)
            let token = await getToken()
            this.props.navigation.navigate(checkTokenExpire(token) ? 'App' : 'Auth');
        } catch (error) {
            this.props.navigation.navigate('Auth');
        }
    };

    render() {
        return (
            <View>
                <Text> Loading </Text>
            </View>
        )
    }
}
