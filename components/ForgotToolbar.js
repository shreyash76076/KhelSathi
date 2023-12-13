import { View, Text, Pressable, Image } from "react-native";
import React from "react";

export default function ForgotToolbar({title,backButton}) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: "2%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Pressable style={{flex:1}} onPress={backButton}>
        <Image 
          style={{ width: 50, height: 50, resizeMode: "cover",marginStart:"4%" }}
          source={require("../assets/images/orange_back.png")}
        />
      </Pressable>
      <Text style={{ flex:2, alignSelf:'center', fontSize: 20,}}>
        {title}
      </Text>
    </View>
  );
}
