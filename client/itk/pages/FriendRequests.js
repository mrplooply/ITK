import * as React from "react";
import { SafeAreaView, ScrollView, StyleSheet,Text, View, TouchableOpacity} from "react-native";
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
import FriendRequestTab from "../components/FriendRequestTab";
import AddFriendDialogue from "../components/AddFriendDialogue";
import { getItemFromCache } from "../ReadCache";
import { TOKEN } from "../AsyncKeys";
import light from "../assets/themes/light";

export default function FriendRequests({route,navigation}){

    const [showDialogue, setShowDialogue] = React.useState(false);
    const [requestIncomingData, setRequestIncomingData] = React.useState([]);
    const [requestOutData, setRequestOutData] = React.useState([]);
    const [token,setToken] = React.useState();
    const [inComponents,setInComponents] = React.useState([]);
    const [outComponents, setOutComponents] = React.useState([]);

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
    // Run a fetch request every 5s annd set data accordingly; this should cause rerender since state changes
    // useEffect with dependencies of data should create inComponents and outComponents
    React.useEffect(() => {
        
        const getToken = async () => {
            const t = await getItemFromCache(TOKEN);
            setToken(t);
        };

        const fetchData = async () => {
            fetch("http://localhost:8080/user/friends/requests",{
                method: "GET",
                headers: {"Content-Type":"appllication/json",token:token}
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.requestsIn) setRequestIncomingData(data.requestsIn); // array of objects {status, sender fName, sender lName, sender bio, sender username, sender image }
                if (data.requestsOut) setRequestOutData(data.requestsOut); // array of objects {status, receiver fName, receiver lName, receiver bio, receiver username, receiver image }
            })
            .catch(e => console.log('err in FriendRequest 69',e));
        };
    
        getToken();
        fetchData();
        const interval = setInterval(fetchData, 5000); // Send request every 5 seconds
    
        return () => {
          clearInterval(interval); // Clean up the interval when component unmounts
        };
      }, [token]);

    React.useEffect(() => {

        const newInComponents = requestIncomingData.map(data => 
            <FriendRequestTab incoming reqId={data.reqId} key={data.username} name={data.fName+" "+data.lName} data={data}/>
        );
    
        const newOutComponents = requestOutData.map(data => 
            <FriendRequestTab reqId={data.reqId} key={data.username} name={data.fName+" "+data.lName} data={data}/>
        );
        
        setInComponents(newInComponents);
        setOutComponents(newOutComponents);

    },[requestIncomingData,requestOutData]);

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
                    <Text style={styles.headerTxt}>Requests</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                        <Text style={styles.backButtonTxt}>Back</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.subHeaderTxt}>Incoming</Text>
                </View>
                {inComponents}
                <View style={styles.header}>
                    <Text style={styles.subHeaderTxt}>Outgoing</Text>
                </View>
                {outComponents}
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
        height: 40,
        justifyContent: "space-between"
    },
    headerTxt: {
        color: "white",
        fontSize: 32,
        letterSpacing: 2,
        fontFamily:"RobotoSlab_700Bold",
    },
    subHeaderTxt: {
        color: "#cccccc",
        fontSize: 22,
        letterSpacing: 2,
        fontFamily:"RobotoSlab_700Bold",
        flex: 1,
    },
    backButton: {
        backgroundColor: light.secondary,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    backButtonTxt: {
        color: "white",
        fontFamily:"RobotoSlab_700Bold",
        letterSpacing: 2,
        textAlign: "center"
    }
});