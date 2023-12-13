import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ForgotToolbar from "../components/ForgotToolbar";
import Button from "../components/Button";
import TextInputContainer from "../components/TextInputContainer";

export default function UpdatePassword({ route, navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function backButton() {
    navigation.goBack();
  }

  const handlePasswordChange = (password) => {
    setNewPassword(password);
  };

  const handleConfirmPasswordChange = (password) => {
    setConfirmPassword(password);
  };

  const handleSubmit = () => {
    // Password validation logic
    if (newPassword.length < 6 || newPassword.length > 10) {
      ToastAndroid.show(
        "Password must be between 6 and 10 characters",
        ToastAndroid.SHORT
      );
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.SHORT);
      return;
    }
    ToastAndroid.show("Password Updated Succesfully", ToastAndroid.SHORT);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#a21c44" }}>
      <LinearGradient style={{ flex: 1 }} colors={["#BC1342", "#571262"]}>
        <ForgotToolbar title="Update Password" backButton={backButton} />
        <Text
          style={{
            fontWeight: "bold",
            marginTop: "10%",
            textAlign: "center",
            fontSize: 18,
            color: "white",
          }}
        >
          Generate New Password
        </Text>
        <TextInputContainer
          children="New Password"
          icon="lock-closed-outline"
          check="true"
          values={handlePasswordChange}
          onClear={() => setNewPassword("")}
        />
        <TextInputContainer
          children="Confirm Password"
          icon="lock-closed-outline"
          check="true"
          values={handleConfirmPasswordChange}
          onClear={() => setConfirmPassword("")}
        />
        <Button name="SUBMIT" validatonCheck={handleSubmit} />
      </LinearGradient>
    </SafeAreaView>
  );
}
