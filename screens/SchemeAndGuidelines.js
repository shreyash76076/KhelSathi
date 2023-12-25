import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";
import SchemeList from "../components/SportsCalendarHome/SchemesList";

const SchemeAndGuidelines = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "schemes", title: "Schemes" },
    { key: "guidelines", title: "Guidelines" },
  ]);

  const Schemes = () => (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <SchemeList endPoint="Schemes" navigation={navigation} />
    </View>
  );

  const Guidelines = () => (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <SchemeList endPoint="Guidelines" navigation={navigation} />
    </View>
  );

  const renderScene = SceneMap({
    schemes: Schemes,
    guidelines: Guidelines,
  });

  function renderTabBar(props) {
    return (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: "#FC4306",
          borderBottomLeftRadius: index === 0 ? 8 : 0,
          borderBottomRightRadius: index === 1 ? 8 : 0,
        }}
        style={{ backgroundColor: "#f5f5f5" }}
        labelStyle={{
          color: "#FC4306",
          fontWeight: "bold",
          fontSize: 18,
        }}
        activeColor="#FC4306"
        inactiveColor="black"
      />
    );
  }
  const searchTitle = index === 0 ? "Schemes" : "Guidelines";

  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackArrowHeaderWhite
        searchTitle={searchTitle}
        filter={true}
        title="Schemes & Guidelines"
        backButton={() => navigation.goBack()}
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
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#971c47",
  },
});

export default SchemeAndGuidelines;
