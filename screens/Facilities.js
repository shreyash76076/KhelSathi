import { View, Text, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrowHeader from "../components/BackArrowHeader";
import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import GroundsDetails from "../components/Facilitites/GroundsDetails";
import AcademyDetails from "../components/Facilitites/HostelsDetails";
import HostelDetails from "../components/Facilitites/CoachesDetails";
import CollegesDetails from "../components/Facilitites/CollegesDetails";
import CoachesDetails from "../components/Facilitites/CoachesDetails";
import { CommonActions } from "@react-navigation/native";

import HostelsDetails from "../components/Facilitites/HostelsDetails";

export default function Facilities({ navigation, route }) {
  const indexing = route.params?.indexs; // Use optional chaining to avoid errors if params is undefined
  console.log(indexing);
  const [index, setIndex] = useState(indexing ?? 0);
  const [routes] = useState([
    { key: "Grounds", title: "Grounds" },
    { key: "Colleges", title: "Colleges" },
    { key: "Hostels", title: "Hostels" },
    { key: "Coaches", title: "Coaches" },
  ]);

  const Ground = () => (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <GroundsDetails />
    </View>
  );
  const Coaches = () => (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <CoachesDetails />
    </View>
  );
  const Hostels = () => (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <HostelsDetails />
    </View>
  );

  const Colleges = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <CollegesDetails />
    </View>
  );


  const renderScene = SceneMap({
    Grounds: Ground,
    Colleges: Colleges,
    Coaches: Coaches,
    Hostels: Hostels,
  });

  function renderTabBar(props) {
    return (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: "#FFFFFF",
          borderBottomLeftRadius: index === 0 ? 8 : 0,
          borderBottomRightRadius: index === 1 ? 8 : 0,
        }}
        style={{
          backgroundColor: "#f5f5f5",
          height: 50, // Adjust the height to your liking
          justifyContent: "center", // Center the text vertically
        }}
        labelStyle={{
          width:90,
          color: "#FC4306",
          fontWeight: "bold",
          textAlign: "center",
        }}
        activeColor="#FC4306"
        inactiveColor="black"
      />
    );
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackArrowHeader
        title="Facilities"
        backButton={() => navigation.goBack()}
        showArrow={true}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 0, height: 0 }}
        renderTabBar={renderTabBar}
      />
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
