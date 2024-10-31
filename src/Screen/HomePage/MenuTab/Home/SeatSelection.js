import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import config from "../../../../../config";
import styles from "../../../../theme/HomePage/MenutabStyle/Home/SeatSelectionStyle";

const SeatSelection = ({ route, navigation }) => {
  const { tripId, departureDate } = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState({ lower: [], upper: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // State để lưu tổng giá tiền
  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      Alert.alert(
        "Thông báo",
        "Bạn chưa chọn ghế nào. Vui lòng chọn ít nhất một ghế để tiếp tục."
      );
      return;
    }
    const selectedSeatNumbers = selectedSeats
      .map((seatId) => {
        const seat = [...seats.lower, ...seats.upper].find(
          (s) => s._id === seatId
        );
        return seat ? seat.seatNumber : null;
      })
      .filter((seatNumber) => seatNumber !== null);

    navigation.navigate("Booking", {
      tripId,
      seatNumbers: selectedSeatNumbers,
      totalPrice,
      departureDate,
    });
  };
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/trips/${tripId}/seats`
        );
        const seatData = response.data.data;

        // console.log("Dữ liệu ghế trả về từ API:", seatData); 

        if (
          seatData &&
          seatData.lower &&
          Array.isArray(seatData.lower) &&
          seatData.upper &&
          Array.isArray(seatData.upper)
        ) {
          setSeats(seatData);
        } else {
          console.error("Dữ liệu không đúng cấu trúc:", seatData);
          setSeats({ lower: [], upper: [] });
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu ghế:", err);
        setError("Không thể tải ghế.");
        setSeats({ lower: [], upper: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [tripId]);

  const handleSeatSelect = (seat) => {
    // Nếu ghế đã được chọn (có trong selectedSeats), thì bỏ chọn ghế đó
    if (selectedSeats.includes(seat._id)) {
      setSelectedSeats((prevSeats) =>
        prevSeats.filter((id) => id !== seat._id)
      );
      setTotalPrice(totalPrice - seat.price); // Trừ giá ghế khi bỏ chọn
    } else {
      // Nếu số ghế đã chọn nhỏ hơn 3, cho phép chọn thêm ghế
      if (selectedSeats.length < 3) {
        setSelectedSeats((prevSeats) => [...prevSeats, seat._id]); // Thêm ghế vào danh sách
        setTotalPrice(totalPrice + seat.price); // Cộng giá ghế khi chọn mới
      } else {
        alert("Bạn chỉ có thể chọn tối đa 3 ghế."); // Thông báo khi vượt quá 3 ghế
      }
    }
    console.log("Ghế đã chọn:", seat);
    // Cập nhật tổng giá tiền
    const updatedTotalPrice = selectedSeats.includes(seat._id)
      ? totalPrice - seat.price // Nếu ghế đã chọn, trừ giá
      : totalPrice + seat.price; // Nếu ghế chưa chọn, cộng giá
    setTotalPrice(updatedTotalPrice);

    console.log("Ghế đã chọn nè :", seat);
  };

  const formattedDate = new Date(departureDate).toLocaleString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
        <Text>Đang tải ghế...</Text>
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
          <Text style={styles.header}>Ngày đi</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>

      <ScrollView>
        {/* Hiển thị ghế tầng 1 (lower) */}
        <Text style={styles.tierHeader}>Tầng 1 (Lower)</Text>
        <View style={styles.row}>
          {seats.lower.map((seat) => (
            <TouchableOpacity
              key={seat._id}
              style={[
                styles.seat,
                !seat.isAvailable
                  ? styles.sold // Ghế đã bán
                  : selectedSeats.includes(seat._id)
                  ? styles.selected // Ghế đang chọn
                  : styles.available, // Ghế còn trống
              ]}
              onPress={() => handleSeatSelect(seat)}
              disabled={!seat.isAvailable}
            >
              <Text style={styles.seatText}>{seat.seatNumber}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hiển thị ghế tầng 2 (upper) */}
        <Text style={styles.tierHeader}>Tầng 2 (Upper)</Text>
        <View style={styles.row}>
          {seats.upper.map((seat) => (
            <TouchableOpacity
              key={seat._id}
              style={[
                styles.seat,
                !seat.isAvailable
                  ? styles.sold // Ghế đã bán
                  : selectedSeats.includes(seat._id)
                  ? styles.selected // Ghế đang chọn
                  : styles.available, // Ghế còn trống
              ]}
              onPress={() => handleSeatSelect(seat)}
              disabled={!seat.isAvailable}
            >
              <Text style={styles.seatText}>{seat.seatNumber}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.statusSold}>Đã bán</Text>
        <Text style={styles.statusAvailable}>Còn trống</Text>
        <Text style={styles.statusSelected}>Đang chọn</Text>
      </View>

      {/* Hiển thị danh sách ghế đã chọn */}
      <Text style={styles.selectedSeatsContainer}>Ghế đã chọn:</Text>
      <ScrollView>
        <View style={styles.selectedSeatsContainer}>
          {selectedSeats.map((seatId) => {
            // Tìm ghế tương ứng với ID trong selectedSeats
            const seat = [...seats.lower, ...seats.upper].find(
              (s) => s._id === seatId // Sử dụng _id để so sánh
            );
            // In ra thông tin ghế để kiểm tra
            console.log("Thông tin ghế đã chọn:", seat);
            if (seat) {
              return (
                <View key={seatId} style={styles.selectedSeatItem}>
                  <Text>Số ghế: {seat.seatNumber}</Text>
                  <Text>Giá: {seat.price} VNĐ</Text>
                  <Text>Hàng: {seat.seatRow}</Text>
                  <Text>Tầng: {seat.floor}</Text>
                </View>
              );
            }

            // Nếu ghế không tồn tại, không hiển thị gì
            return null;
          })}
          {/* Hiển thị tổng giá tiền */}
        </View>
      </ScrollView>
      <View style={styles.selectedSeatsContainer}>
        <Text style={styles.totalPrice}>Tổng giá: {totalPrice} VNĐ</Text>
      </View>

      <View style={styles.buttonFooter}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SeatSelection;
