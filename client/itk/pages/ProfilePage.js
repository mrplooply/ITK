import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Image, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import BioText from "../components/BioText";
import MutualFriends from "../components/MutualFriends";
import Navbar from "../components/Navbar";
import { PageStyles } from "../assets/Styles";
import { BIO_KEY, PROFILE_PIC_KEY, FNAME, LNAME, UNAME } from "../AsyncKeys";
import { getItemFromCache } from "../ReadCache";
import AsyncStorage from "@react-native-async-storage/async-storage";
// need to use state to manage if the page is ready
// use conditional isReady state while we fetch data

const ProfilePage = ({ navigation, route }) => {
  const [bio, setBio] = useState("N/A");
  const [profilePic, setProfilePic] = useState();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [info, setInfo] = useState({
    pfp: null,
    bio: "N/A",
    username: "N/A",
    name: "N/A",
  });

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  // make sure that page is rerendered
  useEffect(() => {
    navigation.addListener("focus", () => {
      getCache();
    });

    const getCache = async () => {
      const pfp = await getItemFromCache(PROFILE_PIC_KEY);
      const desc = await getItemFromCache(BIO_KEY);
      const fname = await getItemFromCache(FNAME);
      const lname = await getItemFromCache(LNAME);
      const uname = await getItemFromCache(UNAME);

      // AsyncStorage.multiGet([
      //   PROFILE_PIC_KEY,
      //   BIO_KEY,
      //   FNAME,
      //   LNAME,
      //   UNAME,
      // ]).then((response) => {
      //   console.log(response[1][1]);
      // });

      // setProfilePic(pfp);
      // setBio(desc);
      // setName(fname + " " + lname);
      // setUsername(uname);

      setInfo({
        pfp: pfp,
        bio: desc,
        username: uname,
        name: fname + " " + lname,
      });
    };
  }, [route.name]);

  console.log("refreshed");

  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader action={logout} />
      <View style={PageStyles.contentWrap}>
        <View style={styles.container}>
          <Image
            source={
              info.pfp
                ? { uri: info.pfp }
                : require("../assets/TempProfilePic.jpeg")
            }
            style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
          />
          <Text style={styles.name}>{info.name}</Text>
          <Text style={styles.tag}>@{info.username}</Text>
        </View>
        <BioText bioText={info.bio} profilePic={info.pfp} />
        {/* <MutualFriends/> */}
        <Navbar route={route} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
  },
  name: {
    color: "white",
    fontSize: 30,
    marginTop: 10,
  },
  tag: {
    color: "#cccccc",
    fontSize: 20,
  },
});

export default ProfilePage;
