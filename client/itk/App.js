import { StyleSheet } from "react-native";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Courts from "./pages/Courts";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Friends from "./pages/Friends";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import ParkView from "./pages/ParkView";
import AddCourt from "./pages/UploadCourt";
import ViewFriend from "./pages/ViewFriend";
import FriendRequests from "./pages/FriendRequests";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Sign Up"
          component={SignUpPage}
        />
        <Stack.Screen
          options={{ headerShown: false, animation: "none" }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false, animation: "none" }}
          name="Courts"
          component={Courts}
        />
        <Stack.Screen
          options={{ headerShown: false, animation: "none" }}
          name="Friends"
          component={Friends}
        />
        <Stack.Screen
          options={{ headerShown: false, animation: "none" }}
          name="Messages"
          component={Messages}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfilePage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ParkView"
          component={ParkView}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddCourt"
          component={AddCourt}
        /> 
        <Stack.Screen
          options={{ headerShown: false }}
          name="ViewFriend"
          component={ViewFriend}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="FriendRequests"
          component={FriendRequests}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {},
});
