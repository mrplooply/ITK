import * as React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

const buttonHandler = () => {
  console.log("send message button pressed");
};

const SendMessageButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={buttonHandler}>
        <View style={styles.insideButton}>
          <Image
            style={styles.sendIcon}
            source={require("../assets/send_icon.png")}
          ></Image>
          <Text style={styles.title}>Send Message</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.5,
    maxHeight: 60,
  },
  button: {
    backgroundColor: "#1E94D7",
    height: 48,
    width: "50%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
  },
  title: {
    marginTop: 10,
    marginRight: 5,
    color: "white",
    fontSize: 20,
  },
  sendIcon: {
    height: 40,
    width: 40,
    marginLeft: 5,
    marginTop: 3,
  },
  insideButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default SendMessageButton;
