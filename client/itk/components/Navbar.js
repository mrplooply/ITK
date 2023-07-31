import * as React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import light from "../assets/themes/light";

const Navbar = ({route}) => {
    const navigation = useNavigation();
    return(
        <View style = {styles.navWrap}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={route.name == "Home" ? styles.buttonSelected : styles.button} title="home"><Image style={styles.img} source={route.name == "Home" ? require("../assets/home-1.png") : require("../assets/home-2.png")}/></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Courts')} style={route.name == "Courts" ? styles.buttonSelected : styles.button} title="courts"><Image style={styles.img} source={route.name == "Courts" ? require("../assets/courts-1.png") : require("../assets/courts-2.png")}/></TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} title="add"><Image style={styles.img} source={require("../assets/add.png")}/></TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.navigate('Friends')} style={route.name == "Friends" ? styles.buttonSelected : styles.button} title="friends"><Image style={styles.img} source={route.name == "Friends" ? require("../assets/user-1.png") : require("../assets/user-2.png")}/></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={route.name == "Messages" ? styles.buttonSelected : styles.button} title="messages"><Image style={styles.img} source={route.name == "Messages" ? require("../assets/messages-1.png") : require("../assets/messages-2.png")}/></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navWrap: {
        width: "100%",
        minHeight: 50,
        maxHeight: 70,
        height: "15%",
        borderRadius: 25,
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 0,
    },
    button:{
        borderRadius: 10,
        padding: 10
    },
    buttonSelected:{
        backgroundColor: light.primary,
        borderRadius: 10,
        padding: 10
    },
    img: {
        height: "80%",
        aspectRatio: 1
    }
})
export default Navbar;