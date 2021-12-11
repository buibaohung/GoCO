import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Navigation from "./navigation";

export default class MyApp extends Component {
    render() {
        return (
            <Navigation uriPrefix="fotrabuss://" />
        )
    }
}
