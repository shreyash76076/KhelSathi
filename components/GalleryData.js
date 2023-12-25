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
import { getGalleryCategory } from "../Util/auth";

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

const SportsDetails = ({ navigation, item, data, image }) => {
  console.log(item);
  if (item.id !== "placeholder") {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("GalleryDetails", { catId: item.id })
        }
        style={styles.itemContainer2}
      >
        <View>
          <ImageBackground
            style={{ width: "100%", height: 150 }}
            source={{
              uri:
                "http://mobile.khelsathi.in/files/gallerycategories/" +
                item.image,
            }}
            resizeMode="cover"
          >
            <ImageBackground
              style={{ width: "100%", height: 150 }}
              source={require("../assets/SportsDetails/transparentSheet.png")}
              resizeMode="cover"
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.text}>{item.title}</Text>
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
      </Pressable>
    );
  } else {
    return <View style={styles.itemContainer}></View>;
  }
};

const GalleryData = ({ navigation, state, data, image }) => {
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
      const response = await getGalleryCategory(ITEMS_PER_PAGE, page);

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
      setLoading(false);
      setRefreshing(false);
    }
  };

  // const fetchDataRefresh = async () => {
  //   try {
  //     setLoading(true);
  //     const data = await getGalleryCategory(ITEMS_PER_PAGE, page);

  //     if (data && data.length > 0 && !refreshing) {
  //       console.log("Helloooooooooo");
  //       setGalleryData((prevData) => [...prevData, ...data]);

  //       // Update the page only if the data length is equal to the limit
  //       setPage((prevPage) =>
  //         data.length === ITEMS_PER_PAGE ? prevPage + 1 : null
  //       );
  //     } else {
  //       console.warn("No more data available");
  //       setPage(null);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching sports data:", error);
  //   } finally {
  //     console.log(galleryData);
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // };

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
    <>
      {loading ? (
        // Render a loader component while data is being loaded
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        // Render FlatList when data is loaded
        <FlatList
          data={duplicateLastItemIfNeeded()}
          numColumns={2}
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
      )}
    </>
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
    flex: 1,
    elevation: 1,
    marginHorizontal: 15,
    marginVertical: 12,
    borderRadius: 14,
    overflow: "hidden",
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
    width: "90%",
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  text2: {
    color: "black",
    fontWeight: "bold",
  },
});

export default GalleryData;
