
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
  constructor(props, context) {
    super();

    this.state = { sms: {} };

    var filter = {
      _id: props.id
    };

    SmsAndroid.list(JSON.stringify(filter), (fail) => {
      console.error("Error while loading messages: " + fail)
    },
      (count, smsList) => {
        const array = JSON.parse(smsList);

        if (array.length === 1)
          this.setState({ sms: array[0] });
      });
  }

  onBack() {
    this.props.navigator.pop();
  }

  render() {
    let displayForm = (<Text>Loading...</Text>);
    if (this.state.sms._id === this.props.id) {
      let props = [];
      for (var key in this.state.sms) {
        props.push(key);
      }

      props.sort();

      displayForm = props.map((key, index) => {
        let rowStyle = index % 2 == 0 ? msgStyles.row : msgStyles.altRow;
        return (
          <View key={key} style={rowStyle}>
            <Text style={msgStyles.prop}>{key}</Text>
            <Text style={msgStyles.value}>{this.state.sms[key]}</Text>
          </View>
        );
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableHighlight style={{flex: 1}} onPress={this.onBack.bind(this)}>
            <Text>back</Text>
          </TouchableHighlight>
          <Text style={{flex: 10}}  style={styles.headerText}>Messages</Text>
          <TouchableHighlight style={{flex: 1}}>
            <Text></Text>
          </TouchableHighlight>
        </View>
        <View style={styles.content}><ScrollView>{displayForm}</ScrollView></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
    flexDirection: 'row'
  },
  content: {
    flex: 16
  }
});

const msgStyles = StyleSheet.create({
  row: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row'
  },
  altRow: {
    backgroundColor: '#F0F0F0',
    flexDirection: 'row'
  },
  prop: {
    flex: 3,
    padding: 3
  },
  value: {
    flex: 7,
    padding: 3
  }
});


        // <Text>id: {this.state.sms._id}</Text>
        // <Text>thread_id: {this.state.sms.thread_id}</Text>
        // <Text>address: {this.state.sms.address}</Text>
        // <Text>date: {this.state.sms.date}</Text>
        // <Text>date_sent: {this.state.sms.date_sent}</Text>
        // <Text>protocol: {this.state.sms.protocol}</Text>
        // <Text>read: {this.state.sms.read}</Text>
        // <Text>status: {this.state.sms.status}</Text>
        // <Text>type: {this.state.sms.type}</Text>
        // <Text>reply_path_present: {this.state.sms.reply_path_present}</Text>
        // <Text>body: {this.state.sms.body}</Text>
        // <Text>service_center: {this.state.sms.service_center}</Text>
        // <Text>locked: {this.state.sms.locked}</Text>
        // <Text>error_code: {this.state.sms.error_code}</Text>
        // <Text>seen: {this.state.sms.seen}</Text>
        // <Text>timed: {this.state.sms.timed}</Text>
        // <Text>deleted: {this.state.sms.deleted}</Text>
        // <Text>sync_state: {this.state.sms.sync_state}</Text>
        // <Text>marker: {this.state.sms.marker}</Text>
        // <Text>source: {this.state.sms.source}</Text>
        // <Text>bind_id: {this.state.sms.bind_id}</Text>
        // <Text>mx_status: {this.state.sms.mx_status}</Text>
        // <Text>out_time: {this.state.sms.out_time}</Text>
        // <Text>account: {this.state.sms.account}</Text>
        // <Text>sim_id: {this.state.sms.sim_id}</Text>
        // <Text>block_type: {this.state.sms.block_type}</Text>
        // <Text>advanced_seen: {this.state.sms.advanced_seen}</Text>
        // <Text>fake_cell_type: {this.state.sms.fake_cell_type}</Text>
        // <Text>url_risky_type: {this.state.sms.url_risky_type}</Text>