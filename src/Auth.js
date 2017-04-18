/**
 * Created by Юрій on 18.04.2017.
 */
import React, {Component} from 'react';

export default class Auth extends Component {

    constructor(props) {
        super(props)

        var config = {
            apiKey: "AIzaSyA8mYmlQNkXIWiai9CB11irBVWQvJLYggM",
            authDomain: "reactmessenger-a2cbb.firebaseapp.com",
            databaseURL: "https://reactmessenger-a2cbb.firebaseio.com/",
            storageBucket: "gs://reactmessenger-a2cbb.appspot.com",
        };
        this.FirebaseApp = firebase.initializeApp(config);
    }

    render() {
        return (
            <View style={common.container}>

            </View>
        );
    }
}