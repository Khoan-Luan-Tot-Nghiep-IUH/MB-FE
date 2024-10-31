import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "../../../../theme/HomePage/MenutabStyle/TicketCar/CompletedTrips";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Import các icon

const CompletedTrips = ({ trips }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          // Chuyển đổi và định dạng `departureTime`
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
            <View style={styles.tripItem}>
              {/* Header của thẻ vé */}
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

              {/* Thông tin chi tiết */}
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
            </View>
          );
        }}
      />
    </View>
  );
};

export default CompletedTrips;
