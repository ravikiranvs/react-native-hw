/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
var SmsAndroid = require('react-native-sms-android');

export default class MessagesList extends Component {
  constructor() {
    super();

    this.pageSize = 10;

    let sms = [];
    this.state = { sms: [], index: 0 };
    this._onPressButton = this._onPressButton.bind(this);

    var filter = {
      box: 'inbox',
      indexFrom: 0,
      maxCount: this.pageSize,
    };

    SmsAndroid.list(JSON.stringify(filter), (fail) => {
      console.error("Error while loading messages: " + fail)
    },
      (count, smsList) => {
        var arr = JSON.parse(smsList);
        this.setState({ sms: [...arr] });
      });
  }

  _onPressButton(event) {
    var filter = {
      box: 'inbox',
      indexFrom: this.state.index + this.pageSize,
      maxCount: this.pageSize
    };

    SmsAndroid.list(JSON.stringify(filter), (fail) => {
      console.warn("Error while loading messages: " + fail)
    },
      (count, smsList) => {
        var arr = JSON.parse(smsList);
        let sms = [...this.state.sms, ...arr];
        this.setState({ sms: sms, index: this.state.index + this.pageSize });
      });
  }

  _showMessage(id) {
    this.props.navigator.push({
      title: 'Message',
      index: id
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>Messages</Text></View>
        <ScrollView style={styles.content}>
          {this.state.sms.map((smsEnrty, index) => {
            const msgStyle = smsEnrty.read == 0 ? messageStyle.mainViewUnread : messageStyle.mainView;
            return (
              <TouchableHighlight onPress={this._showMessage.bind(this, smsEnrty._id) }  key={smsEnrty._id} >
                <View style={msgStyle}>
                  <Text style={messageStyle.address}>{smsEnrty.address} - {smsEnrty._id}</Text>
                  <Text>{smsEnrty.body}</Text>
                </View>
              </TouchableHighlight>
            );
          }) }
          <TouchableNativeFeedback onPress={this._onPressButton} background={TouchableNativeFeedback.SelectableBackground() }><View style={messageStyle.showMore}><Text>Show More</Text></View></TouchableNativeFeedback>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5ACAF',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue'
  },
  headerText: {
    color: '#F5FCFF'
  },
  content: {
    flex: 16
  }
});

const messageStyle = StyleSheet.create({
  mainView: {
    marginBottom: 1,
    padding: 8,
    backgroundColor: '#EAECEF'
  },
  mainViewUnread: {
    marginBottom: 1,
    padding: 8,
    backgroundColor: '#F5FCFF'
  },
  address: {
    color: '#333333'
  },
  showMore: {
    marginBottom: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});