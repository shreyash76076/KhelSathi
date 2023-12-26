import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";
import SportsCalendarDetails from "../components/SportsCalendarHome/SportsCalenderDetails";

export default function SportsCalender({ route, navigation }) {
  const header = route.params.header;
  const checkboxData = route.params.checkboxData || {};

  // Use checkboxData as needed
  useEffect(() => {
    console.log(checkboxData);
  }, [checkboxData]);
  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackArrowHeaderWhite
        FilterHandler={() =>  
          navigation.navigate("FilterSportsCalendar", { header: header })
        }
        searchTitle={header}
        title={header}
        backButton={() => navigation.goBack()}
      />
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <SportsCalendarDetails header={header} checkboxData={checkboxData} />
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
