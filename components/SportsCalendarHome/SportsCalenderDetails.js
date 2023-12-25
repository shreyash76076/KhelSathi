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
import {
  getCollege,
  getGalleryCategory,
  getHostel,
  getSportsCalendar,
} from "../../Util/auth";
import { useSearch } from "../../store/search-redux";

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

const SportsDetails = ({ navigation, item }) => {
  console.log(item);
  if (item.id !== "placeholder") {
    return (
      <Pressable style={styles.itemContainer2}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              marginStart: 8,
              marginVertical: 14,
            }}
          >
            <Text style={styles.text2}>{item.name}</Text>
          </View>

          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: "cover",
              overflow: "hidden",
              marginVertical: 6,
              marginEnd: 8,
            }}
            source={require("../../assets/images/HomeImages/rightarrow.png")}
          />
        </View>
      </Pressable>
    );
  } else {
    return <View style={styles.itemContainer}></View>;
  }
};

// ... (other imports and component code)

const SportsCalendarDetails = ({ navigation, header }) => {
  const { searchQuery, setSearchQuery } = useSearch();

  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [hasData, setHasData] = useState(true); // New state for tracking data presence

  useEffect(() => {
    return () => {
      setGalleryData([]);
      setPage(1);
      setTotalPages(0);
      setRefreshing(false);
      setSearchQuery("");
      setHasData(true); // Reset hasData to true when leaving the screen
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, searchQuery]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let apiEndpoint = "";

      if (header === "Camps") {
        apiEndpoint = "getCamplist";
      } else if (header === "Matches") {
        apiEndpoint = "getMatchlist";
      } else if (header === "Trials") {
        apiEndpoint = "getTriallist";
      }

      const response = await getSportsCalendar(
        apiEndpoint,
        ITEMS_PER_PAGE,
        page,
        searchQuery
      );

      if (response && response.result && response.result.length > 0) {
        const { result, totalCount } = response;

        const newGalleryData =
          page === 1 ? result : [...galleryData, ...result];

        setGalleryData(newGalleryData);

        const newTotalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        setTotalPages(newTotalPages);
        setHasData(true); // Set hasData to true when there is data
      } else {
        // console.warn("No more data available");
        setTotalPages(page);
        setHasData(false); // Set hasData to false when there is no data
      }
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEndReached = () => {
    if (!loading && page < totalPages && hasData) {
      setPage(page + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setTotalPages(0);
    fetchData();
  };

  const duplicateLastItemIfNeeded = () => {
    const itemCount = galleryData.length;
    if (itemCount % 2 === 1) {
      const placeholderItem = { id: "placeholder", name: "", image: "" };
      return [...galleryData, placeholderItem];
    }
    return galleryData;
  };

  return (
    <View style={{ flex: 1 }}>
      {hasData ? (
        <FlatList
          data={duplicateLastItemIfNeeded()}
          renderItem={({ item }) => (
            <SportsDetails navigation={navigation} item={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() =>
            !refreshing && loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null
          }
        />       
      ) : (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={styles.noDataText}>No Data Found</Text>
        </View>
      )}
    </View>
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
  noDataText: {
    color: "black",
    fontSize: 26,
    marginHorizontal: 4,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SportsCalendarDetails;
