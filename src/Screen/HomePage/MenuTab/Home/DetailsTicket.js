import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux"; // Import useSelector to access the user state
import styles from "../../../../theme/HomePage/MenutabStyle/Home/DetailsTicketStyle";

const DetailsTicket = ({ route, navigation }) => {
  const { trip, pickupPoints } = route.params;
  const user = useSelector((state) => state.user.userInfo); // Access the user info from Redux

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
    if (!user || !user.id) {
      // If the user is not logged in, show an alert and navigate to login screen
      Alert.alert(
        "Bạn cần đăng nhập",
        "Vui lòng đăng nhập để đặt vé.",
        [
          {
            text: "Đăng nhập",
            onPress: () => navigation.navigate("Login"), // Redirect to Login page
          },
        ],
        { cancelable: false }
      );
      return; // Prevent further navigation if not logged in
    }

    // If user is logged in, navigate to the seat selection screen
    const departureDate = trip.departureTime;
    const tripId = trip._id;
    navigation.navigate("SeatSelection", { tripId, departureDate });
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
          <View style={styles.pickupPointsContainer}>
            <Text style={styles.pickupPointsTitle}>Các điểm đón:</Text>
            <ScrollView>
              {pickupPoints && pickupPoints.length > 0 ? (
                pickupPoints.map((pickup, index) => (
                  <View key={index} style={styles.pickupPointItem}>
                    <Text style={styles.pickupPointText}>
                      Điểm trả khách: {pickup.location}{" "}
                    </Text>
                    {pickup.note ? (
                      <Text style={styles.pickupPointText}>
                        Ghi chú: {pickup.note}{" "}
                      </Text>
                    ) : null}
                  </View>
                ))
              ) : (
                <Text style={styles.noPickupPoints}>
                  Không có điểm đón nào.
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleBookTicket}>
          <Text style={styles.buttonText}>Đặt vé</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsTicket;
