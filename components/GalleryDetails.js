import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrowHeader from "./BackArrowHeader";
import { StyleSheet } from "react-native";
import FlatGalleryDetails from "./FlatGalleryDetails";

export default function GalleryDetails({route, navigation }) {
    const category_id = route.params.catId
    console.log(category_id)
  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackArrowHeader title="Gallery" backButton={() => navigation.goBack()} />
      <View style={{flex:1,backgroundColor:'white'}}>
      <FlatGalleryDetails catId={category_id} navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#971c47",
  },
});
