import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../../../../theme/HomePage/MenutabStyle/TicketCar/CompletedTrips";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
const CompletedTrips = ({ trips }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          // Check if item.trip exists before accessing its properties
          if (!item.trip) {
            return (
              <View style={styles.tripItem}>
                <Text style={styles.infoText}>
                  Trip details are unavailable
                </Text>
              </View>
            );
          }

          // Convert and format `departureTime`
          const departureDate = new Date(item.trip.departureTime);
          const formattedDate = departureDate.toLocaleString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <TouchableOpacity
              style={styles.tripItem}
              onPress={() => {
                console.log("Trip Details:", item.trip);
                console.log("Company ID:", item.trip?.companyId);
                navigation.navigate("Complant", {
                  tripId: item._id,
                  trip: item.trip,
                  companyId: item.trip?.companyId || null,
                });
              }}
            >
              <View style={styles.tripHeader}>
                <Text style={styles.location}>
                  <FontAwesome name="map-marker" size={16} color="#ff6347" />{" "}
                  {item.trip.departureLocation.name}
                </Text>
                <MaterialIcons name="arrow-forward" size={16} color="#333" />
                <Text style={styles.location}>
                  <FontAwesome name="map-marker" size={16} color="#4A90E2" />{" "}
                  {item.trip.arrivalLocation.name}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.infoText}>
                  <FontAwesome name="calendar" size={14} color="#333" /> Thời
                  gian: {formattedDate}
                </Text>
                <Text style={styles.infoText}>
                  <FontAwesome name="bus" size={14} color="#333" /> Loại xe:{" "}
                  {item.trip.busType.name}
                </Text>
                <Text style={styles.infoText}>
                  <FontAwesome name="dollar" size={14} color="#333" /> Giá:{" "}
                  {item.totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
                <Text style={styles.infoText}>
                  <MaterialIcons name="event-seat" size={14} color="#333" /> Số
                  Ghế: {item.seatNumbers.join(", ")}
                </Text>
                <Text style={styles.infoText}>
                  <FontAwesome name="credit-card" size={14} color="#333" />{" "}
                  Thanh toán: {item.paymentMethod}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CompletedTrips;
