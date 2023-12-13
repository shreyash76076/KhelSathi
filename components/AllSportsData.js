import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { getSports } from "../Util/auth";

let ITEMS_PER_PAGE = 20;

const CurvedGridItem = ({ item }) => {
  if (item.id !== "placeholder") {
    return (
      <View style={styles.itemContainer}>
        <LinearGradient colors={["white", "white"]} style={styles.gradient}>
          <Image
            source={{
              uri: "http://mobile.khelsathi.in/files/sports/" + item.image,
            }}
            style={styles.image}
          />
          <Text style={styles.text}>{item.name}</Text>
        </LinearGradient>
      </View>
    );
  } else {
    return <View style={styles.itemContainer}></View>;
  }
};

const CurvedGridView = () => {
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getSports(ITEMS_PER_PAGE, page);

      if (data && data.length > 0 && !refreshing) {
        console.log("Helloooooooooo");
        setSportsData((prevData) => [...prevData, ...data]);

        // Update the page only if the data length is equal to the limit
        setPage((prevPage) =>
          data.length === ITEMS_PER_PAGE ? prevPage + 1 : null
        );
      } else {
        console.warn("No more data available");
        setPage(null);
      }
    } catch (error) {
      console.error("Error fetching sports data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const fetchDataRefresh = async () => {
    try {
      setLoading(true);
      const data = await getSports(ITEMS_PER_PAGE, 1); // Always fetch the first page on refresh

      if (data && data.length > 0) {
        console.log("Refreshiiiiiiing");
        setSportsData([...data]); // Replace existing data with the refreshed data

        // Update the page only if the data length is equal to the limit
        setPage((prevPage) =>
          data.length === ITEMS_PER_PAGE ? prevPage + 1 : null
        );
      } else {
        console.warn("No more data available");
        setPage(null);
      }
    } catch (error) {
      console.error("Error fetching sports data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEndReached = () => {
    if (!loading && page !== null) {
      fetchData();
    }
  };

  const onRefresh = () => {
    // Set refreshing to true and fetch new data when the user pulls to refresh
    // console.log(refreshing);
    setRefreshing(true);
    // console.log(refreshing);
    console.log(page);
    setPage(1);
    console.log(page);
    setSportsData([]); // Clear existing data
    fetchDataRefresh();
  };

  const duplicateLastItemIfNeeded = () => {
    const itemCount = sportsData.length;
    if (itemCount % 2 === 1) {
      // Use a placeholder for the duplicated item
      const placeholderItem = { id: "placeholder", name: "", image: "" };
      return [...sportsData, placeholderItem];
    }
    return sportsData;
  };

  return (
    <FlatList
      data={duplicateLastItemIfNeeded()}
      numColumns={2}
      renderItem={({ item }) => <CurvedGridItem item={item} />}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={() =>
        // Render a loader component when loading more data

        !refreshing && loading && <ActivityIndicator size="large" color="#0000ff" />
      }
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 10,
    elevation: 8,
    shadowColor: "#f5f5f5",
    paddingVertical: 4,
    borderRadius: 15,
    paddingHorizontal: 4,
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
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 8,
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
});

export default CurvedGridView;
