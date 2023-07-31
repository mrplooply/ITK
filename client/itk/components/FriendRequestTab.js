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

export default function FriendRequestTab(props) {

    const reqId = props.reqId;

    const [visibility, setVisibility] = React.useState("flex");
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

    const accept = async () => {
        try{
            await fetch(`http://localhost:8080/friendrequests/accept/${reqId}`, {
                method: "PUT",
                headers: {"Content-Type":"application/json"}
            });
            setVisibility("none");
        }catch(e){
            console.log("err in accept friend request", e);
        }
    }

    const decline =  async () => {
        try{
            await fetch(`http://localhost:8080/friendrequests/decline/${reqId}`, {
                method: "PUT",
                headers: {"Content-Type":"application/json"}
            });
            setVisibility("none");
        }catch(e){
            console.log("err in decline friend request", e);
        }
    }

    const cancel =  async () => {
        try{
            await fetch(`http://localhost:8080/friendrequests/cancel/${reqId}`, {
                method: "PUT",
                headers: {"Content-Type":"application/json"}
            });
            setVisibility("none");
        }catch(e){
            console.log("err in cancel friend request", e);
        }
    }

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
          .catch(e => console.log('err in FriendRequestTab 78',e));
    
        }
    
        getImage();
    
    },[image]);

    if (!fontsLoaded) {
      return null;
    }

    if (!image) return;

    return (
        <View style={[styles.main, {display: visibility}]}>
            <View style={styles.imgWrap}>
                <Image style={styles.img} source={{uri: image}} />
            </View>
            <View style={styles.nameWrap}>
                <Text style={styles.name}>{props.name}</Text>
            </View>
            {props.incoming && <TouchableOpacity style={styles.accept} onPress={accept}><Text style={styles.go}>Accept</Text></TouchableOpacity>}
            {props.incoming && <TouchableOpacity style={styles.decline} onPress={decline}><Text style={styles.go}>Decline</Text></TouchableOpacity>}
            {!props.incoming && <TouchableOpacity style={styles.decline} onPress={cancel}><Text style={styles.go}>Cancel</Text></TouchableOpacity>}
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
    accept: {
        flex: 1,
        alignItems: "center",
        height: "80%",
        justifyContent: "center",
        backgroundColor: "#6bcfa0",
        borderRadius: 10,
        marginHorizontal: 2
    },
    decline: {
        flex: 1,
        alignItems: "center",
        height: "80%",
        justifyContent: "center",
        backgroundColor: "#ff8b85",
        borderRadius: 10,
        marginHorizontal: 2

    },
    go: {
        color: "white"
    }
});