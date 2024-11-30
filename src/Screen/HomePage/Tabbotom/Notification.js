import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import config from "../../../../config";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.user?.userInfo?.token);
  const navigation = useNavigation();

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL}/global-notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };
  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${config.BASE_URL}/global-notifications/${id}/checked`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the UI after marking as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id
            ? { ...notification, isChecked: true }
            : notification
        )
      );
      // Navigate to the Home screen
      navigation.navigate("Home");
    } catch (error) {
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  // Render each notification
  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationContainer,
        item.isChecked ? styles.read : styles.unread,
      ]}
      onPress={() => markAsRead(item._id)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  if (notifications.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Không có thông báo </Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 17 }}></View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  notificationContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: "#ff0000",
  },
  read: {
    borderLeftWidth: 4,
    borderLeftColor: "#00ff00",
  },
});

export default Notification;
