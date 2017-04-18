/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    Navigator,
    StyleSheet,
    TouchableOpacity,
    BackAndroid
} from 'react-native';
import Chats from "./Chats";
import ContactsPresenter from "./ContactsPresenter";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.navigator = null;

        this.handleBack = (() => {
            if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
                this.navigator.pop();
                return true; //avoid closing the app
            }

            return false; //close the app
        }).bind(this)
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        return (
            <Navigator
                ref={(nav) => { this.navigator = nav;}}
                initialRoute={{id: 'chats', title: "Chats"}}
                renderScene={this.navigatorRenderScene}
                sceneStyle={{marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
                configureScene={() => {return Navigator.SceneConfigs.PushFromRight}}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                        style={styles.navigationBarStyle}
                    />
                }/>
        );
    }

    navigatorRenderScene(route, navigator) {
        _navigator = navigator;
        switch (route.id) {
            case 'chats':
                return <Chats/>;
            case 'contacts':
                return <ContactsPresenter/>;
        }
    }
}

let NavigationBarRouteMapper = {
    LeftButton: (route, navigator, index, navState) => {
        if (index === 0) return null;
        return (
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => navigator.pop()}>
                <Text style={[styles.navTextStyle, styles.leftButtonStyle]}>Back</Text>
            </TouchableOpacity>);
    },
    RightButton: (route, navigator, index, navState) => {
        if (route.id === 'chats') {
            return (
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => navigator.push({id: 'contacts', title: "Choose contact"})}>
                    <Text
                        style={[styles.navTextStyle, styles.rightButtonStyle]}>+</Text>
                </TouchableOpacity>);
        } else {
            return null;
        }
    },
    Title: (route, navigator, index, navState) => {
        return (<Text style={[styles.navTextStyle, styles.titleStyle]}>{route.title}</Text>);
    },
};

var styles = StyleSheet.create({
    navigationBarStyle: {
        flex: 1,
        backgroundColor: '#66bb6a'
    },

    navTextStyle: {
        color: '#000000',
        textAlignVertical: 'center',
        fontSize: 16
    },

    rightButtonStyle: {
        flex: 1,
        width: 25,
        fontWeight: 'bold',
    },
    leftButtonStyle: {
        flex: 1,
        fontWeight: 'bold',
        marginLeft: 7,
    },
    titleStyle: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonStyle: {
        flex: 1,
    }
});

AppRegistry.registerComponent('Test', () => App);
