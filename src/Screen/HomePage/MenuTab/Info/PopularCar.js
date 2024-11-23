import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Dùng icon quay về (yêu cầu expo install @expo/vector-icons)
import RouteCard from "../../Tabbotom/RouteCard";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import config from "../../../../../config";

const { width } = Dimensions.get("window");

const PopularCar = () => {
  const navigation = useNavigation();

  const routes = [
    {
      image:
        "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/5/img_hero.png?v1",
      title: "Thành Phố Hồ Chí Minh - Đà Lạt",
      price: "Từ 200.000đ",
      from: "Thành Phố Hồ Chí Minh",
      to: "Đà Lạt",
    },
    {
      image:
        "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/24/img_hero.png",
      title: "Đồng Nai - Đà Lạt",
      price: "Từ 100.000đ",
      from: "Đồng Nai",
      to: "Đà Lạt",
    },
    {
      image:
        "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/3/img_hero.png",
      title: "Hà Nội - Đà Lạt",
      price: "Từ 200.000đ",
      from: "Hà Nội",
      to: "Đà Lạt",
    },
    {
      image:
        "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/22/img_hero.png",
      title: "Đồng Nai - Thành Phố Hồ Chí Minh",
      price: "Từ 80.000đ",
      from: "Đồng Nai",
      to: "Thành Phố Hồ Chí Minh",
    },
    {
      image:
        "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/25/img_hero.png",
      title: "Đồng Nai - Hà Nội",
      price: "Từ 700.000đ",
      from: "Đồng Nai",
      to: "Hà Nội",
    },
  ];

  const handleRouteSelect = async (from, to) => {
    try {
      const response = await axios.get($`{config.BASE_URL}/trips/search`, {
        params: {
          departureLocation: from,
          arrivalLocation: to,
          departureDate: new Date().toISOString().split("T")[0],
        },
      });
      if (
        response.data.success &&
        response.data.data.departureTrips.length > 0
      ) {
        navigation.navigate("SearchResultsPage", {
          trips: response.data.data.departureTrips,
          departureLocation: from,
          arrivalLocation: to,
          departureDate: new Date().toISOString().split("T")[0],
        });
      } else {
        Alert.alert("Thông báo", "Hiện tại không có chuyến đi nào phù hợp.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert("Thông báo", "Không tìm thấy chuyến đi nào.");
      } else {
        Alert.alert("Error", "Failed to search for trips. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút Quay Về */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#444" />
        </TouchableOpacity>
        <Text style={styles.header}>Tuyến đường phổ biến</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          {routes.map((route, index) => (
            <RouteCard
              key={index}
              image={route.image}
              title={route.title}
              price={route.price}
              from={route.from}
              to={route.to}
              onCardPress={() => handleRouteSelect(route.from, route.to)}
              style={styles.card}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PopularCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    paddingTop: 40, // Để khoảng trống cho nút quay về
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#444",
    textAlign: "center",
    marginBottom: 15,
    paddingTop: 6,
    marginLeft: 25,
  },
  cardContainer: {
    flexDirection: "row", // Để các thẻ sắp xếp theo hàng
    flexWrap: "wrap", // Cho phép thẻ tự động xuống dòng
    justifyContent: "center", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  card: {
    width: width * 0.44, // Hai thẻ trên mỗi hàng
    marginBottom: 15, // Khoảng cách giữa các thẻ
    borderRadius: 10, // Bo góc thẻ
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    alignItems: "center", // Đảm bảo nội dung thẻ cũng được căn giữa
  },
});