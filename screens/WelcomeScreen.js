import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HealthFacilities from "../components/HomeComponent/HealthFacilities";
import HomeHeader from "../components/HomeComponent/HomeHeader";
import HomeMain from "../components/HomeComponent/HomeMain";
import HorizontalFlatList from "../components/HomeComponent/HorizontalFlatList";
import ViewPager from "../components/ViewPage";
import { AuthContext } from "../store/auth-context";
import LocationPicker from "../components/LocationPicker";

function WelcomeScreen({ navigation }) {
  const [fetchedMessage, setFetchedMesssage] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const data = [
    // Your data array
  ];

  useEffect(() => {
    axios
      .get(
        "https://expensetracker101-a8181-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      )
      .then((response) => {
        setFetchedMesssage(response.data);
      });
  }, [token]);

  function handlerSignout() {
    console.log("pppp");
    authCtx.logout();
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      {/* Home Header Design */}
      <HomeHeader handlerSignout={handlerSignout} navigation={navigation} />

      {/* Main Screen Design */}
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          showsVerticalScrollIndicator={false} // Hide vertical scrollbar
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 4,
              marginHorizontal: 4,
            }}
          >
            <Text style={styles.title2}>Sports</Text>
            <Pressable onPress={() => navigation.navigate("AllSports")}>
              <Text style={styles.title3}>View All</Text>
            </Pressable>
          </View>
          <HorizontalFlatList state="true" />

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 8,
              marginVertical: 4,
            }}
          >
            <ViewPager />
          </View>

          <Text style={styles.title4}>Sports Calendar</Text>

          <HorizontalFlatList state="false" />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-around",
              marginHorizontal: 4,
              marginVertical: 4,
            }}
          >
            <HomeMain />
          </View>
          <Text style={styles.title2}>Health Facilities</Text>
          <HealthFacilities />
          <LocationPicker/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

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
