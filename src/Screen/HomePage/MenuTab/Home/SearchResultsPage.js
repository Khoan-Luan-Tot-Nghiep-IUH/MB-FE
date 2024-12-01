import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "../../../../theme/HomePage/MenutabStyle/Home/SearchResultsPage";
import { Image } from "react-native";

const SearchResultsPage = ({ route, navigation }) => {
  if (!route || !route.params || !route.params.trips) {
    console.error("Route params or trips data is missing");
    return (
      <View style={styles.container}>
        <Text style={styles.noTripsText}>Không có dữ liệu chuyến đi.</Text>
      </View>
    );
  }
  const {
    trips,
    departureLocation,
    arrivalLocation,
    departureDate,
    pickupPoints,
  } = route.params;
  console.log("Pickup Points:", pickupPoints);
  if (!Array.isArray(trips)) {
    console.error("Trips is undefined or not an array");
    return (
      <View style={styles.container}>
        <Text style={styles.noTripsText}>Không có dữ liệu chuyến đi.</Text>
      </View>
    );
  }

  const [filteredTrips, setFilteredTrips] = useState(trips);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [departureTimeRange, setDepartureTimeRange] = useState({
    min: "0",
    max: "23",
  });
  const [busTypeFilter, setBusTypeFilter] = useState("Tất cả");
  const [roundTripFilter, setRoundTripFilter] = useState("Tất cả"); // New filter state
  const [isLoading, setIsLoading] = useState(false);
  const applyFilters = () => {
    let filtered = trips.filter((trip) => {
      let isMatching = true;
      if (priceRange.min !== 0 || priceRange.max !== 1000000) {
        isMatching =
          isMatching &&
          trip.basePrice >= priceRange.min &&
          trip.basePrice <= priceRange.max;
      }
      if (departureTimeRange.min !== "0" || departureTimeRange.max !== "23") {
        const departureHour = new Date(trip.departureTime).getHours();
        isMatching =
          isMatching &&
          departureHour >= parseInt(departureTimeRange.min) &&
          departureHour <= parseInt(departureTimeRange.max);
      }
      if (busTypeFilter !== "Tất cả") {
        isMatching =
          isMatching && trip.busType && trip.busType.name === busTypeFilter; // Check busType exists
      }
      if (roundTripFilter !== "Tất cả") {
        isMatching =
          isMatching && trip.isRoundTrip === (roundTripFilter === "Có khứ hồi");
      }
      return isMatching;
    });
    setFilteredTrips(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [priceRange, departureTimeRange, busTypeFilter, roundTripFilter]); // Include roundTripFilter

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.tripInfoContainer}>
          <Text style={styles.tripInfo1}>
            <FontAwesome5 name="map-signs" size={20} color="#ffffff" />{" "}
            {`TP. ${departureLocation} → ${arrivalLocation}`}
          </Text>
          <Text style={styles.dateInfo}>
            <FontAwesome5 name="calendar-alt" size={16} color="#ffffff" />{" "}
            {departureDate}
          </Text>
        </View>
      </View>

      <View style={styles.header1}></View>
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>
              <FontAwesome5 name="dollar-sign" size={16} color="#333" /> Giá:
            </Text>
            <Picker
              selectedValue={JSON.stringify(priceRange)}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setPriceRange(JSON.parse(itemValue))
              }
            >
              <Picker.Item
                label="Chọn khoảng giá"
                value={JSON.stringify({ min: 0, max: 1000000 })}
              />
              <Picker.Item
                label="Dưới 100k"
                value={JSON.stringify({ min: 0, max: 100000 })}
              />
              <Picker.Item
                label="100k - 300k"
                value={JSON.stringify({ min: 100000, max: 300000 })}
              />
              <Picker.Item
                label="300k - 500k"
                value={JSON.stringify({ min: 300000, max: 500000 })}
              />
              <Picker.Item
                label="Trên 500k"
                value={JSON.stringify({ min: 500000, max: 10000000 })}
              />
            </Picker>
          </View>
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>
              <FontAwesome5 name="bus" size={16} color="#333" /> Loại Xe:
            </Text>
            <Picker
              selectedValue={busTypeFilter}
              style={styles.picker}
              onValueChange={(itemValue) => setBusTypeFilter(itemValue)}
            >
              <Picker.Item label="Tất cả" value="Tất cả" />
              <Picker.Item label="Limousine" value="Limousine" />
              <Picker.Item label="Ghế" value="Lamborghini" />
            </Picker>
          </View>
        </View>

        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>Khứ hồi:</Text>
            <Picker
              selectedValue={roundTripFilter}
              style={styles.picker}
              onValueChange={(itemValue) => setRoundTripFilter(itemValue)}
            >
              <Picker.Item label="Tất cả" value="Tất cả" />
              <Picker.Item label="Có khứ hồi" value="Có khứ hồi" />
              <Picker.Item label="Không có khứ hồi" value="Không có khứ hồi" />
            </Picker>
          </View>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" color="blue" />
      ) : filteredTrips.length > 0 ? (
        <ScrollView>
          {filteredTrips.map((trip, index) => {
            const { date: departureDate, time: departureTime } = formatDate(
              trip.departureTime
            );
            const { date: arrivalDate, time: arrivalTime } = formatDate(
              trip.arrivalTime
            );
            return (
              <TouchableOpacity
                key={index}
                style={styles.tripCard}
                onPress={() =>
                  navigation.navigate("DetailsTicket", { trip, pickupPoints })
                }
              >
                <View style={styles.tripInfo}>
                  <Text style={styles.tripTime}>
                    <FontAwesome5 name="clock" size={16} color="blue" />{" "}
                    {departureTime}
                  </Text>
                  <Text style={styles.arrow}>→</Text>
                  <Text style={styles.tripTime}>
                    <FontAwesome5 name="clock" size={16} color="red" />{" "}
                    {arrivalTime}
                  </Text>
                </View>
                <Text style={styles.tripPrice}>
                  <FontAwesome5
                    name="money-bill-wave"
                    size={16}
                    color="green"
                  />{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(trip.basePrice)}
                </Text>
                <Text style={styles.busType}>
                  <FontAwesome5 name="bus-alt" size={16} color="gray" />{" "}
                  {trip.busType?.name || "Không xác định"}
                </Text>
                <Text style={styles.seatStatus}>
                  <FontAwesome5 name="chair" size={16} color="brown" /> Còn{" "}
                  {trip.availableSeats} chỗ
                </Text>
                <Text style={styles.seatStatus1}>
                  <FontAwesome5 name="building" size={16} color="#333" />
                  {trip.companyId?.name}
                </Text>
                <View style={styles.tripLocation}>
                  <FontAwesome5 name="map-marker-alt" size={16} color="green" />
                  <Text style={styles.tripLocationText}>
                    {trip.departureLocation.name} → {trip.arrivalLocation.name}
                  </Text>
                </View>
                {trip.isRoundTrip && (
                  <Text style={{ marginVertical: 8 }}>
                    <FontAwesome5 name="exchange-alt" size={16} color="blue" />{" "}
                    Có khứ hồi
                  </Text>
                )}
                {trip.busType?.images?.length > 0 ? (
                  <Image
                    source={{ uri: trip.busType?.images?.[0] }}
                    style={{
                      width: 190,
                      height: 120,
                      borderRadius: 10,
                      marginTop: 8,
                    }}
                  />
                ) : (
                  <View>
                    <FontAwesome5 name="image" size={50} color="#ccc" />
                    <Text style={{ color: "#888", marginTop: 8 }}>
                      Không có hình ảnh
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.noTripsContainer}>
          <Text style={styles.noTripsText}>
            Không có chuyến đi nào phù hợp.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchResultsPage;
