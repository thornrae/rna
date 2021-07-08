import React, {useEffect, useState} from 'react';
import { Vibration, StyleSheet, Text, View, TouchableOpacity, FlatList, Linking } from 'react-native';
import * as Contacts from 'expo-contacts';
import { call } from 'function-bind';


export default function App() {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const {status} = await Contacts.requestPermissionsAsync();
      if(status === 'granted') {
        const contactsData = await Contacts.getContactsAsync();
        setContacts(contactsData.data);
        Vibration.vibrate([100,200,100])
      }
    }
    getContacts()

  }, [])

  function call(person) {
      const phoneNumber = person.phoneNumbers[0].digits;
      const link = `tel:${phoneNumber}`;
      Linking.canOpenURL(link)
        .then(supported => Linking.openURL(link))
        .catch(console.error);
  }

  return (
    <View style={styles.container}>
      <Text>Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={ (item) => item.id }
        renderItem={ ({item}) => 
          <TouchableOpacity style={styles.buttons} onPress={() => call(item)}>
                <Text> {item.name} </Text> 
          </TouchableOpacity>  
        } 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 80,
    // paddingLeft: 25
  },
  buttons: {
    // textAlign: 'left',
    // border: '1px solid',
    alignItems: 'center',
    backgroundColor: '#F5B041',
    margin: 10,
    padding: 3
  }
});
