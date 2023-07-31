import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PROFILE_PIC_KEY,
  BIO_KEY,
  TOKEN,
  FNAME,
  LNAME,
  UNAME,
} from "../AsyncKeys";
import { getItemFromCache } from "../ReadCache";
const LoginPage = ({}) => {
  const navigation = useNavigation();
  const [usernme, onChangeUsrn] = React.useState(null);
  const [userpswd, onChangePswd] = React.useState(null);

  useEffect(() => {
    const checkCache = async () => {
      try {
        const token = await getItemFromCache(TOKEN);
        await fetch("http://localhost:8080/user", {
          method: "GET",
          headers: { "Content-Type": "application/json", token: token },
        }).then((res) => {
          if (res.status == 404 || res.status == 200)
            navigation.navigate("Home");
        });
      } catch (e) {
        console.log(e);
      }
    };

    checkCache();
  }, [navigation]);

  const saveUserData = async (data) => {
    try {
      await AsyncStorage.setItem(BIO_KEY, data._doc.bio);
      await AsyncStorage.setItem(
        PROFILE_PIC_KEY,
        "data:image/jpeg;base64," + data.imageData
      );
      await AsyncStorage.setItem(TOKEN, data.token);
      await AsyncStorage.setItem(FNAME, data._doc.fName);
      await AsyncStorage.setItem(LNAME, data._doc.lName);
      await AsyncStorage.setItem(UNAME, data._doc.username);
      console.log("Data saved");
    } catch (e) {
      console.log(e);
      alert("Failed to save");
    } finally {
      navigation.navigate("Home");
    }
  };

  const validateFields = () => {
    if (usernme == null || usernme.length == 0) {
      Alert.alert("Username cannot be empty.");
      return false;
    }
    if (userpswd == null || userpswd.length == 0) {
      Alert.alert("Password cannot be empty.");
      return false;
    }
    return true;
  };
  const submitForm = () => {
    if (!validateFields()) {
      return;
    }
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: usernme,
        password: userpswd,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "login successful") {
          saveUserData(data);
        } else if (data.message === "Username Not Found") {
          Alert.alert("Username Not Found");
        } else if (data.message === "Invalid Password") {
          Alert.alert("Incorrect Password!");
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 16, backgroundColor: "#176089" }}>
      <Image
        style={styles.ball1}
        source={require("../assets/blurpickle.png")}
      ></Image>

      <Image
        style={styles.ball2}
        source={require("../assets/blurpickle.png")}
      ></Image>

      <Image
        style={styles.ball3}
        source={require("../assets/blurpickle.png")}
      ></Image>

      <Image
        style={styles.ball4}
        source={require("../assets/blurpickle.png")}
      ></Image>

      <Image
        style={styles.ball5}
        source={require("../assets/blurpickle.png")}
      ></Image>

      <View style={styles.login}>
        <Text style={{ fontSize: 30, color: "white" }}>Login</Text>
      </View>

      <TextInput
        style={textboxStyle.user}
        placeholder="Username"
        placeholderTextColor={"maroon"}
        autoCapitalize="none"
        onChangeText={onChangeUsrn}
        value={usernme}
      ></TextInput>

      <TextInput
        style={textboxStyle.pswd}
        placeholder="Password"
        placeholderTextColor={"maroon"}
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={onChangePswd}
        value={userpswd}
      ></TextInput>

      <TouchableOpacity style={buttonStyle.logbut} onPress={submitForm}>
        <Text>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.signup}>
        <Text style={{ fontSize: 18, color: "white" }}>
          if you dont have an account,
        </Text>
      </View>

      <TouchableOpacity
        style={buttonStyle.signupbut}
        onPress={() => navigation.navigate("Sign Up")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 17,
            textDecorationLine: "underline",
          }}
        >
          Sign Up!
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const buttonStyle = StyleSheet.create({
  logbut: {
    borderRadius: 10,
    height: 38,
    width: 78,
    backgroundColor: "white",
    position: "absolute",
    top: 510,
    bottom: 0,
    left: 73,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  signupbut: {
    height: 30,
    width: 62,
    // backgroundColor: 'blue',
    position: "absolute",
    top: 585,
    bottom: 0,
    left: 270,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

const textboxStyle = StyleSheet.create({
  user: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 250,
    position: "absolute",
    top: 360,
    bottom: 0,
    left: 58,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  pswd: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 250,
    position: "absolute",
    top: 430,
    bottom: 0,
    left: 58,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

const styles = StyleSheet.create({
  signup: {
    // backgroundColor: 'green',
    height: 20,
    width: 230,
    position: "absolute",
    top: 590,
    bottom: 0,
    left: 40,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  login: {
    position: "absolute",
    top: 130,
    bottom: 320,
    left: 19,
    right: 200,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  ball1: {
    justifyContent: "center",
    right: 160,
    top: -170,
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  ball2: {
    justifyContent: "center",
    right: -200,
    top: -800,
    height: "90%",
    width: "90%",
    resizeMode: "contain",
  },
  ball3: {
    justifyContent: "center",
    right: 0,
    left: 20,
    top: -1250,
    height: "70%",
    width: "70%",
    resizeMode: "contain",
  },
  ball4: {
    justifyContent: "center",
    right: -180,
    top: -1550,
    height: "90%",
    width: "90%",
    resizeMode: "contain",
  },
  ball5: {
    justifyContent: "center",
    position: "absolute",
    right: 160,
    top: 500,
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});

export default LoginPage;
