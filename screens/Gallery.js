import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BackArrowHeader from "../components/BackArrowHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import GalleryData from "../components/GalleryData";


const Gallery = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "gallery", title: "Gallery" },
    { key: "press", title: "Press Release" },
  ]);

  const GalleryScene = () => (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <GalleryData navigation={navigation}  />
    </View>
  );

  const PressScene = () => (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5",justifyContent:'center',alignItems:'center' }}>
      <Text style={{fontWeight:'bold',fontSize:20}}>NO DATA FOUND</Text>
    </View>
  );

  const renderScene = SceneMap({
    gallery: GalleryScene,
    press: PressScene,
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
        }}
        activeColor="#FC4306"
        inactiveColor="black"
      />
    );
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackArrowHeader
        title="Gallery & Press Release"
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
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#971c47",
  },
});

export default Gallery;
