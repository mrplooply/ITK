import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import AppHeader from "../components/AppHeader";
import PickImage from "../components/ImagePicker";
import { useNavigation } from "@react-navigation/native";
import { PageStyles } from "../assets/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BIO_KEY, TOKEN, PROFILE_PIC_KEY } from "../AsyncKeys";
import { getItemFromCache } from "../ReadCache";
const EditProfile = ({ route }) => {

  const navigation = useNavigation();
  const [bio, setBio] = useState(route.params.bio);
  const [profilePic, setProfilePic] = useState(route.params.profilePic);
  const [token, setToken] = useState(null);

  const textChangeHandler = (text) => {
    setBio(text);
  };

  const logout = async () => {
    try{
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const getCache = async () => {
      const t = await getItemFromCache(TOKEN);
      setToken(t);
    };
    getCache(); // Call the async function to fetch the value
  }, []);

  const saveButtonHandler = async () => {
    try {
      await AsyncStorage.setItem(BIO_KEY, bio);
      await AsyncStorage.setItem(PROFILE_PIC_KEY, profilePic);
  
      await fetch("http://localhost:8080/user/pfp", {
        method: "PUT",
        body: JSON.stringify({
          uri: profilePic,
        }),
        headers: { "Content-Type": "application/json", token: token },
      })
  
      await fetch("http://localhost:8080/user/bio", {
        method: "PUT",
        body: JSON.stringify({
          bio: bio,
        }),
        headers: { "Content-Type": "application/json", token: token },
      })
  
      navigation.navigate("Profile");
      
    } catch (e) {
      console.log("failed to save in edit profile", e);
    }
  };
  const setImagePath = (image) => {
    setProfilePic(image);
  };

  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader action={logout} />
      <View style={PageStyles.contentWrap}>
        <PickImage
          imagePath={setImagePath}
          currentImage={route.params.profilePic}
        ></PickImage>
        <View style={styles.container}>
          <TextInput
            style={styles.textBox}
            multiline
            maxLength={150}
            onChangeText={textChangeHandler}
            placeholder="Type your bio here..."
          >
            {bio}
          </TextInput>
          <TouchableOpacity
            style={styles.save}
            onPress={saveButtonHandler}
          >
            <Text style={{ fontSize: 15, color: "white"}}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
  },
  save: {
    backgroundColor: "#1E94D7",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 10
  }
});

export default EditProfile;
