
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

export default class Analyser extends Component {
  constructor(props, context) {
    super();

    this.pageSize = 10;

    this.state = { messages: [], foundMessages: 0, address: [], loading: true };

    this.messageReadCallback = this.messageReadCallback.bind(this);

    this.readAllMessages = this.readAllMessages.bind(this);

    this.readAllMessages(startIndex = 0, pageSize = 10, callback = this.messageReadCallback);
  }

  messageReadCallback(sms) {
    let address = Object.assign({}, this.state.address);
    sms.map((entry) => {
      let addressMessages = address[entry.address];
      if(addressMessages && addressMessages.length){
        addressMessages.push(entry);
      } else {
        address[entry.address] = [entry];
      }
    });

    this.setState({
      messages: [...this.state.messages, ...sms],
      foundMessages: this.state.foundMessages + sms.length
    });
  }

  readAllMessages(startIndex, pageSize, callback) {
    var filter = {
      box: 'inbox',
      indexFrom: startIndex,
      maxCount: this.pageSize,
    };

    SmsAndroid.list(JSON.stringify(filter), (fail) => {
      console.error("Error while loading messages: " + fail)
    }, (count, smsList) => {
      var arr = JSON.parse(smsList);
      if (arr.length > 0) {
        callback(arr);
        this.readAllMessages(startIndex + pageSize, pageSize, callback);
      }
      else {
        this.setState({loading: false});
      }
    });
  }

  render() {
    let addressView = null;
    if(this.state.loading){
      addressView = <Text>Analysing Message: {this.state.foundMessages}</Text>;
    } else {
      addressView = <Text>Done Loading</Text>
    }
    return (
      <View style={{ flex: 1 }}>
        {addressView}
      </View>
    );
  }
}