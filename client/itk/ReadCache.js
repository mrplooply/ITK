import AsyncStorage from "@react-native-async-storage/async-storage";

//Item should be one of the keys
export async function getItemFromCache(item) {
    try {
      const success = await AsyncStorage.getItem(item);
      if (success !== null) {
        return success;
      } else {
        return null; // Return null when item is not found in AsyncStorage
      }
    } catch (error) {
      console.log(error); // Handle error if AsyncStorage retrieval fails
      return null;
    }
}