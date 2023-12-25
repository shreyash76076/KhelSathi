import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { getGalleryDetailsItem } from "../Util/auth";
import ImageViewer from "react-native-image-zoom-viewer";

const ITEMS_PER_PAGE = 20;

const GalleryDetailsItem = ({ item, onPress }) => {
  if (item.id !== "placeholder") {
    return (
      <TouchableOpacity
        style={styles.itemContainer2}
        onPress={() => onPress(item)}
      >
        <ImageBackground
          style={{ width: "100%", height: 150 }}
          source={{
            uri: "http://mobile.khelsathi.in/files/galleries/" + item.image,
          }}
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
      </TouchableOpacity>
    );
  } else {
    return <View style={styles.itemContainer2}></View>;
  }
};

const FlatGalleryDetails = ({ catId }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, [page]); // Trigger fetch when page changes

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getGalleryDetailsItem(catId, ITEMS_PER_PAGE, page);

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
        setTotalPages(page); // Set totalPages to the current page to prevent further attempts
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

  const handleImagePress = (item) => {
    setSelectedImage(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
    <View style={{ flex: 1 }}>
      <FlatList
        data={duplicateLastItemIfNeeded()}
        numColumns={2}
        renderItem={({ item }) => (
          <GalleryDetailsItem item={item} onPress={handleImagePress} />
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
        initialNumToRender={20}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        {selectedImage && (
          <ImageViewer
            imageUrls={[
              {
                url:
                  "http://mobile.khelsathi.in/files/galleries/" +
                  selectedImage.image,
                freeHeight: true,
              },
            ]}
            enableSwipeDown
            onSwipeDown={closeModal}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer2: {
    flex: 1,
    elevation: 1,
    marginHorizontal: 10,
    marginVertical: 12,
    overflow: "hidden",
  },
  text: {
    width: "90%",
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default FlatGalleryDetails;
