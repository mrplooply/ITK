import * as React from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Searchbar from "./Searchbar";
import light from "../assets/themes/light";
import { TOKEN } from "../AsyncKeys";
import { getItemFromCache } from "../ReadCache";
export default function AddFriendDialogue({ visible, onClose }) {
  const [text, setText] = React.useState("");
  const [token, setToken] = React.useState();

  const addFriend = async () => {
    fetch("http://localhost:8080/user/friend/request", {
      method: "PUT",
      body: JSON.stringify({
        username: text,
      }),
      headers: { "Content-Type": "application/json", token: token },
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("", data.message);
      })
      .catch((e) => console.log(e));
  };

  React.useEffect(() => {
    const getToken = async () => {
      const t = await getItemFromCache(TOKEN);
      setToken(t);
    };
    getToken();
  }, []);

  if (!token) return;

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          {/* Content of your popup */}
          <Searchbar
            text={text}
            placeholder={"Add Friend by Username"}
            onChange={setText}
          />
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onClose();
                setText("");
              }}
            >
              <Text style={styles.close}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                addFriend();
                onClose();
              }}
            >
              <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    backgroundColor: light.primary,
    width: "80%",
    padding: 20,
    borderRadius: 8,
    borderColor: "grey",
    borderWidth: 1,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 15,
    backgroundColor: light.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  add: {
    color: "white",
  },
  close: {
    color: "white",
  },
});
