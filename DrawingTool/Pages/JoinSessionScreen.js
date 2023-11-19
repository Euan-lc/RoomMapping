// JoinSessionScreen.js

import React, { useState } from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import io from 'socket.io-client';

const JoinSessionScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [sessionId, setSessionId] = useState("");
  const socket = io("http://192.168.0.90:3000");

  const joinSession = () => {
    socket.emit("joinSession", { username, sessionId });
    navigation.navigate("Canvas", { username, sessionId });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter session ID"
        value={sessionId}
        onChangeText={(text) => setSessionId(text)}
      />
      <Button title="Join Session" onPress={joinSession} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
});

export default JoinSessionScreen;
