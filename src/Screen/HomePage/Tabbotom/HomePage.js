import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert, // Import Alert for user feedback
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../../../theme/HomePage/Tabottom/HomePageStyle";
import DateTimePicker from "@react-native-community/datetimepicker";
import config from "../../../../config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import RouteCard from "./RouteCard";

const HomePage = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectType, setSelectType] = useState("departure");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await getLocation();
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        Alert.alert("Error", "Failed to load locations. Please try again."); // User feedback
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const getLocation = async () => {
    const response = await fetch(`${config.BASE_URL}/locations`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  };

  const handleSelectLocation = (location) => {
    if (selectType === "departure") {
      setDeparture(location);
    } else {
      setDestination(location);
    }
    setShowSelectModal(false);
  };

  const searchTrips = async () => {
    if (!departure || !destination) {
      Alert.alert("Warning", "Please select both departure and destination!");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${config.BASE_URL}/trips/search`, {
        params: {
          departureLocation: departure,
          arrivalLocation: destination,
          departureDate: date.toISOString().split("T")[0],
        },
      });
      if (
        response.data.success &&
        response.data.data.departureTrips.length > 0
      ) {
        navigation.navigate("SearchResultsPage", {
          trips: response.data.data.departureTrips,
          departureLocation: departure,
          arrivalLocation: destination,
          pickupPoints: response.data.data.departureTrips[0].pickupPoints,
          departureDate: date.toISOString().split("T")[0],
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
      // console.error("Error searching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRouteSelect = async (from, to) => {
    try {
      const response = await axios.get(`${config.BASE_URL}/trips/search`, {
        params: {
          departureLocation: from,
          arrivalLocation: to,

          departureDate: date.toISOString().split("T")[0],
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
          pickupPoints: response.data.data.departureTrips[0].pickupPoints,
          departureDate: date.toISOString().split("T")[0],
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
      // console.error("Error fetching trips:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container1}>
      <View>
        <View style={styles.header}></View>
        <ImageBackground
          source={{
            uri: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-lap-top-cute-10.jpg",
          }}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <View style={styles.headerContainer}>
            <Text style={styles.greeting}>Xin chào</Text>
            <Text style={styles.subGreeting}>
              Bạn đã sẵn sàng cho chuyến hành trình của riêng mình?
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.view}>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => {
              setSelectType("departure");
              setShowSelectModal(true);
            }}
          >
            <Text style={styles.input}>{departure || "Nơi đi"}</Text>
            <FontAwesome
              name="arrow-down"
              size={25}
              color="red"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => {
              setSelectType("destination");
              setShowSelectModal(true);
            }}
          >
            <Text style={styles.input}>{destination || "Nơi đến"}</Text>
            <FontAwesome
              name="arrow-up"
              size={25}
              color="red"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.input}>
              {date.toLocaleDateString() || "Ngày khởi hành"}
            </Text>
            <FontAwesome
              name="calendar"
              size={25}
              color="red"
              style={styles.icon}
            />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={searchTrips}>
            <Text style={styles.buttonText}>Tìm chuyến đi</Text>
          </TouchableOpacity>
          {loading && <ActivityIndicator color="blue" />}
          <Text style={styles.title}>Tuyến đường phổ biến</Text>
          <View style={styles.routesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {routes.map((route, index) => (
                <RouteCard
                  key={index}
                  image={route.image}
                  title={route.title}
                  price={route.price}
                  from={route.from}
                  to={route.to}
                  onCardPress={handleRouteSelect} // Ensure this is passed correctly
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
      <Modal visible={showSelectModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn địa điểm</Text>
            {locations.length > 0 ? (
              locations.map((location) => (
                <TouchableOpacity
                  key={location.id ? location.id : location.name}
                  onPress={() => handleSelectLocation(location.name)}
                  style={styles.modalOption}
                >
                  <Text style={styles.modalOptionText}>{location.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.modalOptionText}>Không có địa điểm nào</Text>
            )}
            <TouchableOpacity
              onPress={() => setShowSelectModal(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomePage;
