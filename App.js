import * as React from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';

export default class App extends React.Component {
  state = {
    batteryLevel: null,
    batteryState: null,
    sound: null
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidUpdate() {
    if(this.state.batteryState === 2) {
      this.playSound();
    }
  }

 async _subscribe() {
    const batteryState = await Battery.getBatteryStateAsync();
    console.log(batteryState);
    this.setState({ batteryState });
    this._subscription = Battery.addBatteryStateListener(({ batteryState }) => {
      this.setState({ batteryState });
      console.log('battery state: ', batteryState);
    });
  }

  async playSound() {
    const { sound } = await Audio.Sound.createAsync(require('./assets/ES_ApplauseCrowdSFXProducer.mp3'));

    await sound.playAsync();

    setTimeout( async () => {
      await sound.unloadAsync();
  }, 2000)
  }

  _unsubscribe() {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  


  render() {
    return (
      <View style={styles.container}>

        {
          this.state.batteryState===1 
            ? <Text style={styles.notCharged}>CHARGE ME FOR CLAPS</Text> 
            : <Text style={styles.charged}>RECEIVE THE CLAPS</Text>
        }

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
    backgroundColor: '#E7E7E1'
  },

  charged: {
    backgroundColor: '#4AF40F',
    padding: 60
  },

  notCharged: {
    backgroundColor: '#F44F25',
    padding: 60
  }


});