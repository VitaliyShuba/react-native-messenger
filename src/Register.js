/**
 * Created by Юрій on 18.04.2017.
 */
import React, {Component} from "react";
import common, {PRIMARY_LIGHT, PRIMARY_TEXT_COLOR} from "./styles/common";
import * as firebase from "firebase";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {EMAIL_REGEX} from "./constants/RegExps";

export default class Register extends Component {


    constructor(props) {
        super(props);

        let config = {
            apiKey: "AIzaSyA8mYmlQNkXIWiai9CB11irBVWQvJLYggM",
            authDomain: "reactmessenger-a2cbb.firebaseapp.com",
            databaseURL: "https://reactmessenger-a2cbb.firebaseio.com/",
            storageBucket: "gs://reactmessenger-a2cbb.appspot.com",
        };
        this.FirebaseApp = firebase.initializeApp(config);

        this.onRegisterPressed = this.onRegisterPressed.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    componentDidMount() {
        this.setState({ email: '', phone: '', password: ''});
    }

    onRegisterPressed() {
        if (!EMAIL_REGEX.test(this.state.email)) {
            Alert.alert('Invalid email',
                'Please enter valid email address',
                [
                    {text: 'OK'}
                ])
        }
        this.signUp();
    }

    async signUp() {
        try {
            let user = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            console.log('User created userId = ' + user.toJSON());

            await firebase.database().ref('user').child(user.uid).set({
                phoneNumber: this.state.phone
            });

        } catch (error) {
            console.log(error.toString())
        }
    }

    render() {
        return (
            <View style={[common.container, styles.authContainer]}>
                <TextInput style={styles.textInput}
                           autoCorrect={false} autoFocus={true} placeholder={'Email'} returnKeyType={'next'}
                           keyboardType={'email-address'} onChange={(event) => this.setState({email: event.nativeEvent.text})}/>
                <TextInput style={styles.textInput}
                           autoCorrect={false} keyboardType={'phone-pad'} returnKeyType={'next'}
                           placeholder={'Phone number'} onChange={(event) => this.setState({phone: event.nativeEvent.text})}/>
                <TextInput style={styles.textInput}
                           autoCorrect={false} secureTextEntry={true}
                           placeholder={'Password'} onChange={(event) => this.setState({password: event.nativeEvent.text})}/>
                <TouchableOpacity style={styles.touchableButton}
                    onPress={this.onRegisterPressed}>
                    <Text style={styles.textButton}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    authContainer: {
        alignItems: 'stretch',
        paddingHorizontal: 16
    },

    textInput: {
        fontSize: 16,
        color: PRIMARY_TEXT_COLOR,
    },

    touchableButton: {
        alignSelf: 'center',
        backgroundColor: PRIMARY_LIGHT,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10
    },

    textButton: {
        color: PRIMARY_TEXT_COLOR,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});