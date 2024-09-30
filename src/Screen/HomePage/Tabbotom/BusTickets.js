import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styles from "../../../theme/HomePage/Tabottom/BusTicketsStyle";
import { FontAwesome } from "@expo/vector-icons";
import CurrentTrips from "../MenuTab/TicketCar/CurrentTrips";
import CompletedTrips from "../MenuTab/TicketCar/CompletedTrips";
import CancelledTrips from "../MenuTab/TicketCar/CancelledTrips";
const BusTickets = () => {
  const [activeTab, setActiveTab] = useState("Hiện tại");
  const renderActiveTabComponent = () => {
    switch (activeTab) {
      case "Hiện tại":
        return <CurrentTrips />;
      case "Đã đi":
        return <CompletedTrips />;
      case "Đã hủy":
        return <CancelledTrips />;
      default:
        return null;
    }
  };
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
      {/* Render the component based on the active tab */}
      <View style={{ flex: 1 }}>{renderActiveTabComponent()}</View>
      <View style={styles.content}>
        <FontAwesome name="code-fork" size={50} color="#4A90E2" />
        <Text style={styles.messageText}>
          Bạn chưa có hành trình nào sắp tới
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default BusTickets;
