import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  // ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

function TextInputContainer(props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isValid, setIsValid] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isEmailValid = (email) => {
    // Regular expression for email validation
    // Allow spaces only at the end
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\s*$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 6 || password.length > 10) {
      setIsValid(false);

      return false;
    } else {
      setPasswordError("");
      setIsValid(true);

      return true;
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);

    if (validatePassword(value)) {
      setIsValid(true);
      if (typeof props.values === "function") {
        props.values(value);
      }
    } else {
      setIsValid(false);
      props.onClear(); // Clear the state if password is invalid
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);

    if (isEmailValid(value)) {
      setEmailError("");
      setIsValid(true);

      // Calling the function passed from the parent component
      if (typeof props.values === "function") {
        props.values(value);
      }
    } else {
      setIsValid(false);
      props.onClear(); // Clear the state if email is invalid
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Ionicons name={props.icon} style={styles.icon} size={15} color="white" />
      <TextInput
        placeholder={props.children}
        style={styles.placeholder}
        placeholderTextColor="white"
        secureTextEntry={props.check === "true" ? !isPasswordVisible : false}
        value={props.check === "true" ? password : email}
        onChangeText={
          props.check === "true" ? handlePasswordChange : handleEmailChange
        }
      />
      {props.check === "true" && (
        <Pressable onPress={togglePasswordVisibility} style={{ marginEnd: 5 }}>
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            style={styles.icon}
            size={15}
            color="white"
          />
        </Pressable>
      )}

      <Text style={styles.errorText}>{emailError}</Text>
      {props.check === "true" && (
        <Text style={styles.errorText}>{passwordError}</Text>
      )}
    </View>
  );
}

export default TextInputContainer;

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginTop: 2,
    marginStart: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 40,
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: "#CB3EBC",
  },
  placeholder: {
    flex: 1,
    paddingVertical: 10,
    color: "white",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
