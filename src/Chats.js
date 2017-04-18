/**
 * Created by Юрій on 15.04.2017.
 */

import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native'
import common from './styles/common'

export default class Chats extends Component {
    render() {
        return (
            <View style={common.container}>
                <Text>You have no chats yet!</Text>
            </View>
        );
    }
}