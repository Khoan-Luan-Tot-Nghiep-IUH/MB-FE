import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../../../theme/HomePage/Tabottom/LookupStyle"; // Đường dẫn tới file style
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Lookup = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tra cứu</Text>
      </View>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <FontAwesome
              name={item.icon}
              size={24}
              color="#FF9000"
              style={styles.icon}
            />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};
const menuItems = [
  { title: "Quy chế hoạt động ", icon: "book", screen: "ActivityRules" },
  { title: "Tư vấn gửi hàng", icon: "phone", screen: "ShippingConsult" },
  { title: "Gửi hàng", icon: "cube", screen: "SendPackage" },
  { title: "Tra cứu đơn hàng", icon: "search", screen: "TrackOrder" },
];
export default Lookup;
