import React, { useState, useRef, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";

const OtpInput = ({ onOtpChange }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const refs = useRef([]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "") {
      focusNext(index);
    } else {
      focusPrevious(index);
    }

    onOtpChange(newOtp.join(""));
  };

  const focusNext = (index) => {
    if (index < 5) {
      refs.current[index + 1].focus();
    }
  };

  const focusPrevious = (index) => {
    if (index > 0) {
      refs.current[index - 1].focus();
    }
  };

  const renderOtpInputs = () => {
    return otp.map((value, index) => (
      <TextInput
        key={index}
        ref={(ref) => (refs.current[index] = ref)}
        style={styles.input}
        value={value}
        onChangeText={(text) => handleOtpChange(index, text)}
        keyboardType="numeric"
        maxLength={1}
        onFocus={() => handleInputFocus(index)}
        onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, index)}
      />
    ));
  };


  const handleInputFocus = (index) => {
    if (otp[index] === "" || otp[index].length === 1) {
      refs.current[index].focus();
    } else {
      // If the box has more than one character, don't clear it
      refs.current[index].focus();
    }
  };
  

  
  const handleKeyPress = ({ key }, index) => {
    if (key === "Backspace") {
      handleOtpChange(index, "");
      focusPrevious(index);
    }
  };

  // Clear values on initial mount
  useEffect(() => {
    refs.current.forEach((ref) => {
      if (ref) {
        ref.clear();
      }
    });
  }, []);

  return <View style={styles.container}>{renderOtpInputs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#FF0000",
    borderRadius: 10,
    backgroundColor: "white",
    fontSize: 25,
    textAlign: "center",
    width: 60,
    height: 70,
    marginEnd: "1%",
    color: "black",
    fontWeight: "bold",
  },
});

export default OtpInput;
