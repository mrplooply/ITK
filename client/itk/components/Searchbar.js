import * as React from "react";
import {View,TextInput, StyleSheet} from 'react-native';
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

export default function Searchbar({placeholder,text,onChange}){

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

    if (!fontsLoaded) {
      return null;
    }

    return(
    <View style={styles.searchWrap}>
        <TextInput 
         placeholder={placeholder}
         onSubmitEditing={() => onSubmit(text)}
         onChangeText={onChange}
         value = {text}
         style={{fontFamily:"RobotoSlab_600SemiBold"}}
         autoCapitalize="none"
         />
    </View>
    )
}

const styles = StyleSheet.create({
    searchWrap: {
        marginBottom: 20,
        height: 30,
        width: "100%",
        backgroundColor:"white",
        borderRadius: 50,
        justifyContent: "center",
        paddingHorizontal: 20
    }
});