/**
 * Created by Юрій on 15.04.2017.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet,
    Image
} from 'react-native'
import common from './styles/common'
import Contacts from 'react-native-contacts'

export default class ContactsPresenter extends Component {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {dataSource: this.ds};
    }

    componentDidMount() {
        Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
                // x.x
            } else {
                let contactsMod = contacts.map((contact) => {
                    return {
                        name: (contact.givenName || contact.firstName || "") + " " + (contact.familyName || contact.lastName || ""),
                        image: contact.thumbnailPath,
                    };
                });

                this.setState({dataSource: this.ds.cloneWithRows(contactsMod)});
            }
        })
    }

    render() {
        return (
            <ListView
                style={common.list}
                dataSource={this.state.dataSource}
                renderRow={this.renderNewRow}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
            />
        );
    }

    renderNewRow(data) {
        let doShowImage = !!data.image;
        return (
                <View style={styles.rowContainer}>
                    { doShowImage && <Image style={styles.icon} source={{uri: data.image}}/>}
                    { !doShowImage && <View style={[styles.icon, {backgroundColor: '#5a605f'}]}/>}
                    <Text style={styles.rowText}>{data.name}</Text>
                </View>);
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'center'
    },

    rowText: {
        marginLeft: 10,
        fontSize: 16
    },

    icon: {
        borderRadius: 50,
        width: 50,
        height: 50,
        marginLeft: 10
    },

    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#a9a9a9',
        marginHorizontal: 10
    },
});