import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Button({ name, validatonCheck }) {
  return (
    <View
      style={{
        borderRadius: 15,
        backgroundColor: "#EA5502",
        overflow: "hidden",
        marginHorizontal: 40,
        marginVertical: 30,
      }}
    >
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        android_ripple={{ color: "#E47036" }}
        onPress={validatonCheck}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>
          {name}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.25,
  },
  buttonInnerContainer:{
    paddingVertical:15
  }
})
