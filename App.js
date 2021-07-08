import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Linking } from 'react-native';
import * as Contacts from 'expo-contacts';


export default function App() {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const {status} = await Contacts.requestPermissionsAsync();
      if(status === 'granted') {
        const contactsData = await Contacts.getContactsAsync();
        console.log(contactsData);
      }
    }
    getContacts()

  }, [])

  return (
    <View style={styles.container}>
      <Text>hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
