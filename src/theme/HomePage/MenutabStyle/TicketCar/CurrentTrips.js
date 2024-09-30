import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CurrentTrips = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Danh sách chuyến đi hiện tại</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F2230", // Dark background
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default CurrentTrips;
