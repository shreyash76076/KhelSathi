import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Swiper from "react-native-swiper";
import { getBanners } from "../Util/auth";

const ViewPager = ({ navigation }) => {
  const [bannerData, setBannerData] = useState({ banners: [] });
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

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="black"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      autoplay={true}
      autoplayTimeout={2.5} // Set to 3 seconds
      showsPagination={true} // Enable pagination (dots)
      dotStyle={{ backgroundColor: "black", width: 8, height: 8 }} // Customize dot style
      activeDotStyle={{ backgroundColor: "orange", width: 10, height: 10 }} // Customize active dot style
    >
      {bannerData.banners.map((banner, id) => (
        <Pressable key={id} onPress={()=>navigation.navigate('GalleryScreen')}>
          <View  style={styles.slide}>
            <Image style={styles.image} source={{ uri: banner.image }} />
          </View>
        </Pressable>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 220,
  },
  slide: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
    resizeMode: "cover",
  },
});

export default ViewPager;
