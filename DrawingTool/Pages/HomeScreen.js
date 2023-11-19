// Pages/HomeScreen.js

import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToCreateSession = () => {
    navigation.navigate("CreateSession");
  };

  const navigateToJoinSession = () => {
    navigation.navigate("JoinSession");
  };

  return (
    <View style={styles.container}>
      <Button title="Create a Session" onPress={navigateToCreateSession} />
      <Button title="Join a Session" onPress={navigateToJoinSession} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
