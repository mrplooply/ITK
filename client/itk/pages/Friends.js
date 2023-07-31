import * as React from "react";
import { SafeAreaView, ScrollView, StyleSheet,Text, View, Image, TouchableOpacity} from "react-native";
import Navbar from "../components/Navbar";
import AppHeader from "../components/AppHeader";
import {PageStyles} from "../assets/Styles";
import Searchbar from "../components/Searchbar";
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
import FriendTab from "../components/FriendTab";
import AddFriendDialogue from "../components/AddFriendDialogue";
import { getItemFromCache } from "../ReadCache";
import { TOKEN } from "../AsyncKeys";

export default function Friends({route,navigation}){

    const [showDialogue, setShowDialogue] = React.useState(false);
    const [friendData, setFriendData] = React.useState([]);
    const [token,setToken] = React.useState();
    const [friendComponents,setFriendComponents] = React.useState([]);
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

    const toggleAdd = () => {
        //open box for adding friend
        setShowDialogue(!showDialogue);
    }

    // Run fetch every 5 seconds 
    React.useEffect(() => {
    
        const getToken = async () => {
            const t = await getItemFromCache(TOKEN);
            setToken(t);
        };

        const getFriends = () => {

            fetch("http://localhost:8080/user/friends",{
                method: "GET",
                headers: {"Content-Type":"appllication/json",token:token}
            })
            .then(res => res.status == 200 ? res.json() : {friends:[]})
            .then(data => {
                setFriendData(data.friends);
            })
            .catch(e => console.log('err',e));

        }
        getToken();
        getFriends();
        const interval = setInterval(getFriends, 5000); // Send request every 5 seconds

        return () => {
            clearInterval(interval); // Clean up the interval when component unmounts
        };

    },[token]);

    React.useEffect(() => {
    
        const newFriendComponents = friendData.map(data => 
            <FriendTab key={data.username} name={data.fName+" "+data.lName} data={data}/>
        );
        
        setFriendComponents(newFriendComponents);

    },[friendData]);

    if (!fontsLoaded) {
        return null;
    }
    
    if (!token) return;

    return (
        <SafeAreaView style={PageStyles.main}>
            <AppHeader route={route} action={toggleAdd}/>
            <View style={PageStyles.contentWrap}>
                <AddFriendDialogue visible={showDialogue} onClose={toggleAdd}/>
                <View style={styles.header}>
                    <Text style={styles.headerTxt}>Friends</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("FriendRequests")} >
                        <Image style={styles.headerImg} source={require("../assets/inbox.png")}/>
                    </TouchableOpacity>
                </View>
                <Searchbar placeholder={"Search Friends"}/>
                <ScrollView style={styles.scroll}>
                    {friendComponents}
                </ScrollView>
                <Navbar route={route}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        height: 40
    },
    headerTxt: {
        color: "white",
        fontSize: 32,
        letterSpacing: 2,
        fontFamily:"RobotoSlab_700Bold",
        flex: 1,
    },
    headerImg: {
        height: "80%",
        aspectRatio: 1
    },
    scroll:{
        flexGrow: 0
    }
});