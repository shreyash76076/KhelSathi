import { View, Text, BackHandler } from "react-native";
import React, { useEffect } from "react";
import BackArrowHeader from "../components/BackArrowHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import HomeMain from "../components/HomeComponent/HomeMain";


export default function SportsDetails({ route, navigation }) {
  const data = route.params.data;
  const flag = route.params.flag;
  console.log(data);

  const handleBackPress = () => {
    if (flag === 1) {
      // If flag is 1, navigate to WelcomeScreen
      console.log("Sports AllSPorts");
      navigation.navigate("AllSports", { flag: 1 });
      // Return true to prevent the default behavior (e.g., exit the app)
      return true;
    } else {
      // If flag is not 1, go back to the previous screen
      console.log("Sports BACK");
      navigation.navigate("WelcomeScreen", { flag: 1 });
      // navigation.goBack();
      // Return true to prevent the default behavior (e.g., exit the app)
      return true;
    }
    // If neither condition is met, return false to allow the default behavior
    return false;
  };

  useEffect(() => {
    // Add the event listener for the hardware back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    // Cleanup the event listener on component unmount
    return () => {
      backHandler.remove();
    };
  }, [flag, navigation]);

  function backButton() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackArrowHeader title={data.name} backButton={backButton} />
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <HomeMain state={false} data={data.name} image={data.image} />
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
