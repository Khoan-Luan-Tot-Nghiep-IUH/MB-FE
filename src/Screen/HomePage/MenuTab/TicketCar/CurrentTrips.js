import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import styles from "../../../../theme/HomePage/MenutabStyle/TicketCar/CompletedTrips";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import config from "../../../../../config";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const CurrentTrips = ({ trips, fetchBookingHistory }) => {
  const token = useSelector((state) => state.user?.userInfo?.token);
  const [localTrips, setLocalTrips] = useState(trips);

  // Tải lại dữ liệu định kỳ mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/booking-history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allBookings = response.data.data || [];
        const scheduledTrips = allBookings.filter(
          (booking) =>
            booking.trip?.status === "Scheduled" &&
            booking.status !== "Cancelled" &&
            booking.trip !== null
        );

        // So sánh dữ liệu mới với dữ liệu cũ trước khi cập nhật
        if (JSON.stringify(scheduledTrips) !== JSON.stringify(localTrips)) {
          setLocalTrips(scheduledTrips);
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật dữ liệu:", error.message);
      }
    }, 5000); // Cập nhật mỗi 5 giây

    return () => clearInterval(interval); // Xóa interval khi component bị unmount
  }, [localTrips, token]);

  // Cập nhật localTrips khi props.trips thay đổi
  useEffect(() => {
    setLocalTrips(trips);
  }, [trips]);

  const handleCancelTrip = async (bookingId) => {
    Alert.alert(
      "Xác nhận hủy vé",
      "Bạn có chắc chắn muốn hủy vé chuyến đi này không?",
      [
        { text: "Không", style: "cancel" },
        {
          text: "Có",
          onPress: async () => {
            try {
              console.log("Hủy vé với ID:", bookingId);

              setLocalTrips((prev) =>
                prev.filter((booking) => booking._id !== bookingId)
              );

              await axios.delete(`${config.BASE_URL}/bookings/${bookingId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              Alert.alert("Thành công", "Vé đã được hủy thành công!");
              await fetchBookingHistory();
            } catch (error) {
              console.error("Lỗi khi hủy booking:", error.message);
              Alert.alert(
                "Thất bại",
                error.response?.data?.message ||
                  "Không thể hủy vé. Vui lòng thử lại sau."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={localTrips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          if (!item.trip) {
            return (
              <View style={styles.tripItemError}>
                <Text style={styles.errorText}>
                  <MaterialIcons name="error" size={20} color="#FF6347" /> Chi
                  tiết chuyến đi không khả dụng.
                </Text>
              </View>
            );
          }

          const { departureLocation, arrivalLocation, departureTime, busType } =
            item.trip;
          const departureDate = new Date(departureTime);
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
              <View style={styles.tripHeader}>
                <Text style={styles.location}>
                  <FontAwesome name="map-marker" size={16} color="#ff6347" />{" "}
                  {departureLocation.name}
                </Text>
                <MaterialIcons name="arrow-forward" size={16} color="#333" />
                <Text style={styles.location}>
                  <FontAwesome name="map-marker" size={16} color="#4A90E2" />{" "}
                  {arrivalLocation.name}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.infoText}>
                  <FontAwesome name="calendar" size={14} color="#4A90E2" /> Thời
                  gian: {formattedDate}
                </Text>
                <Text style={styles.infoText}>
                  <FontAwesome name="bus" size={14} color="#10B981" /> Loại xe:{" "}
                  {busType.name}
                </Text>
                <Text style={styles.infoText}>
                  <FontAwesome name="dollar" size={14} color="#FF6347" /> Giá:{" "}
                  {item.totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
                <Text style={styles.infoText}>
                  <MaterialIcons name="event-seat" size={14} color="#FFD700" />{" "}
                  Số Ghế: {item.seatNumbers.join(", ")}
                </Text>
                <Text style={styles.infoText}>
                  <FontAwesome name="credit-card" size={14} color="#4A90E2" />{" "}
                  Thanh toán: {item.paymentMethod}
                </Text>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancelTrip(item._id)}
                >
                  <Text style={styles.cancelButtonText}>
                    <MaterialIcons name="cancel" size={16} color="#fff" /> Hủy
                    vé
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 12 }}></View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              <FontAwesome name="info-circle" size={20} color="#4A90E2" /> Bạn
              chưa có chuyến đi nào hiện tại.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default CurrentTrips;
