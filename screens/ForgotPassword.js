import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  
  Text,
  TextInput,
  View,
  ToastAndroid,
} from "react-native";
import Button from "../components/Button";
import ForgotToolbar from "../components/ForgotToolbar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword({ navigation }) {
  const [inputValue, setInputValue] = useState("");

  function backButton() {
    navigation.goBack();
  }

  function validateInput() {
    // Regular expressions for email and 10-digit phone number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    console.log(inputValue)
    if (emailRegex.test(inputValue)) {
      // Valid email
      sendOtp();
    } else if (phoneRegex.test(inputValue)) {
      // Valid phone number
      sendOtp();
    } else {
      ToastAndroid.show("Invalid input. Please enter a valid email or phone number.", ToastAndroid.SHORT);
    }
  }

  function sendOtp() {
    // Implement your logic to send OTP
    // For now, let's just show a toast
    navigation.navigate("ForgotOtp")
    ToastAndroid.show("OTP sent successfully!", ToastAndroid.SHORT);
  }

  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:'#a21c44'}}>
      <LinearGradient
        // Background Linear Gradient
        style={{ flex: 1 }}
        colors={["#BC1342", "#571262"]}
      >
        <ForgotToolbar title="Forgot Your Password" backButton={backButton}/>
        <Text
          style={{
            marginStart: "5%",
            fontWeight: "bold",
            marginTop: "10%",
            fontSize: 18,
            color: "white",
          }}
        >
          Enter Your Mobile Number or Email Id
        </Text>
        <Text
          style={{
            marginStart: "5%",
            marginTop: "10%",
            fontSize: 18,
            color: "white",
            width: "100%",
          }}
        >
          We'll send you a 6 digit OTP on your mobile number/Email for
          verification
        </Text>
        <TextInput
          placeholder="Enter Mobile Number/Email"
          placeholderTextColor="grey"
          style={{
            borderWidth: 1,
            borderColor: "#6FB5F5",
            color: "black",
            backgroundColor: "white",
            elevation: 5,
            marginHorizontal: "5%",
            padding: "2%",
            marginTop: "8%",
          }}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <Button name="SUBMIT" validatonCheck={validateInput} />
      </LinearGradient>
    </SafeAreaView>
  );
}
