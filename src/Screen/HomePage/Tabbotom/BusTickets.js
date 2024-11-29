import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../../../theme/HomePage/Tabottom/BusTicketsStyle";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import config from "../../../../config";
import CurrentTrips from "../MenuTab/TicketCar/CurrentTrips";
import CompletedTrips from "../MenuTab/TicketCar/CompletedTrips";
import CancelledTrips from "../MenuTab/TicketCar/CancelledTrips";
import { useSelector } from "react-redux";

const BusTickets = () => {
  const [activeTab, setActiveTab] = useState("Hiện tại");
  const [bookings, setBookings] = useState({
    schedule: [],
    completed: [],
    cancelled: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user?.userInfo?.token);
  

  // Fetch booking history from API
  const fetchBookingHistory = async () => {
    if (!token) {
      setLoading(false); // Không tải nếu chưa đăng nhập
      return;
    }
    setLoading(true); // Bắt đầu hiển thị loading
    try {
      const response = await axios.get(`${config.BASE_URL}/booking-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allBookings = response.data.data || [];
      console.log("Lịch sử đặt vé:", allBookings);
      console.log("dữ liệu:", response.data);

      const scheduledTrips = allBookings.filter(
        (booking) =>
          booking.trip?.status === "Scheduled" &&
          booking.status !== "Cancelled" &&
          booking.trip !== null
      );
      const completedTrips = allBookings.filter(
        (booking) =>
          booking.trip?.status === "Completed" && booking.trip !== null
      );
      const cancelledTrips = allBookings.filter(
        (booking) => booking.status === "Cancelled" && booking.trip !== null
      );

      setBookings({
        schedule: scheduledTrips,
        completed: completedTrips,
        cancelled: cancelledTrips,
      });
      setError(null); // Xóa lỗi nếu có dữ liệu
    } catch (err) {
      console.error("Lỗi khi gọi API booking-history:", err.message);
      setError("Không thể lấy lịch sử đặt vé. Vui lòng thử lại sau.");
    } finally {
      setLoading(false); // Dừng loading
    }
  };
  useEffect(() => {
    fetchBookingHistory();
  }, [activeTab]);

  const renderActiveTabComponent = () => {
    switch (activeTab) {
      case "Hiện tại":
        return (
          <CurrentTrips
            trips={bookings.schedule}
            fetchBookingHistory={fetchBookingHistory}
          />
        );
      case "Đã đi":
        return <CompletedTrips trips={bookings.completed} />;
      case "Đã hủy":
        return <CancelledTrips trips={bookings.cancelled} />;
      default:
        return null;
    }
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#4A90E2" />
        <Text>Đang tải dữ liệu...</Text>
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chuyến của tôi</Text>
      </View>
      <View style={styles.tabsContainer}>
        {["Hiện tại", "Đã đi", "Đã hủy"].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabItem, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        {token ? (
          renderActiveTabComponent()
        ) : (
          <View style={styles.content}>
            <Text style={styles.messageText}>
              Vui lòng đăng nhập để xem dữ liệu chuyến đi của bạn.
            </Text>
          </View>
        )}
      </View>
      {bookings.schedule.length === 0 && activeTab === "Hiện tại" && token && (
        <View style={styles.content}>
          <Text style={styles.messageText}>
            Bạn chưa có hành trình nào sắp tới
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BusTickets;
