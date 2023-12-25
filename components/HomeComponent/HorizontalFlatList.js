import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  Pressable,
  ToastAndroid,
} from "react-native";
import { getSports } from "../../Util/auth";

const HorizontalFlatList = ({ navigation, state }) => {
  const [sportsData, setSportsData] = useState([]);

  const data = [
    {
      id: "1",
      imageName: require("../../assets/sportsImages/calendarGym.png"),
      text: "Camps",
    },
    {
      id: "2",
      imageName: require("../../assets/sportsImages/calendarRellay.png"),
      text: "Trials",
    },
    {
      id: "3",
      imageName: require("../../assets/sportsImages/calendarCricket.png"),
      text: "Matches",
    },
    {
      id: "4",
      imageName: require("../../assets/sportsImages/calendarAwards.png"),
      text: "Apply for Awards",
    },

    // Add more items as needed
  ];

  function sportsCalenderHandler(item,navigation) {
    if (item.id === "1") {
      console.log("Pressed Camps");
      navigation.navigate('SportsCalendar',{from:'Camps'})
    } else if (item.id === "2") {
      console.log("Pressed Trials");
      navigation.navigate('SportsCalendar',{from:'Trials'})
    } else if (item.id === "3") {
      console.log("Pressed Matches");
      navigation.navigate('SportsCalendar',{from:'Matches'})
    } else if (item.id === "4") {
      console.log("Pressed Apply for Awards");
      ToastAndroid.show("Please Login To Apply",ToastAndroid.SHORT)
    }
  }

  const getLimitedSportsData = () => {
    const limit = 6; // You can change this to the desired limit
    return sportsData.slice(0, limit);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSports();
        setSportsData(data);
        console.log(sportsData);
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("SportsDetails", { data: item })}
    >
      <View style={styles.itemContainer}>
        <View
          style={{
            alignItems: "center",
            marginHorizontal: 5,
            marginVertical: 5,
          }}
        >
          <Image
            source={{
              uri: "http://mobile.khelsathi.in/files/sports/" + item.image,
            }}
            style={styles.image}
          />
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </View>
    </Pressable>
  );

  const Calendar = ({ item }) => (
    <Pressable
      onPress={() => sportsCalenderHandler(item,navigation)}
      style={{ alignItems: "center" }}
    >
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      >
        <Image source={item.imageName} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </Pressable>
  );

  // Use conditional rendering
  return state === "true" ? (
    <FlatList
      data={getLimitedSportsData()} // Use the limited data
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={Calendar}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    // Add styles for the item container if needed
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "center",
  },
  text: {
    width: 60,
    marginTop: 4,
    textAlign: "center",
  },
});

export default HorizontalFlatList;
