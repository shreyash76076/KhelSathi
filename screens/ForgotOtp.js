import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ForgotToolbar from "../components/ForgotToolbar";
import OtpInput from "../components/OTPContainer";
import Button from "../components/Button";

export default function ForgotOtp({ navigation }) {
  let otpNum = 0;
  function backButton() {
    navigation.goBack();
  }
  const handleOtpChange = (otp) => {
    // Handle the complete OTP
    otpNum = otp;
  };
  function handleOtpCheck() {
    if (otpNum.length === 6) {
      navigation.navigate("UpdatePassword",{otpNumber:otpNum})
    } else {
      ToastAndroid.show("Error: Incomplete OTP")
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#a21c44" }}>
      <LinearGradient
        // Background Linear Gradient
        style={{ flex: 1 }}
        colors={["#BC1342", "#571262"]}
      >
        <ForgotToolbar title="Forgot Your Password" backButton={backButton} />
        <Text
          style={{
            fontWeight: "bold",
            marginTop: "10%",
            textAlign: "center",
            fontSize: 18,
            color: "white",
          }}
        >
          We have sent a 6 digit OTP on
        </Text>
        <View style={{ marginHorizontal: "5%", marginTop: "10%" }}>
          <OtpInput onOtpChange={handleOtpChange} />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            marginTop: "10%",
            textAlign: "center",
            fontSize: 18,
            color: "#FF6F1F",
          }}
        >
          Resend OTP
        </Text>
        <Button name="CONTINUE" validatonCheck={handleOtpCheck} />
      </LinearGradient>
    </SafeAreaView>
  );
}
