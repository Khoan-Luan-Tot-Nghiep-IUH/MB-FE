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
  const token = useSelector((state) => state.user.userInfo.token);

  // Fetch booking history from API
  const fetchBookingHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.BASE_URL}/booking-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allBookings = response.data.data;

      // Filter and categorize bookings by their actual statuses and presence of trip data
      const scheduledTrips = allBookings.filter(
        (booking) =>
          (booking.status === "schedule" ||
            booking.trip?.status === "Scheduled") &&
          booking.trip !== null
      );
      const completedTrips = allBookings.filter(
        (booking) =>
          (booking.status === "completed" ||
            booking.trip?.status === "Completed") &&
          booking.trip !== null
      );
      const cancelledTrips = allBookings.filter(
        (booking) =>
          (booking.status === "cancelled" || booking.status === "Confirmed") &&
          booking.trip !== null
      );

      setBookings({
        schedule: scheduledTrips,
        completed: completedTrips,
        cancelled: cancelledTrips,
      });
      setError(null); // Reset error if data is successfully fetched
    } catch (err) {
      console.error("Error fetching booking history:", err);
      setError("Lỗi khi tải dữ liệu lịch sử đặt vé");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookingHistory(); 
  }, []); 

  const renderActiveTabComponent = () => {
    switch (activeTab) {
      case "Hiện tại":
        return <CurrentTrips trips={bookings.schedule} />;
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
        <ActivityIndicator size="large" color="#4A90E2" />
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
      <View style={{ flex: 1 }}>{renderActiveTabComponent()}</View>
      {bookings.schedule.length === 0 && activeTab === "Hiện tại" && (
        <View style={styles.content}>
          <FontAwesome name="code-fork" size={50} color="#4A90E2" />
          <Text style={styles.messageText}>
            Bạn chưa có hành trình nào sắp tới
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BusTickets;
