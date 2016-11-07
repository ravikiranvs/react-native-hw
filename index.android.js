/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text
} from 'react-native';
import MessagesList from './components/message-list';
import Message from './components/message-display';
import Analyser from './components/analyzer'



class MessengerApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Analyser', index: 0 }}
        renderScene={(route, navigator) => {
          if(route.title == 'Messages')
            return <MessagesList navigator={navigator} />;
          else if(route.title == 'Message'){
            return <Message navigator={navigator} id={route.index} />;
          }
          else if(route.title == 'Analyser'){
            return <Analyser navigator={navigator} />;
          }
        }
        }
        />
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => MessengerApp);
