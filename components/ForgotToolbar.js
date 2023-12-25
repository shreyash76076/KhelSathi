import { View, Text, Pressable, Image } from "react-native";
import React from "react";

export default function ForgotToolbar({ title, backButton }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: "2%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Pressable style={{ flex: 1, alignSelf: "flex-start" }} onPress={backButton}>
        <Image
          style={{ width: 50, height: 50, resizeMode: "cover", marginStart: "4%" }}
          source={require("../assets/images/orange_back.png")}
        />
      </Pressable>
      <Text style={{ flex: 2, fontSize: 18, textAlign: 'center' }} numberOfLines={1}>
        {title}
      </Text>
      <View style={{ flex: 1 }} />
    </View>
  );
}
