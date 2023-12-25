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
import { getCoaches, getCollege, getGalleryCategory } from "../../Util/auth";

let ITEMS_PER_PAGE = 20;

const data2 = [
  {
    id: "1",
    imageName: require("../../assets/SportsDetails/Camps.png"),
    text: "Camps",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "2",
    imageName: require("../../assets/SportsDetails/sportsPlaceholder.png"),
    text: "Matches",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "3",
    imageName: require("../../assets/SportsDetails/trails.png"),
    text: "Trials",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },

  {
    id: "4",
    imageName: require("../../assets/SportsDetails/facilitys.png"),
    text: "Facilities",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "5",
    imageName: require("../../assets/SportsDetails/coaches.png"),
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

const SportsDetails = ({ navigation, item, data, image }) => {
  console.log(item);
  if (item.id !== "placeholder") {
    return (
      <Pressable style={styles.itemContainer2}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "cover",
              overflow: "hidden",
              borderRadius: 80,
              marginHorizontal: 8,
              marginVertical: 6,
            }}
            source={require("../../assets/SportsDetails/neerajChopra.png")}
          />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
            {item.name}
          </Text>
          <View
            style={{
              marginHorizontal: 10,
              justifyContent: "flex-end",
              flexDirection: "row",
              alignItems: "flex-end",
              flex: 1,
            }}
          >
            <Text>{item.sport_name}</Text>
          </View>
        </View>
      </Pressable>
    );
  } else {
    return <View style={styles.itemContainer}></View>;
  }
};
const CoachesDetials = ({ navigation, state, data, image }) => {
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
      const response = await getCoaches(ITEMS_PER_PAGE, page);

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
        <SportsDetails
          navigation={navigation}
          item={item}
          data={data}
          image={image}
        />
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
    marginHorizontal: 20,
    marginVertical: 12,
    paddingVertical: 4,
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "center",
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
    fontSize: 16,
    marginHorizontal: 6,
    marginEnd: 8,
    fontWeight:'500'
  },
  text2: {
    color: "#EA5502",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "bold",
  },
});

export default CoachesDetials;
