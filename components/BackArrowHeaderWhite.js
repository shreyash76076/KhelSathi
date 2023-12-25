import React from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSearch } from "../store/search-redux";

export default function BackArrowHeaderWhite({
  title,
  backButton,
  showArrow,
  searchTitle,
  showSearch,
  filter,
  FilterHandler,
}) {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleFilterPress = () => {
    // Pass both search query and other filter parameters to FilterHandler
    FilterHandler({ searchQuery /* other filter parameters */ });
  };

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
        {showArrow ? null : (
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
        )}

        <Text
          style={{
            fontSize: 24,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            marginHorizontal: 8,
          }}
        >
          {title}
        </Text>

        <Pressable
          style={{
            alignItems: "center",
          }}
          onPress={handleFilterPress}
          hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          {filter ? null : (
            <Image
              style={{
                width: 40,
                height: 40,
                resizeMode: "cover",
              }}
              source={require("../assets/images/filter.png")}
            />
          )}
        </Pressable>
      </View>
      {showSearch ? null : (
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: "3%",
            backgroundColor: "#FFFFFF5E",
            marginBottom: 2,
            borderRadius: 30,
            padding: 8,
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
            zIndex: 2,
          }}
        >
          <TextInput
            placeholder={`Search The ${searchTitle} Name`}
            placeholderTextColor="black"
            style={{ flex: 1, marginHorizontal: 6 }}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <Ionicons
            name="search"
            style={{ width: 20, height: 20, marginTop: 2, marginStart: 5 }}
            size={15}
            color="white"
          />
        </View>
      )}
    </LinearGradient>
  );
}
