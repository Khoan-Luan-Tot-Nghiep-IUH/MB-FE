import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "../../../../theme/HomePage/MenutabStyle/Home/DetailsTicketStyle";

const DetailsTicket = ({ route, navigation }) => {
  const { trip } = route.params;

  if (!trip) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTicketText}>Không có dữ liệu vé.</Text>
      </View>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date: departureDate, time: departureTime } = formatDate(
    trip.departureTime
  );
  const { date: arrivalDate, time: arrivalTime } = formatDate(trip.arrivalTime);

  const handleBookTicket = () => {
    const departureDate = trip.departureTime;
    const tripId = trip._id;
    navigation.navigate("SeatSelection", { tripId,departureDate });
    console.log(tripId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.size}></View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết vé</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.tripCard}>
          <Text style={styles.tripInfo}>
            {trip.busType?.name || "Không xác định"}
          </Text>

          <View style={styles.tripDetail}>
            <FontAwesome5 name="map-marker-alt" size={20} color="green" />
            <Text style={styles.tripLocation}>
              {trip.departureLocation.name} → {trip.arrivalLocation.name}
            </Text>
          </View>

          <Text style={styles.tripDate}>
            Khởi hành: {departureDate} - {departureTime}
          </Text>
          <Text style={styles.tripDate}>
            Đến nơi: {arrivalDate} - {arrivalTime}
          </Text>

          <Text style={styles.tripPrice}>
            Giá vé:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(trip.basePrice)}
          </Text>

          <Text style={styles.availableSeats}>
            Còn {trip.availableSeats} chỗ trống
          </Text>

          <Text style={styles.scheduleTitle}>Lịch trình:</Text>
          {trip.schedule.map((stop, index) => (
            <View key={stop._id} style={styles.scheduleItem}>
              <Text style={styles.scheduleStop}>
                Điểm dừng {index + 1}: {stop.stopName}
              </Text>
              <Text>Địa chỉ: {stop.stopAddress}</Text>
              <Text>
                Thời gian đến:{" "}
                {new Date(stop.estimatedArrivalTime).toLocaleString()}
              </Text>
              <Text>Số thứ tự dừng: {stop.stopOrder}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleBookTicket}>
          <Text style={styles.buttonText}>Đặt vé</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsTicket;
