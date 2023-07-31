import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import light from "../assets/themes/light";

const BioText = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.textBox}>{props.bioText}</Text>
      <TouchableOpacity
        style={[styles.edit, {display: props.isFriend ? "none" : "flex"}]}
        onPress={() =>
          navigation.navigate("EditProfile", {
            bio: props.bioText,
            profilePic: props.profilePic,
          })
        }
      >
        <Text style={{color:"white", fontSize:20}}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#176089",
    alignItems: "center",
    maxHeight: 140,
  },
  textBox: {
    color: "black",
    backgroundColor: "white",
    borderColor: "white",
    fontSize: 16,
    overflow: "hidden",
    height: 100,
    width: 250,
    borderRadius: 15,
    marginTop: 15,
    padding: 10,
    textAlignVertical: "center",
  },
  edit: {
    marginVertical: 20,
    backgroundColor: light.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8
  }
});

export default BioText;
