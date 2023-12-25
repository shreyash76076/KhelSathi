import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";
import { StyleSheet } from "react-native";
import PlayerListFlatList from "../components/PlayerListFlatList";

export default function PlayerList({ navigation }) {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackArrowHeaderWhite
        searchTitle="Players"
        filter={true}
        title="Players List"
        backButton={() => navigation.goBack()}
      />
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <PlayerListFlatList/>
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
