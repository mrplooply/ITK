import * as React from "react"
import {View,Text,StyleSheet, TouchableOpacity, Alert} from "react-native"
import light from "../assets/themes/light.js";
import { useNavigation } from '@react-navigation/native';

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
} from '@expo-google-fonts/roboto-slab';
export default function ParkTab(props) {
    // function redirect(){
    //     console.log("HELLO", props.name);
    //     //redirect using props.fullBody
    //     //redirect to Park page
    // }
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

    return (
        <View style={styles.main}>
            <Text style={{fontFamily:"RobotoSlab_700Bold", fontSize: 18, flex: 3}}>{props.name}</Text>
            <TouchableOpacity onPress = {props.onPress} style={styles.button} title="View Park"><Text style={{color:"white",fontFamily:"RobotoSlab_400Regular"}}>View Park</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        width: "100%",
        height: 60,
        borderRadius: 20,
        backgroundColor: "white",
        marginVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        flex: 1,
        alignItems:"center",
        justifyContent: "center",
        borderRadius: 10,
        height: "65%",
        backgroundColor: "#176089",
        paddingHorizontal: 10,
    },
});