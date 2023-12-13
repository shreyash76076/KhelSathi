import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrowHeader from "../components/BackArrowHeader";
import AllSportsData from "../components/AllSportsData";
import HorizontalFlatList from "../components/HomeComponent/HorizontalFlatList";

export default function AllSports({ navigation }) {
  function backButton() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackArrowHeader title="All Sports" backButton={backButton} />
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <AllSportsData />
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
