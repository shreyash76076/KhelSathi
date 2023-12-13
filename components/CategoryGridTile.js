import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";

function CategoryGridTile({ title, color, imageUrl, onPress }) {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        styles.gridItem,
        { backgroundColor: pressed ? "#ccc" : color },
      ]}
      onPress={onPress}
    >
      <Image
        source={imageUrl}
        style={styles.backgroundImage}
      />
    </Pressable>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    height: 150,
    elevation: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "stretch", // or "stretch"
    
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", // Text color on top of the image
  },
});
