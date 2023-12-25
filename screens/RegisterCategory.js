import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DropDown from "../components/CustomeDropDown";

export default function RegisterCategory({navigation}) {
  const [selectValue, setSelectValue] = React.useState("");

  const data = [
    {
      id: 1,
      image: require("../assets/RegisterCategory/player.png"),
      name: "Player",
    },
    {
      id: 2,
      image: require("../assets/RegisterCategory/coach.png"),
      name: "Coach",
    },
    {
      id: 3,
      image: require("../assets/RegisterCategory/Primary.png"),
      name: "Primary Care Doctor",
    },
    {
      id: 4,
      image: require("../assets/RegisterCategory/orthopedic.png"),
      name: "Orthopedic",
    },
    {
      id: 5,
      image: require("../assets/RegisterCategory/Chiropractors.png"),
      name: "Chiropractors",
    },
    {
      id: 6,
      image: require("../assets/RegisterCategory/athelete.png"),
      name: "Athlete Trainer",
    },
    {
      id: 7,
      image: require("../assets/RegisterCategory/dietition.png"),
      name: "Dietitian",
    },
    {
      id: 8,
      image: require("../assets/RegisterCategory/therapist.png"),
      name: "Physical Therapist",
    },
    {
      id: 9,
      image: require("../assets/RegisterCategory/others.png"),
      name: "Others",
    },
    
  ];

  const selected = (item) => {
    setSelectValue(item);
  };
  
  function button(){
    navigation.navigate('SignUp',{
        name:selectValue.name
    })
  }
  useEffect(() => {
    console.log(selectValue.name);
  }, [selectValue]);
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        style={{ flex: 1 }}
        colors={["#BC1342", "#571262"]}
      >
        <ScrollView>
          <View style={styles.halfCurcular}>
            <View
              style={{
                width: "40%",
                backgroundColor: "white",
                borderWidth: 6,
                borderColor: "white",
                alignItems: "flex-end",
                borderTopEndRadius: 80,
                borderBottomEndRadius: 80,
              }}
            >
              <Image
                style={{ width: 150, height: 150 }}
                source={require("../assets/images/uttarpradeshLogo.png")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center", padding: 8 }}>
              <Text
                style={{ fontSize: 68, color: "white", fontWeight: "bold" }}
              >
                KHEL SATHI
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 24,
              color: "white",
              marginStart: 8,
              marginTop: 40,
              fontWeight: "bold",
            }}
          >
            Register Category
          </Text>
          <View style={{ flex: 1,marginTop:10 }}>
            <DropDown
              selectValue={selectValue}
              data={data}
              oneSelect={selected}
              button={button}
            ></DropDown>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  halfCurcular: {
    flexDirection: "row",
    marginTop: 40,
    width: "100%",
    height: 165,
    justifyContent: "space-between",
  },
  yogiji: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    justifyContent: "space-around",
  },
  textStyle: {
    fontSize: 14,
    color: "black",
    marginHorizontal: 4,
    marginTop: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle1: {
    fontSize: 14,
    color: "black",
    marginHorizontal: 4,
    marginTop: 4,
    textAlign: "center",
  },
});
