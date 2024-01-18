import { useState} from 'react';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput} from 'react-native';

export default function App() {
  const [message, setMessage] = useState(' ');

  const showAlert = () => {
    Alert.alert('Hello', 'You typed: ' + message);
    console.log ('Hello'); //used for debugging, shown in the command prompt
  }

  useEffect(() => {
startGame;
  }, [])

const startGame = () => {
  //generate random number
  //initialize the message
  //reset counts
}

const compareGuess = () => {
  if (guess == randomnum) {
    Alert
    startGame();
  }

  else if(guess < rendomnum) {
    Alert
    startGame();
  }
}

  return (
    <View style={styles.container}>
      <TextInput style = {{width: 150, borderColor: 'blue', borderWidth: 3}}
      onChangeText={text => setMessage(text)}
      inputMode='numeric'
      />
      <Text>You are the best!</Text>
      <Button color = 'purple' title='press me' onPress ={showAlert}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
