import React from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSearch } from "../store/search-redux";

export default function FilterHeader({ title, backButton }) {
  return (
    <LinearGradient
      style={{
        paddingVertical: 20,
        paddingHorizontal: 16,
        zIndex: 1,
      }}
      colors={["#BC1342", "#571262"]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={backButton}
          hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
            }}
            source={require("../assets/images/white_back.png")}
          />
        </Pressable>

        <Text
          style={{
            fontSize: 24,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            marginHorizontal: 8,
          }}
        >
          {title} Filter
        </Text>

        <Pressable
          style={{
            alignItems: "center",
          }}
          //   onPress={handleReset}
          hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              resizeMode: "cover",
            }}
            source={require("../assets/images/filterReset.png")}
          />
        </Pressable>
      </View>
    </LinearGradient>
  );
}
