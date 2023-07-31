import React, { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default PickImage = (props) => {
  const [profilePic, setProfilePic] = useState(props.currentImage);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      // maxWidth: 10,
      // maxHeight: 10,
      // quality: 0.7,
    });
    if (!result.canceled) {
      console.log("pic size = ", result.assets[0].fileSize);
      setProfilePic("data:image/jpeg;base64," + result.assets[0].base64);
      props.imagePath("data:image/jpeg;base64," + result.assets[0].base64);
    } else {
      props.imagePath(props.currentImage);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          profilePic
            ? { uri: profilePic }
            : require("../assets/TempProfilePic.jpeg")
        }
        style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
      />
      <Button title="Edit" onPress={pickImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    maxHeight: 200,
    minHeight: 180,
    alignItems: "center",
  },
});
