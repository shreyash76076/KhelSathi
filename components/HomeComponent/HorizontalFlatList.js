import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import { getSports } from "../../Util/auth";

const HorizontalFlatList = ({ state }) => {
  const [sportsData, setSportsData] = useState([]);

  const data = [
    {
      id: "1",
      imageName: require("../../assets/sportsImages/calendarCricket.png"),
      text: "Camps",
    },
    {
      id: "2",
      imageName: require("../../assets/sportsImages/calendarAwards.png"),
      text: "Selection",
    },
    {
      id: "3",
      imageName: require("../../assets/sportsImages/calendarRellay.png"),
      text: "Trials",
    },
    {
      id: "4",
      imageName: require("../../assets/sportsImages/calendarGym.png"),
      text: "Matches",
    },
    // Add more items as needed
  ];

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
  );

  const Calendar = ({ item }) => (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          justifyContent:'space-evenly',
          alignItems:'center',
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      >
        <Image source={item.imageName} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
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
    marginTop: 4,
    textAlign: "center",
  },
});

export default HorizontalFlatList;
