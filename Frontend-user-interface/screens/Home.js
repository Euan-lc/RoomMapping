import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native'

function Home({ navigation }) {

  return (
    
    <View style={styles.container}>

      <ImageBackground
        source={require('../assets/airsoft/inside-airsoft.jpg')}
        style={styles.background}
      >

        <View style={styles.container}>
          <Text style={styles.title}>
            RoomMapping
          </Text>
          <Text style={styles.subtitle}>
            Enhance your airsoft experience
          </Text>
        </View>

        <Button
          title="Historique des scans"
          style={styles.button}
          onPress={() => navigation.navigate('Historical')}
        />

      </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 150,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
    textAlign: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    width: '100%',
  },
  button: {
    marginTop: 50,
  }
});

export default Home;