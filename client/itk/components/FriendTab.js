import * as React from "react"
import {View,Text,StyleSheet, TouchableOpacity, Image} from "react-native"
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
import light from "../assets/themes/light";
import { useNavigation } from "@react-navigation/native";

export default function FriendTab(props) {

    const navigation = useNavigation();
    const [image,setImg] = React.useState();

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

    React.useEffect(() => {

        const getImage = () => {
    
          fetch(`http://localhost:8080/images/${props.data.image}`,{
              method: "GET",
              headers: {"Content-Type":"appllication/json"}
          })
          .then(res => res.json())
          .then(data => {
              setImg("data:image/jpeg;base64,"+data.imageData);
          })
          .catch(e => console.log('err',e));
    
        }
    
        getImage();
    
    },[image]);

    if (!fontsLoaded) {
      return null;
    }

    if (!image) return;

    return (
        <View style={styles.main}>
            <View style={styles.imgWrap}>
                <Image style={styles.img} source={{uri: image}} />
            </View>
            <View style={styles.nameWrap}>
                <Text style={styles.name}>{props.name}</Text>
            </View>
            <TouchableOpacity style={styles.view} onPress={() => navigation.navigate("ViewFriend",{data: props.data, image: image})}><Text style={styles.go}>View</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        paddingVertical: 15,
        height: 70,
        flexDirection: "row",
        alignItems: "center"
    },
    imgWrap:{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    img: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 360,
    },
    nameWrap:{
        flex: 3,
        paddingHorizontal: 5
    },
    name: {
        color:"white",
        fontSize: 22
    },
    view: {
        flex: 1,
        alignItems: "center",
        height: "80%",
        justifyContent: "center",
        backgroundColor:light.secondary,
        borderRadius: 10,
    },
    go: {
        color: "white"
    }
});