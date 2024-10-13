import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import config from "../../../../../config";

const TripListScreen = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getTrips();
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  const getTrips = async () => {
    const response = await fetch(`${config.BASE_URL}/trips`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  };

  const renderTripItem = ({ item }) => (
    <View style={styles.tripItem}>
      <Text style={styles.tripName}>{item.name}</Text>
      <Text>{item.details}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách chuyến đi</Text>
      <FlatList
        data={trips}
        keyExtractor={(item, index) => index.toString()}// Ensure id is unique and string
        renderItem={renderTripItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  tripItem: {
    padding: 15,
    backgroundColor: "#3D384A",
    borderRadius: 5,
    marginBottom: 10,
  },
  tripName: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#FF9000",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
});

export default TripListScreen;
