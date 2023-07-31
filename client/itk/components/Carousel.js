import React, { useRef, useState, Component, useEffect } from "react";

import {
  Dimensions,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
// import  Animated  from 'react-native-reanimated';
import Carousel, { ParallaxImage } from "react-native-new-snap-carousel";

const DATA = [
  { image: require("../assets/shaq.jpeg"), title: "SHAQ" },
  { image: require("../assets/shaq.jpeg"), title: "SHAQ" },
  { image: require("../assets/shaq.jpeg"), title: "SHAQ" },
];
const MyCarousel = (props) => {

  const { height, width, scale, fontScale } = useWindowDimensions();
  const [imageData,setImageData] = useState();

  const carouselRef = useRef(null);

  useEffect(() => {
    // for each in props.images fetch to '/images' and push that data to imageData array
    const fetchPromises = props.images.map(image => {
      return fetch(`http://localhost:8080/images/${image}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
      .then(res => res.json())
      .then(data => data.imageData)
      .catch(error => {
        console.error(`Failed to fetch image data for ${image}: ${error}`);
        return null;
      });
    });
  
    Promise.all(fetchPromises)
      .then(fetchedImageData => {
        // Filter out any null values if needed (failed fetches)
        const filteredImageData = fetchedImageData.filter(data => data !== null);
        setImageData(filteredImageData);
      })
      .catch(error => {
        console.error("Failed to fetch image data for one or more images:", error);
        setImageData([]); // or handle the error gracefully with an appropriate value
      });
  
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={{uri: "data:image/jpeg;base64,"+item}}></Image>
      </View>
    );
  };

  if (!imageData) return;

  return (
    <Carousel
      ref={carouselRef}
      data={imageData}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={300}
      activeSlideAlignment="center"
      layout={"default"}
      contentContainerCustomStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  //   slide: { maxWidth: "100%", alignContent: "center" },
  title: { fontSize: 16 },
  image: { height: "100%", aspectRatio: 1, borderRadius: 20 },
  container: {
    height: 300,
    // borderColor: "blue",
    // borderWidth: 2,
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 10
  },
});
export default MyCarousel;
