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
import { getGalleryCategory, getNotices, getSchemes } from "../../Util/auth";
import { Linking } from "react-native";

let ITEMS_PER_PAGE = 20;

const NoticesItem = ({ navigation, endPoint, item }) => {
  console.log(item);
  if (item.id !== "placeholder") {
    const handleDownload = async () => {
      // Replace 'pdfUrl' with the actual URL of the PDF file
      const pdfUrl =
        endPoint === "Guidelines"
          ? "http://mobile.khelsathi.in/files/guidelines/" + item.document
          : "http://mobile.khelsathi.in/files/schemes/" + item.document;

      // Use Linking to open the URL
      const supported = await Linking.canOpenURL(pdfUrl);

      if (supported) {
        await Linking.openURL(pdfUrl);
      } else {
        console.error("Don't know how to open URI: " + pdfUrl);
      }
    };
    return (
      <Pressable onPress={handleDownload} style={styles.itemContainer2}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: "15%",
              height: 60,
              resizeMode: "cover",
              overflow: "hidden",
              borderRadius: 80,
              marginHorizontal: 8,
              marginVertical: 6,
            }}
            source={require("../../assets/SportsDetails/neerajChopra.png")}
          />
          <Text style={styles.text}>{item.title}</Text>
          <Image
            style={{
              width: "10%",
              height: 40,
              resizeMode: "cover",
              overflow: "hidden",
              marginVertical: 6,
            }}
            source={require("../../assets/SportsDetails/pdf.png")}
          />
        </View>
      </Pressable>
    );
  } else {
    return <View style={styles.itemContainer}></View>;
  }
};

const SchemeList = ({ navigation, endPoint }) => {
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
      const response = await getSchemes(endPoint, ITEMS_PER_PAGE, page);

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
        <NoticesItem navigation={navigation} endPoint={endPoint} item={item} />
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
    marginVertical: 16,
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
    width: "60%",
    color: "black",
    fontSize: 14,
  },
  text2: {
    color: "black",
    fontWeight: "bold",
  },
});

export default SchemeList;
