import * as React from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  state = {
    batteryLevel: null,
    batteryState: null
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

 async _subscribe() {
    const batteryState = await Battery.getBatteryStateAsync();
    console.log(batteryState);
    this.setState({ batteryState });
    this._subscription = Battery.addBatteryStateListener(({ batteryState }) => {
      this.setState({ batteryState });
      console.log('battery is charging !', batteryState);
    });
  }



  _unsubscribe() {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Current Battery State: {this.state.batteryState}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});