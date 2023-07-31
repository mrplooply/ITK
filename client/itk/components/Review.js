import { Rating, AirbnbRating } from 'react-native-ratings';
import {React, useState, useEffect, useRef} from "react";
import { View, StyleSheet, Text, Alert, processColor, TouchableOpacity,Modal,Pressable } from "react-native";
import axios from 'axios';
const PICKLEBALL_IMG = require('../assets/pickleball.png');


export default function Review(props){
    console.log(props)
    const [modalVisible, setModalVisible] = useState(false);
    const [userRating , setUserRating] = useState(3);
    const [parkRatings, setParkRating]= useState(props.ratings)
    const [parkScore, setParkScore] = useState(0);
    useEffect(()=>{
        var score = 0
        console.log(parkRatings)
        for(var i = 0; i<parkRatings.length; i++){
            score+=props.ratings[i];
        }
        setParkScore((score/parkRatings.length))
        console.log("SCORE",parkScore)

    },[parkRatings,parkScore])

   
    function ratingCompleted(rating) {
        // console.log("Rating is: " + rating)
        setUserRating(rating)
    } 
    function submitReview(){
        //make post method from here
        axios({
            method: 'put',
            url: `http://localhost:8080/courts/${props.placesID}/rating/${userRating}`,
          }).then((response) => {
            // console.log(response.status)
            if(response.status == 201){
                Alert.alert("Your review has been added!");
                var currentReviews = parkRatings;
                currentReviews.push(userRating);
                setParkRating(currentReviews);
            }else{
                Alert.alert("There was an issue adding your review...")
            }
            // console.log("location",response.data.result.geometry.location);  //just to see what the location was
            //gotta set the map here
            
          });    
        
    }
    return(
        <View >
        <View 
            style = {{width: "100%",
                        height: 50,
                        borderRadius: 20,
                        // backgroundColor: "white",
                        marginVertical: 10,
                        paddingHorizontal: 20,
                        flexDirection: "row",
                        alignItems: "left",
        }}>
            <Rating
                type = "custom"
                ratingImage = {PICKLEBALL_IMG}
                ratingColor='#176089'
                ratingBackgroundColor='#176089'
                ratingCount={parkScore}
                imageSize={30}
                defaultRating = {parkScore}
                readonly = {true}
                reviewSize = {20}
                // review = {reviews}
                showRating = {false}
                isDisabled = {true}
                style = {{flex:3,alignItems:"left",left:-25}}
            />
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={{fontFamily:"RobotoSlab_500Medium", fontSize: 14, color:"white"}}>Review</Text>
            </Pressable>
        </View>
        
       
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{fontFamily:"RobotoSlab_500Medium", fontSize: 16, color:"black", textAlign: "center"}}>Leave a reivew</Text>
                        <AirbnbRating
                            ratingColor='yellow'
                            ratingBackgroundColor='white'
                            reviewColor= 'white'
                            ratingCount={5}
                            size={25}
                            defaultValue = {3}
                            // reviewSize = {15}
                            // reviews = {reviews}
                            showRating = {false}
                            onFinishRating = {ratingCompleted}
                            ratingContainerStyle = {{paddingTop: 10, paddingBottom: 15, fontFamily:"RobotoSlab_400Regular"}}
                        />
                        {/* <TouchableOpacity onPress = {submitReview} style={styles.button} title="submit"><Text style={styles.introText}>Submit Review</Text></TouchableOpacity> */}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                submitReview()
                                }}>
                        <Text style={{fontFamily:"RobotoSlab_500Medium", fontSize: 16, color:"white", textAlign: "center"}}>Submit</Text>
                        </Pressable>
                    </View>
             </View>
        </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
        // marginTop:20,
        alignItems:"center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: "#1E94D7",
        padding: 5,

    },
    buttonOpen: {
      backgroundColor: "#1E94D7",
      right:-20,
      width:80
    },
    buttonClose: {
        // paddingTop: 10,
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 5,
      textAlign: 'center',
    },
  });
  
  