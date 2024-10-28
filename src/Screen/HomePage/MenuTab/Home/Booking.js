import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../../../config"; // Ensure the correct path to config
import styles from "../../../../theme/HomePage/MenutabStyle/Home/BookingStyle";
const Booking = ({ route, navigation }) => {
  const { tripId, seatNumbers, totalPrice, departureDate } = route.params;
  const [paymentMethod, setPaymentMethod] = useState("OnBoard"); // Default payment method
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.userInfo); // Get user data from Redux
  const token = useSelector((state) => state.user.userInfo.token); // Extract token
  console.log("đây là token thanh toán", token);
  const handleBooking = async () => {
    setLoading(true);
    try {
      console.log("Base URL:", `${config.BASE_URL}/bookings`);
      console.log("Token:", token);
      console.log("Selected Payment Method:", paymentMethod);
      console.log("lấy số ghế ", seatNumbers);

      const seatNumbersAsIntegers = seatNumbers.map((seat) => parseInt(seat));
    //   console.log("Seat Numbers as Integers:", seatNumbersAsIntegers);

      const response = await axios.post(
        `${config.BASE_URL}/bookings`,
        {
          tripId,
          seatNumbers: seatNumbersAsIntegers,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response.data;
      Alert.alert("Success", "Booking confirmed!");
      console.log("Booking data:", data);

      if (paymentMethod === "Online") {
        navigation.navigate("Payment", { paymentLink: data.paymentLink });
      } else {
        navigation.navigate("BookingSuccess", { bookingId: data.bookingId });
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data.message || "Booking failed.");
      console.error("Error during booking:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Confirmation</Text>
      {/* <View style={styles.tripDetails}>
        <Text>Trip ID: {tripId}</Text>
        <Text>Selected Seats: {seatNumbers.join(", ")}</Text>
      </View> */}
      {/* Payment Method Selection */}
      <View style={styles.paymentMethodContainer}>
        <Text style={styles.paymentMethodLabel}>Select Payment Method:</Text>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === "OnBoard" ? styles.selectedOption : {},
          ]}
          onPress={() => setPaymentMethod("OnBoard")}
        >
          <Text style={styles.paymentOptionText}>OnBoard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === "Online" ? styles.selectedOption : {},
          ]}
          onPress={() => setPaymentMethod("Online")}
        >
          <Text style={styles.paymentOptionText}>Online</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleBooking}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Booking;
