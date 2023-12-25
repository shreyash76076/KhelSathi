import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import Button from "../components/Button";
import ForgotToolbar from "../components/ForgotToolbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { createUser } from "../Util/auth";
import LoadingOverlay from "../components/LoadingOverlay";
import DropDown from "../components/CustomeDropDown";
import BottomSheet from "../components/CustomBottomSheet";

export default function SignUp({ route, navigation }) {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPass, setIsConfirmPass] = useState(false);

  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [selectValue, setSelectValue] = React.useState("");
  const [option, setOption] = React.useState(false);

  const data = [
    {
      id: 1,
      image: require("../assets/RegisterCategory/player.png"),
      name: "Player",
    },
    {
      id: 2,
      image: require("../assets/RegisterCategory/coach.png"),
      name: "Coach",
    },
    {
      id: 3,
      image: require("../assets/RegisterCategory/Primary.png"),
      name: "Primary Care Doctor",
    },
    {
      id: 4,
      image: require("../assets/RegisterCategory/orthopedic.png"),
      name: "Orthopedic",
    },
    {
      id: 5,
      image: require("../assets/RegisterCategory/Chiropractors.png"),
      name: "Chiropractors",
    },
    {
      id: 6,
      image: require("../assets/RegisterCategory/athelete.png"),
      name: "Athlete Trainer",
    },
    {
      id: 7,
      image: require("../assets/RegisterCategory/dietition.png"),
      name: "Dietitian",
    },
    {
      id: 8,
      image: require("../assets/RegisterCategory/therapist.png"),
      name: "Physical Therapist",
    },
    {
      id: 9,
      image: require("../assets/RegisterCategory/others.png"),
      name: "Others",
    },
  ];

  const selected = (item) => {
    setSelectValue(item);
  };

  useEffect(() => {
    console.log(selectValue.name);
  }, [selectValue]);

  const registerTitle = route.params.name;

  async function signupHandler() {
    setIsAuthenticating(true);
    await createUser(Email, Password);
    setIsAuthenticating(false);
    navigation.navigate("Login");
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPass(!isConfirmPass);
  };

  function backButton() {
    navigation.goBack();
  }

  function validateInput() {
    // Regular expressions for email and 10-digit phone number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (name.trim() === "") {
      // If the name is empty or contains only spaces
      ToastAndroid.show(
        "Invalid input. Please enter valid Name.",
        ToastAndroid.SHORT
      );
    } else if (!emailRegex.test(Email)) {
      // Valid email
      ToastAndroid.show(
        "Invalid input. Please enter a valid email.",
        ToastAndroid.SHORT
      );
    } else if (Password.trim() === "") {
      // Valid email
      ToastAndroid.show(
        "Invalid input. Please enter a valid Password.",
        ToastAndroid.SHORT
      );
    } else if (Password.length < 6 || Password.length > 10) {
      ToastAndroid.show(
        "Password must be between 6 and 10 characters",
        ToastAndroid.SHORT
      );
      return;
    }
    // Check if passwords match
    else if (Password !== confirmPassword) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.SHORT);
      return;
    } else {
      console.log(name, " ", Email, " ", Password);
      signupHandler();
    }
  }

  // in screen where you want to use it
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");

 

  const toggleModal = () => {
    setOption(!option);
    setModalVisible(!isModalVisible);
  };

  const handleSportSelection = (sport) => {
    setSelectedSport(sport);
    toggleModal();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#a21c44" }}>
      <LinearGradient
        // Background Linear Gradient
        style={{ flex: 1 }}
        colors={["#BC1342", "#571262"]}
      >
        <ForgotToolbar
          title={`Registration for ${registerTitle}`}
          backButton={backButton}
        />
        <TextInput
          placeholder={`Name of ${registerTitle}`}
          placeholderTextColor="grey"
          style={{
            borderWidth: 1,
            borderColor: "#6FB5F5",
            color: "black",
            backgroundColor: "white",
            elevation: 5,
            borderRadius: 6,
            marginHorizontal: "3%",
            padding: "2%",
            marginTop: "8%",
          }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Email ID"
          placeholderTextColor="grey"
          style={{
            borderWidth: 1,
            borderColor: "#6FB5F5",
            color: "black",
            backgroundColor: "white",
            elevation: 5,
            borderRadius: 6,
            marginHorizontal: "3%",
            padding: "2%",
            marginTop: "4%",
          }}
          value={Email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Contact No."
          placeholderTextColor="grey"
          style={{
            borderWidth: 1,
            borderColor: "#6FB5F5",
            color: "black",
            backgroundColor: "white",
            elevation: 5,
            borderRadius: 6,
            marginHorizontal: "3%",
            padding: "2%",
            marginTop: "4%",
          }}
          value={Email}
          onChangeText={(text) => setEmail(text)}
        />
        <Pressable onPress={toggleModal}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#6FB5F5",
              backgroundColor: "white",
              elevation: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 6,
              marginHorizontal: "3%",
              padding: "3%",
              marginTop: "4%",
            }}
          >
            <Text
              style={{
                color: "grey",
              }}
              value={Password}
              secureTextEntry={!isPasswordVisible}
              onChangeText={(text) => setPassword(text)}
            >
              {!!selectedSport ? selectedSport : "Select Sport"}
            </Text>
            <Image
              source={require("../assets/drawables/dropDown.png")}
              style={{
                transform: [{ rotate: option ? "180deg" : "0deg" }],
              }}
            ></Image>
          </View>
        </Pressable>

        <View
          style={{
            borderWidth: 1,
            borderColor: "#6FB5F5",
            backgroundColor: "white",
            elevation: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 6,
            marginHorizontal: "3%",
            padding: "2%",
            marginTop: "4%",
          }}
        >
          <TextInput
            style={{
              color: "black",
            }}
            placeholder="Password"
            placeholderTextColor="grey"
            value={Password}
            secureTextEntry={!isPasswordVisible}
            onChangeText={(text) => setPassword(text)}
          />
          <Pressable
            onPress={togglePasswordVisibility}
            style={{ marginEnd: 5 }}
          >
            <Ionicons
              name={isPasswordVisible ? "eye" : "eye-off"}
              style={styles.icon}
              size={15}
              color="black"
            />
          </Pressable>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#6FB5F5",
            backgroundColor: "white",
            elevation: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 6,
            marginHorizontal: "3%",
            padding: "2%",
            marginTop: "4%",
          }}
        >
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="grey"
            style={{
              color: "black",
            }}
            secureTextEntry={!isConfirmPass}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <Pressable
            onPress={toggleConfirmPasswordVisibility}
            style={{ marginEnd: 5 }}
          >
            <Ionicons
              name={isConfirmPass ? "eye" : "eye-off"}
              style={styles.icon}
              size={15}
              color="black"
            />
          </Pressable>
        </View>
        <Button
          name="REGISTER"
          validatonCheck={validateInput}
          onPress={toggleModal}
        />
        {isModalVisible && (
          <BottomSheet
            sports={["Football", "Basketball", "Tennis"]}
            handleSportSelection={handleSportSelection}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginTop: 2,
    marginStart: 5,
  },
});
