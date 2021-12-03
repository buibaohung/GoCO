import React, {Component} from 'react';
import {Easing, Animated} from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Signin from '../screens/Signin'
import QRScan from '../screens/QRScan'
import AuthLoading from '../screens/AuthLoading'
import SelectEvent from '../screens/SelectEvent'
import Aggregation from '../screens/event/Aggregation'
import AddLot from '../screens/event/Aggregation/AddLot'
import Transformation from '../screens/event/Transformation'
import StartDelivery from '../screens/event/StartDelivery'

const AppStack = createStackNavigator(
    {
        QRScan,
        SelectEvent,
        Aggregation,
        AddLot,
        Transformation,
        StartDelivery,
    },
    {
        initialRouteName: "QRScan",
        headerMode: 'none',
    }
);
const AuthStack = createStackNavigator(
    {
        Signin,
    },
    {
        initialRouteName: 'Signin',
        headerMode: 'none',
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
        headerMode: 'none',
    }
));
