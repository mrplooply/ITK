import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  RobotoSlab_100Thin,
  RobotoSlab_200ExtraLight,
  RobotoSlab_300Light,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_600SemiBold,
  RobotoSlab_700Bold,
  RobotoSlab_800ExtraBold,
  RobotoSlab_900Black,
} from "@expo-google-fonts/roboto-slab";
import light from "../assets/themes/light";
import { useNavigation } from "@react-navigation/native";
import { PROFILE_PIC_KEY } from "../AsyncKeys";
import { getItemFromCache } from "../ReadCache";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppHeader = ({ route, action }) => {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    RobotoSlab_100Thin,
    RobotoSlab_200ExtraLight,
    RobotoSlab_300Light,
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_600SemiBold,
    RobotoSlab_700Bold,
    RobotoSlab_800ExtraBold,
    RobotoSlab_900Black,
  });

  const [profilePic, setProfilePic] = useState();
  const [isReady, setIsReady] = useState(false);
  // make sure that page is rerendered and cache fetched again
  useEffect(() => {
    navigation.addListener("focus", () => {
      getProfilePic();
    });

    const getProfilePic = async () => {
      const pfp = await getItemFromCache(PROFILE_PIC_KEY);
      setProfilePic(pfp);
      setIsReady(true);
    };
    getProfilePic();
  }, [navigation]);

  if (!fontsLoaded || !isReady) {
    return null;
  }

  return (
    // overall container view and split into 3 seperate views
    <SafeAreaView style={styles.main}>
      <TouchableOpacity
        style={styles.imgWrap}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          style={[styles.img, styles.profile]}
          source={
            profilePic
              ? { uri: profilePic }
              : require("../assets/TempProfilePic.jpeg")
          }
        />
      </TouchableOpacity>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>In the Kitchen</Text>
      </View>
      <TouchableOpacity
        style={styles.imgWrap}
        onPress={action ? action : () => {}}
      >
        <Image
          style={[styles.img]}
          source={
            route
              ? require("../assets/add2.png")
              : require("../assets/logout.png")
          }
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    backgroundColor: light.primary,
    alignItems: "center",
    shadowColor: light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: "25%",
    shadowRadius: 4,
  },
  img: {
    height: "100%",
    aspectRatio: 1,
  },
  profile: {
    flex: 1,
    borderRadius: 360,
  },
  imgWrap: {
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  titleWrap: {
    flex: 3,
    paddingHorizontal: 5,
  },
  title: {
    fontFamily: "RobotoSlab_400Regular",
    fontSize: 28,
    color: "white",
  },
});

export default AppHeader;
