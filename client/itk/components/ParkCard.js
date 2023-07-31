import { View, StyleSheet, Text, ScrollView, SafeAreaView, Alert, processColor, TouchableOpacity, Linking } from "react-native";
import {React, useState, useEffect, useRef} from "react";
import {PageStyles} from "../assets/Styles";
import light from "../assets/themes/light.js";
const PICKLEBALL_IMG = require('../assets/pickleball.png');
import axios from 'axios';
import * as Location from 'expo-location';



export default function ParkCard(props){
    const [meetings, setMeetings] = useState();
    //props: meeting times, address, placeId, 
    const [userCurrentLocation, setUserCurrentLocation] = useState({latitude:0,longitude:0});
    useEffect(()=>{
        function mapMeetTimes(){
            setMeetings(props.meetTimes.map((item,index)=>{
                // console.log(item)
                return(
                    <Text
                      key = {index*100}
                      style = {{fontFamily:"RobotoSlab_700Bold", fontSize: 18, textAlign : "left", color:"grey",paddingTop:5}}
                      >{item.day + " " + item.start + " " + item.end}</Text>
                )
                
            }))
        }
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              console.log("Please grant location permissions");
              return;
            }
      
            let currentLocation = await Location.getCurrentPositionAsync({});
            // (currentLocation);
            console.log("Location:");
            console.log(currentLocation);
      
            // setMapLat(currentLocation.coords.latitude);
            // setMapLon(currentLocation.coords.longitude);
            setUserCurrentLocation({lat:currentLocation.coords.latitude,lon:currentLocation.coords.longitude})
        };
          
        getPermissions();
        mapMeetTimes()
    },[])
    
   
    return (
        <View style = {styles.main}>
            <Text style={{fontFamily:"RobotoSlab_700Bold", fontSize: 18, textAlign : "left", color:"grey",paddingVertical:5}}>{props.location}</Text>
            <Text style={{fontFamily:"RobotoSlab_700Bold", fontSize: 24, textAlign : "left", color:"black", paddingVertical:5}}>Meet Times:</Text>
            {/* <Text style = {{}>{props.meetTimes}</Text> */}
            {meetings}
            {/* <Text style = {{fontFamily:"RobotoSlab_700Bold", fontSize: 18, textAlign : "left", color:"grey",paddingTop:5}}>{props.meetTimes[0]}</Text> */}
            <TouchableOpacity style = {styles.button} onPress={() => Linking.openURL(`maps://app?saddr=${userCurrentLocation.lat}+${userCurrentLocation.lon}&daddr=${props.lat}+${props.lon}`)}>
                <Text style={{fontFamily:"RobotoSlab_700Bold", fontSize: 16, color:"white"}}>Get Directions</Text>
            </TouchableOpacity>

        </View>

    )
}


const styles = StyleSheet.create({
    main:{
        width: "100%",
        borderRadius: 20,
        backgroundColor: "white",
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "column",
        alignItems: "left",
    },    
    button: {
        marginTop:20,
        alignItems:"center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: "#1E94D7",
        paddingVertical: 5,
        paddingHorizontal: 10
    },
});