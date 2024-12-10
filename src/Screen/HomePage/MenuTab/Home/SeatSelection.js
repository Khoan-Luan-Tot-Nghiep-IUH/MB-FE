import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import axios from "axios";
import io from "socket.io-client";
import config from "../../../../../config"; // Ensure SOCKET_URL is correctly defined here
import styles from "../../../../theme/HomePage/MenutabStyle/Home/SeatSelectionStyle";
import { useSelector } from "react-redux";

const SeatSelection = ({ route, navigation }) => {
  const { tripId, departureDate } = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState({ lower: [], upper: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const socketRef = useRef(null);
  const userId = useSelector((state) => state.user.userInfo.id);
  const yourAuthToken = useSelector((state) => state.user?.userInfo?.token);
  console.log(userId);
  useEffect(() => {
    socketRef.current = io(config.SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current.emit("joinTrip", tripId, (ack) => {
      if (ack.success) {
        console.log("Successfully joined trip room:", tripId);
      } else {
        console.error("Failed to join trip room:", tripId);
      }
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setError("Unable to connect to booking service. Please try again later.");
    });
    socketRef.current.on("seatLocked", ({ tripId, seatNumber, lockedBy }) => {
      setSeats((prevSeats) => ({
        lower: prevSeats.lower.map((seat) =>
          seat.seatNumber === seatNumber
            ? {
                ...seat,
                isAvailable: lockedBy === userId,
                lockedBy,
              }
            : seat
        ),
        upper: prevSeats.upper.map((seat) =>
          seat.seatNumber === seatNumber
            ? {
                ...seat,
                isAvailable: lockedBy === userId,
                lockedBy,
              }
            : seat
        ),
      }));
    });
    socketRef.current.on("seatReleased", ({ tripId, seatNumber }) => {
      setSeats((prevSeats) => ({
        lower: prevSeats.lower.map((seat) =>
          seat.seatNumber === seatNumber
            ? { ...seat, isAvailable: true, lockedBy: null }
            : seat
        ),
        upper: prevSeats.upper.map((seat) =>
          seat.seatNumber === seatNumber
            ? { ...seat, isAvailable: true, lockedBy: null }
            : seat
        ),
      }));
    });

    return () => {
      socketRef.current.off("seatLocked");
      socketRef.current.off("seatReleased");
    };
  }, [userId]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/trips/${tripId}/seats`
        );
        const seatData = response.data.data;

        if (seatData && seatData.lower && seatData.upper) {
          setSeats(seatData);
        } else {
          setSeats({ lower: [], upper: [] });
          console.error("Invalid seat data:", seatData);
        }
      } catch (err) {
        setError("Unable to load seats.");
        console.error("Error fetching seat data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [tripId]);
  const handleSeatSelect = (seat) => {
    // Nếu ghế bị khóa bởi người khác, không cho phép chọn hoặc bỏ chọn
    if (!seat.isAvailable && seat.lockedBy !== userId) {
      Alert.alert("Ghế không khả dụng", "Ghế này đã được chọn bởi người khác.");
      return;
    }
    if (selectedSeats.includes(seat._id)) {
      // Bỏ chọn ghế
      socketRef.current.emit("releaseSeat", {
        tripId,
        seatNumber: seat.seatNumber,
        userId,
      });

      setSelectedSeats((prev) => prev.filter((id) => id !== seat._id));
      setTotalPrice((prevPrice) => prevPrice - seat.price);
    } else {
      // Chọn ghế
      socketRef.current.emit("reserveSeat", {
        tripId,
        seatNumber: seat.seatNumber,
        userId,
      });
      setSelectedSeats((prev) => [...prev, seat._id]);
      setTotalPrice((prevPrice) => prevPrice + seat.price);
    }
  };

  const handleContinue = async () => {
    if (selectedSeats.length === 0) {
      Alert.alert(
        "Chưa chọn ghế",
        "Vui lòng chọn ít nhất một ghế để tiếp tục."
      );
      return;
    }
    try {
      const selectedSeatNumbers = selectedSeats
        .map((seatId) => {
          const seat = [...seats.lower, ...seats.upper].find(
            (s) => s._id === seatId
          );
          return seat ? seat.seatNumber : null;
        })
        .filter((seatNumber) => seatNumber !== null);
      const response = await axios.post(
        `${config.BASE_URL}/bookings-confirm`,
        {
          tripId,
          seatNumbers: selectedSeatNumbers,
        },
        {
          headers: {
            Authorization: `Bearer ${yourAuthToken}`,
          },
        }
      );
      console.log(response.data.data);
      if (response.data.success) {
        const { bookingId, expiryTime, totalPrice } = response.data.data;

        // Điều hướng tới màn hình xác nhận với thông tin booking
        navigation.navigate("Booking", {
          bookingId,
          expiryTime,
          totalPrice,
        });
      } else {
        Alert.alert(
          "Đặt chỗ thất bại",
          response.data.message || "Có lỗi xảy ra, vui lòng thử lại."
        );
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      Alert.alert(
        "Lỗi",
        error.response?.data?.message ||
          "Không thể thực hiện đặt chỗ. Vui lòng thử lại sau."
      );
    }
  };

  // Format the departure date
  const formattedDate = new Date(departureDate).toLocaleString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#ff6347" />
        <Text>Loading seats...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.size}></View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome5 name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.header}>Ngày Khởi Hành</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
      <ScrollView>
        {/* Lower and Upper Deck Seats */}
        <View style={styles.sectionHeader}>
          <FontAwesome5
            name="bus-alt"
            size={20}
            color="#4CAF50"
            style={styles.sectionIcon}
          />
          <Text style={styles.tierHeader}>Tầng dưới</Text>
        </View>
        <View style={styles.row}>
          {seats.lower.map((seat) => {
            // Điều kiện: Ghế VIP từ 2 đến 6
            const isVipSeat = seat.seatNumber >= 2 && seat.seatNumber <= 6;
            // Điều kiện: Ghế không bán (Ghế 1)
            const isNotForSale = seat.seatNumber === 1;
            return (
              <TouchableOpacity
                key={seat._id}
                style={[
                  styles.seat,
                  isNotForSale
                    ? styles.seatNotForSale // Ghế 1, không thể chọn
                    : isVipSeat
                    ? selectedSeats.includes(seat._id)
                      ? styles.selected // VIP seat is selected
                      : styles.seatVip // VIP seat is not selected
                    : !seat.isAvailable && seat.lockedBy !== userId
                    ? styles.sold // Ghế bị khóa
                    : selectedSeats.includes(seat._id)
                    ? styles.selected // Ghế đã chọn
                    : styles.available, // Ghế trống
                ]}
                onPress={() => handleSeatSelect(seat)}
                disabled={
                  isNotForSale ||
                  (!seat.isAvailable && seat.lockedBy !== userId)
                }
              >
                <MaterialCommunityIcons
                  name="seat-recline-extra"
                  size={24}
                  color="#ffffff"
                />
                <Text style={styles.seatText}>{seat.seatNumber}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.sectionHeader}>
          <FontAwesome5
            name="bus-alt"
            size={20}
            color="#FF9800"
            style={styles.sectionIcon}
          />
          <Text style={styles.tierHeader}>Tầng trên</Text>
        </View>
        <View style={styles.row}>
          {seats.upper.map((seat) => (
            <TouchableOpacity
              key={seat._id}
              style={[
                styles.seat,
                !seat.isAvailable
                  ? styles.sold
                  : selectedSeats.includes(seat._id)
                  ? styles.selected
                  : styles.available,
              ]}
              onPress={() => handleSeatSelect(seat)}
              disabled={!seat.isAvailable}
            >
              <MaterialCommunityIcons
                name="seat-passenger"
                size={24}
                color="#ffffff"
              />
              <Text style={styles.seatText}>{seat.seatNumber}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name="seat-recline-extra"
            size={24}
            color="#dc3545"
          />
          <Text style={styles.statusText}>Đã bán</Text>
        </View>

        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name="seat-recline-extra"
            size={24}
            color="#28a745"
          />
          <Text style={styles.statusText}>Trống</Text>
        </View>

        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name="seat-recline-extra"
            size={24}
            color="#ffa500"
          />
          <Text style={styles.statusText}>Đang chọn</Text>
        </View>

        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name="seat-recline-extra"
            size={24}
            color="#C0C0C0"
          />
          <Text style={styles.statusText}>VIP</Text>
        </View>

        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name="seat-recline-extra"
            size={24}
            color="#333333 "
          />
          <Text style={styles.statusText}>Không bán</Text>
        </View>
      </View>

      <Text style={styles.selectedSeatsContainer}>Ghế đã chọn:</Text>
      <ScrollView>
        <View style={styles.selectedSeatsContainer}>
          {selectedSeats.map((seatId) => {
            const seat = [...seats.lower, ...seats.upper].find(
              (s) => s._id === seatId
            );
            if (seat) {
              return (
                <View key={seatId} style={styles.selectedSeatItem}>
                  <Text>Seat: {seat.seatNumber}</Text>
                  <Text>Price: {seat.price} VNĐ</Text>
                  <Text>Row: {seat.seatRow}</Text>
                  <Text>Deck: {seat.floor}</Text>
                </View>
              );
            }
            return null;
          })}
        </View>
      </ScrollView>
      <View style={styles.selectedSeatsContainer}>
        <Text style={styles.totalPrice}>Giá: {totalPrice} VNĐ</Text>
      </View>

      <View style={styles.buttonFooter}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Tiếp Tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SeatSelection;
