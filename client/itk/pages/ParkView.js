import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
  processColor,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { React, useState, useEffect, useRef, Component } from "react";
import AppHeader from "../components/AppHeader";
import Navbar from "../components/Navbar";
import { PageStyles } from "../assets/Styles";
import light from "../assets/themes/light.js";
import ParkCard from "../components/ParkCard";
import Review from "../components/Review";
import MyCarousel from "../components/Carousel";

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

// export default function ParkView({navigation,route}) {
export default function ParkView({ navigation, route }) {

  var { props } = route.params;
  const [lat, setLat] = useState(props.lat);
  const [lon, setLon] = useState(props.lon);
  const [mapLatDelta, setMapLatDelta] = useState(0.1);
  const [mapLonDelta, setMapLonDelta] = useState(0.12050628662110796);
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

  if (!fontsLoaded) {
    return null;
  }

  // we need some type of review parser.

  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader />
      <ScrollView style={styles.contentWrap}>
        <View style={styles.textContainer}>
          <Text style={styles.introText}>{props.name}</Text>
        </View>
        <Review ratings={props.rating} placesID={props.placesID} />
        <View
          style={{
            width: "100%",
            // borderColor: "red",
            // borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.images.length > 0 && <MyCarousel images={props.images} />}
        </View>
        <ParkCard
          name={props.name}
          location={props.location}
          meetTimes={props.times}
          lat={lat}
          lon={lon}
        />
        <Text
          onPress={() => {
            navigation.navigate("Courts");
          }}
          style={{
            fontSize: 15,
            marginTop: 10,
            textAlign: "left",
            color: "white",
            textDecorationLine: "underline",
          }}
        >
          Back to Courts
        </Text>
        {/* <Navbar route={route} token={token} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: light.primary,
    position: "absolute",
  },
  introText: {
    color: "white",
    fontFamily: "RobotoSlab_400Regular",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "left",
  },
  textContainer: {
    marginTop: 10,
  },
  map: {
    height: "25%",
    width: "100%",
    borderRadius: 10,
    position: "relative",
    marginTop: 20,
    zIndex: 0,
  },
  nearbyContainer: {
    width: "100%",
    flexGrow: 0,
    maxHeight: "32%",
  },
  contentWrap: {
    width: "90%",
    flexGrow: 0,
    //position: "relative",
  },
  button: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 30,
    backgroundColor: "#176089",
    paddingTop: 5,
  },
});
