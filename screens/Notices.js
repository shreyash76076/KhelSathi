import { View, Text, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrowHeader from "../components/BackArrowHeader";
import { StyleSheet } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import GalleryData from "../components/GalleryData";
import NoticesFlatList from "../components/NoticesFlatList";

const data2 = [
  {
    id: "1",
    imageName: require("../assets/SportsDetails/Camps.png"),
    text: "Camps",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "2",
    imageName: require("../assets/SportsDetails/sportsPlaceholder.png"),
    text: "Matches",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "3",
    imageName: require("../assets/SportsDetails/trails.png"),
    text: "Trials",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },

  {
    id: "4",
    imageName: require("../assets/SportsDetails/facilitys.png"),
    text: "Facilities",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "5",
    imageName: require("../assets/SportsDetails/coaches.png"),
    text: "Coachs",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "6",
    imageName: "",
    text: "",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
];

export default function Notices({navigation}) {
  function backButton() {
    navigation.goBack();
  }
  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackArrowHeader
        title="Notices"
        backButton={backButton}
        showArrow={true}
      />
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <NoticesFlatList navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#971c47",
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 2,
    marginStart: 5,
  },
  header: {
    flex: 4,
    maxWidth: "80%",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  title2: {
    fontSize: 20,

    fontWeight: "bold",
  },
  title4: {
    fontSize: 20,
    marginHorizontal: 4,
    fontWeight: "bold",
  },
  title3: {
    fontSize: 16,

    color: "#FF1F00",
  },
});
