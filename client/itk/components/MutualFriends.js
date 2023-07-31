import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const tmp_images = {
  image1: require("../assets/dj_khaled.jpeg"),
  image2: require("../assets/shaq.jpeg"),
};

const SPACING = 10;
const THUMB_SIZE = 70;

const MutualFriends = () => {
  const [numFriends, setNumFriends] = useState(2);
  const [selectedId, setSelectedID] = useState();
  const [images, setImages] = useState([
    { id: "1", image: tmp_images.image1 },
    { id: "2", image: tmp_images.image2 },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> {numFriends} Friends:</Text>
      <View>
        <FlatList
          horizontal={true}
          data={images}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SPACING,
          }}
          style={styles.list}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedID(item)}
            >
              <Image
                style={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  marginRight: SPACING,
                  borderRadius: THUMB_SIZE / 2,
                }}
                source={item.image}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
    borderColor:"black",
    borderWidth:1,
  },
  text: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
  },
  list:{
    borderColor:"red",
    borderWidth:1,
    height:100
  }
});

export default MutualFriends;
