import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import MapList from '../screens/MapList';

function Historical() {
  return (
    <View style={styles.container}>
      <MapList />
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
  }
});

export default Historical;