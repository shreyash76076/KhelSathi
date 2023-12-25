import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";

const DropDown = ({ data, selectValue, oneSelect, button }) => {
  const [option, setOption] = React.useState(false);

  const selectOption = () => {
    setOption(!option);
  };

  const oneSelectItem = (val) => {
    setOption(false);
    console.log(val);
    oneSelect(val);
  };

  useEffect(() => {
    if (option) {
      // Do something when the dropdown is opened
    } else {
      // Do something when the dropdown is closed
    }
  }, [oneSelect]);

  return (
    <View style={{ marginHorizontal: 8, marginVertical: 6 }}>
      <TouchableOpacity
        style={{
          ...styles.dropDownStyle,
          borderRadius: option ? 0 : 10,
        }}
        onPress={selectOption}
      >
        <Text>{!!selectValue ? selectValue.name : "Select Category"}</Text>
        <Image
          source={require("../assets/drawables/dropDown.png")}
          style={{
            transform: [{ rotate: option ? "180deg" : "0deg" }],
          }}
        ></Image>
      </TouchableOpacity>
      {selectValue && !option && <Button name="SUBMIT" validatonCheck={button} />}
      {option && (
        <View style={styles.openDropDown}>
          {data.map((val, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => oneSelectItem(val)}
                style={{
                  ...styles.optionContainer,
                  backgroundColor: val.id == selectValue.id ? "pink" : "white",
                }}
              >
                <Image
                  source={val.image} // Add the property for image URL in your data
                  style={styles.optionImage}
                />
                <Text style={styles.optionText}>{val.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownStyle: {
    backgroundColor: "white",
    minHeight: 40,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    elevation: 8,
    width: "100%",
  },
  openDropDown: {
    backgroundColor: "white",
    padding: 15,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  optionContainer: {
    padding: 10,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
  },
  optionImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
  },
});

export default DropDown;
