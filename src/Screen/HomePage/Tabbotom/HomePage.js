import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../../../theme/HomePage/Tabottom/HomePageStyle";
import { ImageBackground } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Select from "../ModalPage/Select"; // Ensure the Select component is imported

const HomePage = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [departure, setDeparture] = useState(""); // State for "Departure"
  const [destination, setDestination] = useState(""); // State for "Destination"
  const [showSelectModal, setShowSelectModal] = useState(false); // State for modal visibility
  const [selectType, setSelectType] = useState("departure"); // To differentiate between departure and destination selection

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const swapPlaces = () => {
    const temp = departure;
    setDeparture(destination);
    setDestination(temp);
  };
  return (
    <SafeAreaView style={styles.container1}>
      <View>
        <ImageBackground
          source={{
            uri: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-lap-top-cute-10.jpg",
          }}
          style={styles.headerBackground}
          resizeMode="contains"
        >
          <View style={styles.headerContainer}>
            <Text style={styles.greeting}>Xin chào</Text>
            <Text style={styles.subGreeting}>
              Bạn đã sẵn sàng cho chuyến hành trình của riêng mình?
            </Text>
          </View>
        </ImageBackground>
        {/* Inputs */}
        <View style={styles.view}>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nơi đi"
                placeholderTextColor="#666"
                value={departure} // Set value from state
                editable={false} // Make it non-editable
              />
              <TouchableOpacity
                onPress={() => {
                  setSelectType("departure");
                  setShowSelectModal(true);
                }}
              >
                <FontAwesome
                  name="arrow-down"
                  size={25}
                  color="red"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            {/* Input for "Destination" */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nơi đến"
                placeholderTextColor="#666"
                value={destination} // Set value from state
                editable={false} // Make it non-editable
              />
              <TouchableOpacity
                onPress={() => {
                  setSelectType("destination");
                  setShowSelectModal(true);
                }}
              >
                <FontAwesome
                  name="arrow-up"
                  size={25}
                  color="red"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            {/* Input for "Departure Date" */}
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setShowPicker(true)}
            >
              <TextInput
                style={styles.input}
                placeholder="Ngày khởi hành"
                placeholderTextColor="#666"
                value={date.toLocaleDateString()}
                editable={false}
              />
              <FontAwesome
                name="calendar"
                size={25}
                color="red"
                style={styles.icon}
              />
            </TouchableOpacity>
            {/* Show DateTimePicker */}
            {showPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
          <View>
            {/* Search Button */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Tìm chuyến đi</Text>
            </TouchableOpacity>
          </View>
          {/* News Section */}
          <View style={styles.newsContainer}>
            <Text style={styles.newsTitle}>Tin tức</Text>
            <View style={styles.newsItem}>
              <Image
                source={{ uri: "https://example.com/news_image.jpg" }}
                style={styles.newsImage}
              />
              <Text style={styles.newsText}>Thông Báo Mở Bán Vé</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
