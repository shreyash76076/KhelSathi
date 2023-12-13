import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentPositionAsync, requestForegroundPermissionsAsync, reverseGeocodeAsync } from "expo-location";

export default function HomeHeader({ handlerSignout,navigation }) {
  const [address, setAddress] = useState("");
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  useEffect(() => {
    const loadPersistedImage = async () => {
      try {
        // Retrieve the stored image URI from AsyncStorage
        const storedImageUri = await AsyncStorage.getItem("pickedImage");

        if (storedImageUri) {
          setPickedImage(storedImageUri);
        }
      } catch (error) {
        console.error("Error loading persisted image:", error);
      }
    };

    // Load the persisted image when the component mounts
    loadPersistedImage();

    // Get current location
    const getCurrentLocation = async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.error("Location permission denied");
          return;
        }

        const location = await getCurrentPositionAsync();
        console.log(location)
        const reverseGeocode = await reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        console.log(reverseGeocode)

        // Build address from available components
        const addressComponents = [
          reverseGeocode[0]?.name,
          reverseGeocode[0]?.district,
          reverseGeocode[0]?.street,
          reverseGeocode[0]?.city,
          reverseGeocode[0]?.country,
        ];

        const formattedAddress = addressComponents.filter(Boolean).join(", ");
        console.log(formattedAddress)
        setAddress(formattedAddress);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    // Verify camera permissions
    const verifyCameraPermissions = async () => {
      const hasCameraPermission = await verifyPermissions();

      if (!hasCameraPermission) {
        // Handle the case where camera permissions are not granted
      }
    };

    // Get current location and verify camera permissions
    getCurrentLocation();
    verifyCameraPermissions();
  }, []);

  async function verifyPermissions() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
      
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      const image = await launchCameraAsync({
        aspect: [16, 9],
        quality: 0.5,
      });

      setPickedImage(image.assets[0].uri);
      await AsyncStorage.setItem("pickedImage", image.assets[0].uri);
    } catch (error) {
      console.error("Error taking an image:", error);
    }
  }

  return (
    <LinearGradient colors={["#BC1342", "#571262"]}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.header}>
          <Pressable style={{ borderRadius: 10 }} onPress={()=>navigation.openDrawer()} >
            <ImageBackground
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                margin: 10,
                borderRadius: 10,
                overflow: "hidden",
              }}
              source={
                pickedImage
                  ? { uri: pickedImage }
                  : require("../../assets/images/placeholderMen.png")
              }
            >
              <View
                style={{
                  flex: 1,
                  elevation: 10,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <ImageBackground
                  source={require("../../assets/images/HomeImages/whiteCircle.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      elevation: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/images/HomeImages/rightThreeLines.png")}
                      style={{
                        width: 10,
                        height: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </ImageBackground>
          </Pressable>
          <View
            style={{
              marginTop: "5%",
              marginBottom: "5%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Khel Sathi
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Image
                source={require("../../assets/images/HomeImages/location.png")}
                style={{ width: 20, height: 20 }}
              />

              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  marginEnd:'5%',
                  marginStart: "2%",
                  fontWeight: "bold",
                }}
                numberOfLines={1}
                ellipsizeMode="tail" // or "middle" or "head" based on your preference
              >
                {address}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginEnd:'4%',
            justifyContent: "center",
            alignItems: "flex-end",
            margin: 6,
          }}
        >
          <Pressable onPress={handlerSignout}>
            <Image
              source={require("../../assets/images/HomeImages/notificationIcon.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: "3%",
          backgroundColor: "#FFFFFF5E",
          marginBottom: 8,
          borderRadius: 8,
          padding: 8,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput style={{ flex: 1 }} editable={false} />
        <Ionicons name="search" style={styles.icon} size={15} color="white" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#971c47",
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 2,
    marginStart: 5,
  },
  header: {
    flex: 4,
    maxWidth: "80%",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
