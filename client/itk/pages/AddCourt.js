import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import light from "../assets/themes/light.js";
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown'

// check submit form, how to send over images, how to send over meeting times
// react form for meeting time

const AddCourt = ({ route }) => {
  const navigation = useNavigation();
  const [Lat, setMapLat] = useState(36.9741);
  const [Lon, setMapLon] = useState(-122.0308);
  const [PID, setPID] = useState("useless text");
  const [Location, setLoc] = useState("useless text");
  const [Name, setName] = useState("useless text");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [images, setImages] = useState([])

	const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
	const nums = ["6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM"]
  const [meetTimesArr, setMeetTimesArr] = useState([{ day: "", start: "", end: "" }]);

  const addMeetTime = () => {
	if (meetTimesArr.length > 0) {
		const lastMeetTime = meetTimesArr[meetTimesArr.length - 1];
		if (lastMeetTime.day === "" || lastMeetTime.start === "" || lastMeetTime.end === "") {
			Alert.alert("Please fill in the previous meeting time before adding a new one.");
		return;
		}
	}
  
	if (meetTimesArr.length < 5) {
	  setMeetTimesArr([...meetTimesArr, { day: "", start: "", end: "" }]);
	}
  };
  

  const removeMeetTime = (index) => {
    const updatedMeetTimes = meetTimesArr.filter((_, i) => i !== index);
    setMeetTimesArr(updatedMeetTimes);
  };

  const addImage = async (imageNumber) => {
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
    });
    console.log(JSON.stringify(_image));
    if (!_image.canceled) {
        switch (imageNumber) {
            case 1:
                setImage1("data:image/jpeg;base64,"+image1.assets[0].base64);
                setImages([...images, image1])
                break;
            case 2:
                setImage2("data:image/jpeg;base64,"+image2.assets[0].base64);
                setImages([...images,image2])
                break;
            case 3:
                setImage3("data:image/jpeg;base64,"+image3.assets[0].base64);
                setImages([...images,image3])
                break;
            default:
                break;
        }
    }
};

  async function getInfo(data){
    axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${data.place_id}&key=AIzaSyBxU1ITfiSI_aOf0aId4B3jcQctMNlzRbk`,
    }).then((response) => {
      setMapLat(response.data.result.geometry.location.lat);
      setMapLon(response.data.result.geometry.location.lng);
      setPID(data.place_id)
      setName(response.data.result.name)
      setLoc(response.data.result.formatted_address)
    //   console.log(response.data.result.formatted_address)
    });
    
  }

  const validateFields = () => { 
	// go through array -> make sure each field is filled
	const isAnyEmpty = meetTimesArr.some((meetTime) => {
		return meetTime.day === "" || meetTime.start === "" || meetTime.end === "";
		});
	// alert is day/start/end empty
	if (isAnyEmpty) {
		Alert.alert("Please fill in all meeting times.");
		return false;
	}
	return true;
};
	/* 
	Submit form doesn't really do anything after logging the information.
	Bug that crashes app when deleting 1st meeting entry & adding a new one.
	*/
	const submitForm = () => {
		// console.log(PID, Location, Lat, Lon, Name, Times);

		console.log("\nLocation:\n",Location, "\nName:\n", Name, "\nmeetTimesArr:\n", meetTimesArr, "\nPID:\n", PID, "\nLat:\n", Lat, "\nLon:\n", Lon);


		if(!validateFields()){
			console.log("not valid");
			return;
		}

		fetch("http://localhost:8080/courts", {
		method: "POST",
		body: JSON.stringify({
			location: Location,
			name: Name,
			// ensure times : day: start-end ARRAY [, ,]
			times: meetTimesArr,
			placesID: PID,
			lat: Lat,
			lon: Lon,
      images: images
		}),
		headers: { "Content-Type": "application/json" },
		})
		.then((res) => res.json())
    .then(data => console.log(data))

		.catch((error) => {
			console.error("Error:", error);
		});
	};

  const MeetTimeRow = ({ day, start, end, index }) => {
    const [selectedDay, setSelectedDay] = useState(day);
    const [selectedStart, setSelectedStart] = useState(start);
    const [selectedEnd, setSelectedEnd] = useState(end);
  
    const handleDayChange = (selectedItem) => {
      setSelectedDay(selectedItem);
      const updatedMeetTimes = [...meetTimesArr];
      updatedMeetTimes[index].day = selectedItem;
      setMeetTimesArr(updatedMeetTimes);
    };
  
    const handleStartChange = (selectedItem) => {
      setSelectedStart(selectedItem);
      const updatedMeetTimes = [...meetTimesArr];
      updatedMeetTimes[index].start = selectedItem;
      setMeetTimesArr(updatedMeetTimes);
    };
  
    const handleEndChange = (selectedItem) => {
      setSelectedEnd(selectedItem);
      const updatedMeetTimes = [...meetTimesArr];
      updatedMeetTimes[index].end = selectedItem;
      setMeetTimesArr(updatedMeetTimes);
    };

    return (
      <View key={index} style={times.meetTimeRow}>
        <SelectDropdown
          data={Days}
          defaultValue= {selectedDay}
          onSelect={handleDayChange}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={times.dropdownButton}
          buttonTextStyle={times.dropdownButtonText}
          dropdownStyle={times.dropdown}
          rowStyle={times.dropdownRow}
		  defaultButtonText="Day"
        />
        <SelectDropdown
          data={nums}
          defaultValue={selectedStart}
          onSelect={handleStartChange}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={times.dropdownButton}
          buttonTextStyle={times.dropdownButtonText}
          dropdownStyle={times.dropdown}
          rowStyle={times.dropdownRow}
		  defaultButtonText="Start"
        />
        <SelectDropdown
          data={nums}
          defaultValue={selectedEnd}
          onSelect={handleEndChange}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={times.dropdownButton}
          buttonTextStyle={times.dropdownButtonText}
          dropdownStyle={times.dropdown}
          rowStyle={times.dropdownRow}
		  defaultButtonText="End"
        />
        <TouchableOpacity onPress={() => removeMeetTime(index)}>
          <Text style={times.removeBtn}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.main}>
      <View style={{}}>
        <TouchableOpacity onPress={() => navigation.navigate("Courts")}>
          <Text style={{ color: "white", fontSize: 17, textDecorationLine: "underline" }}>
            {"<- Don't add court, it won't hurt our feelings"}
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 15, textAlign: "center", top: 10 }}>
          {"Type address of Court/Park below!"}
        </Text>

        <GooglePlacesAutocomplete
          placeholder="Search"
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

        <Text style={{ color: "white", fontSize: 15, textAlign: "center", top: 20 }}>
          {"Optional: Add up to three images of the park!"}
        </Text>

        <View style={{ top: 30 }}>
          <View style={imageUploaderStyles.container}>
            {image1 && <Image source={{ uri: image1 }} style={{ width: 200, height: 200 }} />}
            <View style={imageUploaderStyles.uploadBtnContainer}>
              <TouchableOpacity onPress={() => addImage(1)} style={imageUploaderStyles.uploadBtn}>
                <Text>{image1 ? "Edit" : "Upload"} Image</Text>
                <AntDesign name="camera" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ top: -130, left: 175 }}>
          <View style={imageUploaderStyles.container}>
            {image2 && <Image source={{ uri: image2 }} style={{ width: 200, height: 200 }} />}
            <View style={imageUploaderStyles.uploadBtnContainer}>
              <TouchableOpacity onPress={() => addImage(2)} style={imageUploaderStyles.uploadBtn}>
                <Text>{image2 ? "Edit" : "Upload"} Image</Text>
                <AntDesign name="camera" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ top: -115, left: 87 }}>
          <View style={imageUploaderStyles.container}>
            {image3 && <Image source={{ uri: image3 }} style={{ width: 200, height: 200 }} />}
            <View style={imageUploaderStyles.uploadBtnContainer}>
              <TouchableOpacity onPress={() => addImage(3)} style={imageUploaderStyles.uploadBtn}>
                <Text>{image3 ? "Edit" : "Upload"} Image</Text>
                <AntDesign name="camera" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={{ color: "white", fontSize: 15, textAlign: "center", top: -100 }}>
          {"Optional: Common court meet times below!"}
        </Text>
        <Text style={{ color: "white", fontSize: 15, textAlign: "center", top: -100 }}>
          {"Notice formatting -> Day: Start - Stop"}
        </Text>
          {meetTimesArr.map((data, index) => (
            <MeetTimeRow
              key={index}
              day={data.day}
              start={data.start}
              end={data.end}
              index={index}
            />
          ))}
        {meetTimesArr.length < 5 && (
          <TouchableOpacity onPress={addMeetTime}>
            <Text style={{ color: 'white', fontSize: 30, textAlign: 'center', width: 30, height: 30, borderRadius: 10, bottom: 100 }}>+</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={buttonStyle.picklebut} onPress={submitForm}>
          <Text style={{ textAlign: "center" }}>{"Submit Court :D"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: light.primary,
    position: "absolute",
  },
  contentWrap: {
    width: "90%",
    flex: 1,
    position: "absolute",
  },
  map: {
    height: "35%",
    width: "100%",
    borderRadius: 10,
    position: "relative",
    zIndex: 0,
  },
  nearbyContainer: {
    width: "100%",
    flexGrow: 0,
    maxHeight: "32%",
  },
  timeBox: {
    fontSize: 15,
    alignSelf: "center",
    backgroundColor: "white",
    height: 110,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 250,
    top: -105,
  },
  searchWrap: {
    container: {
      flex: 0,
      marginVertical: 10,
      maxHeight: "45%",
      zIndex: 1,
      width: 300,
      top: 10,
      left: 15,
    },
    textInput: {
      width: "100%",
      height: 40,
      borderRadius: 5,
      zIndex: 2,
    },
    listView: {
      borderRadius: 5,
      position: "absolute",
      top: 42,
      zIndex: 1,
    },
  },
});

const buttonStyle = StyleSheet.create({
  picklebut: {
    borderRadius: 10,
    height: 38,
    width: 78,
    backgroundColor: "white",
    alignSelf: "center",
    bottom: 75,
  },
});

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 160,
    width: 160,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const times = StyleSheet.create({
  dropdownButtonText: {
    fontSize: 15
  },
  dropdownButton: {
    width: 100,
    height: 30,
    alignContent: 'space-between'
  },
  meetTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // marginBottom: 0,
    bottom: 95,
    height: 35,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 15,
    color: "black",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  removeBtn: {
    fontSize: 15,
    color: "black",
    // top: 30,
    right: -10
  },
});


export default AddCourt;
