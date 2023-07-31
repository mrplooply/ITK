
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
var name = "Gojo Satoru"
var date = '10/15/21'
var  description = "Come join us tomorrow at Brommer Street Park! We’ll be meeting up to play from 9am - 1pm. The more the merrier, See you there 🙈"
var  imageSource = require("../assets/TempProfilePic.jpeg")
//{name, date,description,imageSource}
const Card = () => {
    return (
        <View style={styles.card}>
          <View style={styles.contentContainer}>
            <Image source={imageSource} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.dateText}>{date}</Text>
            </View>
          </View>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      );
};

const styles = StyleSheet.create({
    card: {
    position: 'absolute',
    top: 400,
    width:372,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    },
    contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    },
    profileImage: {
    width: 70,
    height: 73,
    borderRadius: 100,
    marginRight: 16,
    },
    textContainer: {
    flexDirection: 'column',
    },
    nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    },
    dateText: {
    fontSize: 16,
    color: '#888888',
    },
    descriptionText: {
    fontSize: 18,
    },
});
 export default Card;