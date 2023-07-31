import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { PROFILE_PIC_KEY,BIO_KEY,FNAME,LNAME,UNAME,TOKEN } from "../AsyncKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";import { PageStyles } from "../assets/Styles";

const SignUpPage = () => {

  	const navigation = useNavigation();
  	const [fname, onChangeFname] = React.useState(null);
  	const [lname, onChangeLname] = React.useState(null);
  	const [usrnm, onChangeUsrn] = React.useState(null);
  	const [usrpwd, onChangePswd] = React.useState(null);
	
	  const cacheData = async (data) => {
		try {
		  await AsyncStorage.setItem(BIO_KEY, data._doc.bio);
		  await AsyncStorage.setItem(
			PROFILE_PIC_KEY,
			"data:image/jpeg;base64,"+data.imageData
		  );
		  await AsyncStorage.setItem(TOKEN, data.token);
		  await AsyncStorage.setItem(FNAME, data._doc.fName);
		  await AsyncStorage.setItem(LNAME, data._doc.lName);
		  await AsyncStorage.setItem(UNAME, data._doc.username);
		  console.log("Data saved");
		} catch (e) {
		  console.log(e);
		  alert("Failed to save");
		}
	  };

	const validateFields = ()=>{
		if(fname == null || fname.length == 0){
			Alert.alert("First name cannot be empty.");
			return false;
		}
		if(lname == null || lname.length == 0){
			Alert.alert("Last name cannot be empty.");
			return false;
		}
		if(usrnm == null || usrnm.length == 0){
			Alert.alert("Username cannot be empty.");
			return false;
		}
		if(usrpwd == null || usrpwd.length == 0){
			Alert.alert("Password cannot be empty.");
			return false;
		}
		return true;
	}
	const submitForm = () => {
		if(!validateFields()){
			return;
		}
		fetch('http://localhost:8080/auth/register', {
		method: 'POST',
		body: JSON.stringify({
			fName: fname,
			lName: lname,
			username: usrnm,
			password: usrpwd
		}),
		headers: {'Content-Type': 'application/json'}
	})
	.then(res => res.json())
	.then(data => {
		if (data.user) {
			cacheData(data);
			navigation.navigate('Home');
		} else {
			Alert.alert('Username is Taken!');
		}
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

	return (
		<SafeAreaView style = {{flex: 16, backgroundColor: '#176089', alignContent: 'space-between'}}>
			<View style={{bottom: 100, left: 15}}>
				<TextInput style = {textboxStyle.fname}
					placeholder = 'First Name'
					placeholderTextColor={'maroon'}
					autoCapitalize='words'
					onChangeText={text => onChangeFname(text)}
					// onChangeText={onChangeFname}
					value={fname}
				></TextInput>

				<TextInput style = {textboxStyle.lname}
					placeholder = 'Last Name'
					placeholderTextColor={'maroon'}
					autoCapitalize='words'
					onChangeText={text => onChangeLname(text)}
					// onChangeText={onChangeLname}
					value={lname}
				></TextInput>

				<TextInput style = {textboxStyle.user}
					placeholder = 'Username'
					placeholderTextColor={'maroon'}
					autoCapitalize="none"
					onChangeText={text => onChangeUsrn(text)}
					// onChangeText={onChangeUsrn}
					value={usrnm}
				></TextInput>

				<TextInput style = {textboxStyle.pswd}
					placeholder = 'Password'
					placeholderTextColor={'maroon'}
					autoCapitalize="none"
					secureTextEntry={true}
					onChangeText={text => onChangePswd(text)}
					// onChangeText={onChangePswd}
					value={usrpwd}
				></TextInput>
			</View>

			<TouchableOpacity style={buttonStyle.picklebut}
				onPress={submitForm}>
				<Text>Get to Pickling</Text>
			</TouchableOpacity>
			{/* <TouchableOpacity style={buttonStyle.picklebut}
				onPress={()=>navigation.navigate('courts')}>
				<Text>Get to Pickling</Text>
			</TouchableOpacity> */}

			<TouchableOpacity
				onPress={() => navigation.navigate('Login')}>
				<Text style={{color: 'white', fontSize: 17, textDecorationLine: 'underline', left: 20}}>Sign Out</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const buttonStyle = StyleSheet.create({
	picklebut: {
		borderRadius: 10,
		height: 38,
		width: 78,
		backgroundColor: 'white',
		position: 'absolute',
		top: 480,
		bottom: 0,
		left: 150,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
})

const textboxStyle = StyleSheet.create({
	fname: {
		backgroundColor: 'white',
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		width: 250,
		position: 'absolute',
		top: 270,
		bottom: 0,
		left: 40,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	lname: {
		backgroundColor: 'white',
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		width: 250,
		position: 'absolute',
		top: 330,
		bottom: 0,
		left: 40,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	user: {
		backgroundColor: 'white',
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		width: 250,
		position: 'absolute',
		top: 390,
		bottom: 0,
		left: 40,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	pswd: {
		backgroundColor: 'white',
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		width: 250,
		position: 'absolute',
		top: 450,
		bottom: 0,
		left: 40,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
});

export default SignUpPage;