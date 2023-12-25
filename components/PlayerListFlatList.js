import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";
import { getPlayers, getSportsCalendar } from "../Util/auth";

let ITEMS_PER_PAGE = 20;

const data2 = [
  {
    id: "1",
    imageName: require("../assets/SportsDetails/Camps.png"),
    text: "Camps",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "2",
    imageName: require("../assets/SportsDetails/sportsPlaceholder.png"),
    text: "Matches",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "3",
    imageName: require("../assets/SportsDetails/trails.png"),
    text: "Trials",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },

  {
    id: "4",
    imageName: require("../assets/SportsDetails/facilitys.png"),
    text: "Facilities",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "5",
    imageName: require("../assets/SportsDetails/coaches.png"),
    text: "Coachs",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "6",
    imageName: "",
    text: "",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
];

// ... (other imports and styles)

const SportsDetails = ({ navigation, item, imageUrl }) => {
  console.log(item);
  if (item.id !== "placeholder") {
    console.log("Medaiiiiiiil Details" + item.playlistmadels);
    const firstMedal = item.playlistmadels[0];

    return (
      <Pressable style={styles.itemContainer2}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View style={styles.squareImageContainer}>
            <Image
              source={{
                uri:
                  "http://mobile.khelsathi.in/files/playerlists/" + item.image,
              }}
              style={styles.squareImage}
            />
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: 10,
            }}
          >
            <Text
              style={{
                width: 200, // Set the desired fixed width
                fontSize: 18,
                color: "#0B30AE",
                fontWeight: "500",
                marginBottom: 5,
              }}
              numberOfLines={1} // Limit the name to a single line
              ellipsizeMode="tail" // Add an ellipsis (...) at the end if the name is too long
            >
              {item.name}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginBottom: 3,
              }}
            >
              Sports: {item.sport_name}
            </Text>
            {/* {firstMedal && (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  marginBottom: 5,
                }}
              >
                Medal: {firstMedal.madel_name}
              </Text>
            )} */}
          </View>
        </View>
      </Pressable>
    );
  } else {
    return <View style={styles.itemContainer}></View>;
  }
};

// ... (rest of the component)

const PlayerListFlatList = ({ navigation, header }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await getPlayers(ITEMS_PER_PAGE, page);

      if (response && response.result && response.result.length > 0) {
        const { result, totalCount } = response;

        // If it's a refresh (page is 1), clear the existing data
        const newGalleryData =
          page === 1 ? result : [...galleryData, ...result];

        setGalleryData(newGalleryData);

        // Calculate total pages based on total count and items per page
        const newTotalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        setTotalPages(newTotalPages);
      } else {
        console.warn("No more data available");
        setTotalPages(page); // Set totalPages to current page to prevent further attempts
      }
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    } finally {
      console.log("College lIST" + galleryData);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEndReached = () => {
    if (!loading && page < totalPages) {
      // Increment the page only if there are more pages to load
      setPage(page + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);

    // Reset both page and totalPages to 1 on refresh
    setPage(1);
    setTotalPages(0);

    // Fetch data after resetting
    fetchData();
  };

  const duplicateLastItemIfNeeded = () => {
    const itemCount = galleryData.length;
    if (itemCount % 2 === 1) {
      // Use a placeholder for the duplicated item
      const placeholderItem = { id: "placeholder", name: "", image: "" };
      return [...galleryData, placeholderItem];
    }
    return galleryData;
  };

  return (
    <FlatList
      data={duplicateLastItemIfNeeded()}
      renderItem={({ item }) => (
        <SportsDetails navigation={navigation} item={item} />
      )}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={() =>
        !refreshing &&
        loading && <ActivityIndicator size="large" color="#0000ff" />
      }
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
  },
  itemContainer2: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    elevation: 6,
    marginVertical: 18,
    paddingVertical: 10,
    borderRadius: 18,
    marginStart: 60,
    marginEnd: 30,
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "center",
  },
  squareImageContainer: {
    elevation: 5, // Adjust the elevation as needed
    marginStart: -40,
    marginTop: -20,
    borderRadius: 18,
  },
  squareImage: {
    width: 120,
    height: 120,
    borderRadius: 18,
    resizeMode: "cover",
  },
  image: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    marginBottom: 8,
  },
  image2: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  text: {
    width: 200,
    color: "black",
    fontSize: 12,
    marginHorizontal: 6,
    marginEnd: 8,
  },
  text2: {
    color: "black",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "600",
  },
});

export default PlayerListFlatList;
