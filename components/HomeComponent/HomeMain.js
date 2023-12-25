// import { View, Text, Image } from "react-native";
// import React from "react";

// export default function HomeMain() {
//   return (
//     <View style={{ flexDirection: "row" }}>
//       <View style={{ flex: 1, marginHorizontal: 4 }}>
//         <Image
//           source={require("../../assets/homeScreen/scheme.png")}
//           style={{
//             width: "100%",
//             height: 120,
//             resizeMode: "cover",
//           }}
//         />
//       </View>
//       <View style={{ flex: 1, marginHorizontal: 4 }}>
//         <Image
//           source={require("../../assets/homeScreen/Facilities.png")}
//           style={{
//             width: "100%",
//             height: 120,
//             resizeMode: "cover",
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { View, FlatList, Image, Text, StyleSheet } from "react-native";
// import { getSports } from "../../Util/auth";
// import CategoryGridTile from "../CategoryGridTile";

// const HorizontalFlatList = ({ state }) => {
//   const data = [
//     {
//       id: "1",
//       imageName: require("../../assets/homeScreen/scheme.png"),
//       text: "Camps",
//     },
//     {
//       id: "2",
//       imageName: require("../../assets/homeScreen/Facilities.png"),
//       text: "Selection",
//     },
//     {
//       id: "3",
//       imageName: require("../../assets/homeScreen/HealthATM.png"),
//       text: "Trials",
//     },
//     {
//       id: "4",
//       imageName: require("../../assets/homeScreen/playerList.png"),
//       text: "Matches",
//     },
//     {
//       id: "5",
//       imageName: require("../../assets/homeScreen/job.png"),
//       text: "Matches",
//     },
//     {
//       id: "6",
//       imageName: require("../../assets/homeScreen/directory.png"),
//       text: "Matches",
//     },
//     {
//       id: "7",
//       imageName: require("../../assets/homeScreen/gallery.png"),
//       text: "Matches",
//     },
//     {
//       id: "8",
//       imageName: require("../../assets/homeScreen/notices.png"),
//       text: "Matches",
//     },
//     {
//       id: "9",
//       imageName: require("../../assets/homeScreen/onlineAdmission.png"),
//       text: "Matches",
//     },
//     {
//       id: "10",
//       imageName: require("../../assets/homeScreen/financialAid.png"),
//       text: "Matches",
//     },
//     {
//       id: "11",
//       imageName: require("../../assets/homeScreen/prizeMoney.png"),
//       text: "Matches",
//     },
//     {
//       id: "12",
//       imageName: require("../../assets/homeScreen/Eklavya.png"),
//       text: "Matches",
//     },
//     // Add more items as needed
//   ];

//   const Calendar = ({ item }) => (
//     <CategoryGridTile
//       title={item.text}
//       imageUrl={item.imageName}
//       color="white"
//     />
//   );

//   return (
//     <FlatList
//       data={data}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={Calendar}
//       numColumns={2}
//       scrollEnabled={false}
//       showsHorizontalScrollIndicator={false}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     // Add styles for the item container if needed
//     justifyContent: "space-around",
//   },
//   image: {
//     width: 100,
//     height: 90,
//     resizeMode: "cover",
//   },
//   text: {
//     marginTop: 4,
//     textAlign: "center",
//   },
// });

// export default HorizontalFlatList;

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { CommonActions } from "@react-navigation/native";

import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

const dataMain = [
  {
    id: "1",
    imageName: require("../../assets/homeScreen/schemeIcon.png"),
    text: "Scheme & Guidelines",
    color1: "#F98F8F",
    colo2: "#FFA552",
  },
  {
    id: "2",
    imageName: require("../../assets/homeScreen/facilityIcon.png"),
    text: "Facilities",
    color1: "#E0ADFF",
    colo2: "#8987F9",
  },
  {
    id: "3",
    imageName: require("../../assets/homeScreen/atmIcon.png"),
    text: "Health ATM",
    color1: "#67C286",
    colo2: "#67C286",
  },
  {
    id: "4",
    imageName: require("../../assets/homeScreen/playerlistIcon.png"),
    text: "Player List",
    color1: "#ECAD50",
    colo2: "#ECAD50",
  },
  {
    id: "5",
    imageName: require("../../assets/homeScreen/jobIcon.png"),
    text: "Job Opportunity",
    color1: "#8F9FF5",
    colo2: "#8F9FF5",
  },
  {
    id: "6",
    imageName: require("../../assets/homeScreen/directoryIcon.png"),
    text: "Directory",
    color1: "#FC9993",
    colo2: "#FC9993",
  },
  {
    id: "7",
    imageName: require("../../assets/homeScreen/galleryIcon.png"),
    text: "Gallery",
    color1: "#CDCE7A",
    colo2: "#CDCE7A",
  },
  {
    id: "8",
    imageName: require("../../assets/homeScreen/noticeIcon.png"),
    text: "Notices",
    color1: "#A1F8E8",
    colo2: "#205FD8",
  },
  {
    id: "9",
    imageName: require("../../assets/homeScreen/onlineAddIcon.png"),
    text: "Online Admission",
    color1: "#CD82FC",
    colo2: "#CD82FC",
  },
  {
    id: "10",
    imageName: require("../../assets/homeScreen/financialIcon.png"),
    text: "Financial Aid",
    color1: "#ABE5BF",
    colo2: "#1FBED4",
  },
  {
    id: "11",
    imageName: require("../../assets/homeScreen/awardIcon.png"),
    text: "Prize Money",
    color1: "#9EC843",
    colo2: "#9EC843",
  },
  {
    id: "12",
    imageName: require("../../assets/homeScreen/stadiumIcon.png"),
    text: "Eklavya Kreeda Kosh",
    color1: "#17ADEE",
    colo2: "#17ADEE",
  },
  // Add more items as needed
];

const data2 = [
  {
    id: "1",
    imageName: require("../../assets/SportsDetails/Camps.png"),
    text: "Camps",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "2",
    imageName: require("../../assets/SportsDetails/sportsPlaceholder.png"),
    text: "Matches",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "3",
    imageName: require("../../assets/SportsDetails/trails.png"),
    text: "Trials",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },

  {
    id: "4",
    imageName: require("../../assets/SportsDetails/facilitys.png"),
    text: "Facilities",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "5",
    imageName: require("../../assets/SportsDetails/coaches.png"),
    text: "Coachs",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
  {
    id: "6",
    imageName: "",
    text: "",
    color1: "#FFFFFF",
    colo2: "#FFFFFF",
  },
];

const CurvedGridItem = ({ navigation, item }) => {
  const getGradientDirection = (item) => {
    // Logic to determine the gradient direction based on the item
    if (item.text === "Financial Aid" || item.text === "Notices") {
      return { start: { x: 0.0, y: 0.5 }, end: { x: 1.0, y: 0.5 } };
    } else {
      // Default to top to bottom
      return { start: { x: 0.5, y: 0.0 }, end: { x: 0.5, y: 1.0 } };
    }
  };

  function homeItemHandler() {
    if (item.text === "Facilities") {
      // Reset the Facilities stack and navigate to the initial screen
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [{ name: "FacilitiesScreen" }],
        }),
      });
    }
    if (item.text === "Notices") {
      // Reset the Facilities stack and navigate to the initial screen
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [{ name: "Notices" }],
        }),
      });
    }

    if (item.text === "Gallery") {
      // Reset the Facilities stack and navigate to the initial screen
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [{ name: "GalleryScreen" }],
        }),
      });
    }
    if (item.text === "Scheme & Guidelines") {
      navigation.navigate("SchemeAndGuidelines");
    }
    if (item.text === "Player List") {
      navigation.navigate("PlayerList");
    }
  }

  const gradientDirection = getGradientDirection(item);

  return (
    <Pressable onPress={homeItemHandler} style={styles.itemContainer}>
      <LinearGradient
        colors={[item.color1, item.colo2]} // Change colors as per your preference
        style={styles.gradient}
        {...gradientDirection}
      >
        <Image source={item.imageName} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const SportsDetails = ({ item, data, image }) => {
  const getGradientDirection = (item) => {
    // Logic to determine the gradient direction based on the item
    if (item.text === "Financial Aid" || item.text === "Notices") {
      return { start: { x: 0.0, y: 0.5 }, end: { x: 1.0, y: 0.5 } };
    } else {
      // Default to top to bottom
      return { start: { x: 0.5, y: 0.0 }, end: { x: 0.5, y: 1.0 } };
    }
  };

  const gradientDirection = getGradientDirection(item);
  if (item.id !== "6") {
    return (
      <View style={styles.itemContainer2}>
        <LinearGradient
          colors={[item.color1, item.colo2]} // Change colors as per your preference
          style={styles.gradient}
          {...gradientDirection}
        >
          <Image
            source={
              !!item.text && item.text === "Matches"
                ? { uri: "http://mobile.khelsathi.in/files/sports/" + image }
                : item.imageName
            }
            style={styles.image2}
          />
          <Text style={styles.text2}>
            {!!item.text && item.text === "Matches" ? data : item.text}
          </Text>
        </LinearGradient>
      </View>
    );
  } else {
    return <View style={styles.itemContainer}></View>;
  }
};

const CurvedGridView = ({ navigation, state, data, image }) => {
  return state === "true" ? (
    <FlatList
      data={dataMain}
      numColumns={2}
      renderItem={({ item }) => (
        <CurvedGridItem navigation={navigation} item={item} />
      )}
      scrollEnabled={false}
      keyExtractor={(item) => item.id}
    />
  ) : (
    <FlatList
      data={data2}
      numColumns={2}
      renderItem={({ item }) => (
        <SportsDetails item={item} data={data} image={image} />
      )}
      scrollEnabled={false}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
  },
  itemContainer2: {
    flex: 1,
    elevation: 4,
    marginHorizontal: 15,
    marginVertical: 12,
    borderRadius: 14,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "center",
  },
  image: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    marginBottom: 8,
  },
  image2: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  text2: {
    color: "black",
    fontWeight: "bold",
  },
});

export default CurvedGridView;
