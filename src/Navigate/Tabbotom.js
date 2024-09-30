import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";

// Import các màn hình
import Home from "../Screen/HomePage/Tabbotom/HomePage";
import BusTickets from "../Screen/HomePage/Tabbotom/BusTickets";
import Notification from "../Screen/HomePage/Tabbotom/Notification";
import Lookup from "../Screen/HomePage/Tabbotom/Lookup";
import Profile from "../Screen/HomePage/Tabbotom/Profile";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Cấu hình tên icon dựa trên route
          if (route.name === "Trang chủ") iconName = "home";
          else if (route.name === "Vé xe") iconName = "bus";
          else if (route.name === "Tra cứu")
            iconName = "search";
          else if (route.name === "Thông báo") iconName = "notifications";
          else if (route.name === "Thông tin") iconName = "person";

          // Trả về icon
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#D3D3D3",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 5,
          backgroundColor: "#007BFF",
          borderTopWidth: 0,
          height: 60,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          fontWeight: "700",
        },
        tabBarItemStyle: {
          padding: 5,
        },
        headerShown: false, // Đặt headerShown ở đây
      })}
    >
      <Tab.Screen name="Trang chủ" component={Home} />
      <Tab.Screen name="Vé xe" component={BusTickets} />
      <Tab.Screen name="Tra cứu" component={Lookup} />
      <Tab.Screen name="Thông báo" component={Notification} />
      <Tab.Screen name="Thông tin" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 0,
    height: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});

export default TabNavigator;

