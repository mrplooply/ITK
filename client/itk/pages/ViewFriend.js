import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import AppHeader from "../components/AppHeader";
import BioText from "../components/BioText";
import Navbar from "../components/Navbar";
import { PageStyles } from "../assets/Styles";
import { useEffect, useState } from "react";
// need to use state to manage if the page is ready
// use conditional isReady state while we fetch data

const ViewFriend = ({route}) => {

  //imageRoute is the path which will be stored in database. For the image uri, need to make get reequst to server for base64 data
  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader route={route}/>
      <View style={PageStyles.contentWrap}>
        <View style={styles.container}>
          <Image
            source={{uri: route.params.image }}
            style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
          />
          <Text style={styles.name}>{route.params.data.fName+" "+route.params.data.lName}</Text>
          <Text style={styles.tag}>@{route.params.data.username}</Text>
        </View>
        <BioText isFriend bioText={route.params.data.bio} profilePic={route.params.image} />
        {/* <MutualFriends/> */}
        <Navbar route={route}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
  },
  name:{
    color: "white",
    fontSize: 30,
    marginTop: 10,
  },
  tag: {
    color:"#cccccc",
    fontSize: 20
  }
});

export default ViewFriend;
