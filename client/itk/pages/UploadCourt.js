import AppHeader from "../components/AppHeader";
import Navbar from "../components/Navbar";
import {PageStyles} from "../assets/Styles";
import { StyleSheet,SafeAreaView,View,Text,TouchableOpacity,Alert } from "react-native";
import {launchImageLibrary} from 'react-native-image-picker';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState,useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
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
  } from "@expo-google-fonts/roboto-slab";
import light from "../assets/themes/light";
import SelectDropdown from "react-native-select-dropdown";

export default function Courts({route}) {
  
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [location, setLocation] = useState()
  const [pid, setPID] = useState();
  const [name,setName] = useState();
  const [images,setImages] = useState([{data: null, name: "No Selection"}]);
  const [imageComponents, setImageComponents] = useState([]);
  const [meetTimes,setMeetTimes] = useState([{day:null,start:null,end:null}]);
  const [meetComponents,setMeetTimeComponents] = useState([]);

  const times = ["6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM"]

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

  const addImage = async (index) => {
    let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
    });
    if (!image.canceled) {
        const newImages = [...images]
        newImages[index] = {data:image.assets[0].base64, name: image.assets[0].fileName || "NewImg.png"}
        setImages(newImages)
    }
  };

  const handleDayChange = (index,newDay) => {
    const newMeetTimes = [...meetTimes];
    newMeetTimes[index].day = newDay;
    setMeetTimes(newMeetTimes);
  }

  const handleStartChange = (index,newStart) => {
    const newMeetTimes = [...meetTimes];
    newMeetTimes[index].start = newStart;
    setMeetTimes(newMeetTimes);
  }

  const handleEndChange = (index,newEnd) => {
    const newMeetTimes = [...meetTimes];
    newMeetTimes[index].end = newEnd;
    setMeetTimes(newMeetTimes);
  }

  const submit = () => {

    const newMeetTimes = meetTimes.filter(meet => meet.day && meet.start && meet.end);
    const newImages = images.filter(image => image.data);

    if (!location || !name || !pid || !lat || !lon) {
        console.log(location,name,pid,lat,lon);
        alert("Missing Fields. Please Select a location from the dropdown");
        return;
    }
    
    const body = {
        location: location,
        name: name,
        // ensure times : day: start-end ARRAY [, ,]
        times: newMeetTimes,
        placesID: pid,
        lat: lat,
        lon: lon,
        images: newImages
    }

    fetch("http://localhost:8080/courts", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-Type":"application/json"}
    })
    .then(res => res.json())
    .then(data => Alert.alert("",data.message));

  }

  useEffect(() => {
        const imageObjects = images.map((image,index) => (
            <View style={styles.imageSelectRow}>
                <TouchableOpacity style={styles.imageSelect} onPress={() => {addImage(index)}}>
                    <Text style={styles.imageText}>Select Image</Text>
                </TouchableOpacity>
                <Text style={styles.selection}>{image.name}</Text>
            </View>
        ));
        setImageComponents(imageObjects);
  },[images])

  useEffect(() => {
    const meetObjects = meetTimes.map((meet,index) => (
        <View style={styles.timeForm}>
            <SelectDropdown
                data={["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]}
                defaultButtonText="Day"
                onSelect={(item) => handleDayChange(index,item)}
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                buttonTextStyle={{fontSize: 15,textAlign:"left"}}
                buttonStyle={{flex:1,borderRadius:5,marginHorizontal: 2, height: 40,backgroundColor:"white"}}
            />
            <SelectDropdown
                data={times}
                defaultButtonText="Start"
                onSelect={(item) => handleStartChange(index,item)}
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                buttonTextStyle={{fontSize: 15,textAlign:"left"}}
                buttonStyle={{flex:1,borderRadius:5,marginHorizontal: 2, height: 40,backgroundColor:"white"}}
            />
            <SelectDropdown
                data={times}
                defaultButtonText="End"
                onSelect={(item) => handleEndChange(index,item)}
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                buttonTextStyle={{fontSize: 15,textAlign:"left"}}
                buttonStyle={{flex:1,borderRadius:5,marginHorizontal: 2, height: 40,backgroundColor:"white"}}
            />
        </View>
    ));
    setMeetTimeComponents(meetObjects);
},[meetTimes])

  if (!fontsLoaded) {
    return null;
  }

  async function getInfo(data){
    axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${data.place_id}&key=AIzaSyBxU1ITfiSI_aOf0aId4B3jcQctMNlzRbk`,
    }).then((response) => {
      setLat(response.data.result.geometry.location.lat);
      setLon(response.data.result.geometry.location.lng);
      setPID(data.place_id)
      setName(response.data.result.name)
      setLocation(response.data.result.formatted_address)
    //   console.log(response.data.result.formatted_address)
    });
  }
  
  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader/>
      <View style={PageStyles.contentWrap}>
        <View style={[styles.formSection,{zIndex: 1}]}>
            <Text style={styles.formSectionTxt}>Location</Text>
            <GooglePlacesAutocomplete
                placeholder="Add a Location"
                styles={styles.searchWrap}
                onPress={(data, details = null) => {
                  getInfo(data);
                }}
                query={{
                  key: 'AIzaSyBxU1ITfiSI_aOf0aId4B3jcQctMNlzRbk',
                  language: "en",
                }}
                onFail={(error) => console.error(error)}
                enablePoweredByContainer={false}
            />
        </View>
        <View style={styles.formSection}>
            <Text style={styles.formSectionTxt}>Images</Text>
            {imageComponents}
            {images.length < 3 && <TouchableOpacity onPress={() => {setImages([...images,{name:"No Selection",data:null}])}}>
                <Text style={{color:"white"}}>Add Image</Text>
            </TouchableOpacity>}
        </View>
        <View style={styles.formSection}>
            <Text style={styles.formSectionTxt}>Meet Times</Text>
            {meetComponents}
            {meetTimes.length < 3 && <TouchableOpacity onPress={() => {setMeetTimes([...meetTimes,{day:null,start:null,end:null}])}}>
                <Text style={{color:"white"}}>Add Time</Text>
            </TouchableOpacity>}
        </View>
        <TouchableOpacity onPress={submit} style={styles.imageSelect}><Text style={styles.imageText}>Add Court</Text></TouchableOpacity>
        <Navbar route ={route}/>
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
    formSection: {
        width: "100%",
        marginVertical: 10,
        zIndex: 0,
        justifyContent:"center"
    },
    formSectionTxt: {
        color: "white",
        fontSize: 28,
        marginBottom: 20,
        fontFamily: "RobotoSlab_600SemiBold",
    },
    searchWrap: {
        container: {
          flex: 0,
          maxHeight: "45%",
          zIndex: 1
        },
        textInput: {
          height: 40,
          borderRadius: 5,
          zIndex: 1
        },
        listView: {
          borderRadius:5,
          position: "absolute",
          top: 42,
          zIndex: 2
        },
    },
    imageSelect: {
        backgroundColor: light.secondary,
        width: 100,
        borderRadius: 10,
        alignItems:"center",
        paddingVertical: 5,
        paddingHorizontal: 2,
    },
    imageText:{
        color: "white",
        fontFamily: "RobotoSlab_400Regular",
    },
    imageSelectRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        justifyContent:"space-between"
    },
    selection:{
        color: "white",
        fontFamily:"RobotoSlab_400Regular",
        fontSize:18
    },
    timeForm: {
        flexDirection:"row",
        width: "100%",
        marginVertical: 5,
    }
});