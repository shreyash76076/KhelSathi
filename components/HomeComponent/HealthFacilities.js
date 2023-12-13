import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { getBanners } from "../../Util/auth";

export default function HealthFacilities() {
  const [bannerData, setBannerData] = useState({ categoriesarray: [] });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBanners();
        setBannerData(data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Banner data updated:", bannerData);
  }, [bannerData]);


  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="black"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  const Calendar = ({ item }) => (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </View>
  );
  return (
    <FlatList
      data={bannerData.categoriesarray}
      keyExtractor={(item) => item.id}
      renderItem={Calendar}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}


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