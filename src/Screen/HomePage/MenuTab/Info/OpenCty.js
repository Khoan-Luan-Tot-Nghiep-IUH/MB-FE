import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import {
  TextInput,
  Button,
  Snackbar,
  ActivityIndicator,
  Text,
} from "react-native-paper";
import { Formik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../../../config";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
const OpenCty = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userRequests, setUserRequests] = useState([]);
  const token = useSelector((state) => state.user.userInfo.token);
  const [tripRequests, setTripRequests] = useState([]);
  const navigation = useNavigation();
  // Fetch user requests
  const fetchUserRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.BASE_URL}/user/companies/request`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (response.data.success) {
        setUserRequests(response.data.data); // Set the fetched requests to state
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Thông báo", "Bạn chưa gửi bất cứ yêu cầu nào ");
    }
  };

  // Cancel user request
  const handleCancelRequest = async (requestId) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${config.BASE_URL}/user/companies/cancel`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
          data: { requestId },
        }
      );
      setLoading(false);
      if (response.data.success) {
        Alert.alert("Success", response.data.message);
        fetchUserRequests(); // Refresh the list after successful cancellation
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong!"
      );
    }
  };

  useEffect(() => {
    fetchUserRequests(); // Fetch the user's company requests when the component mounts
  }, []);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.BASE_URL}/user/companies/request`,
        values,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (response.data.success) {
        Alert.alert("Success", response.data.message, [
          { text: "OK", onPress: () => setModalVisible(false) },
        ]);
        fetchUserRequests(); // Refresh the list after submission
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "lỗi",
        error.response?.data?.message || "Something went wrong!"
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ height: 20 }}></View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // navigation.goBack() để quay về màn trước
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#007bff" />
        <Text style={styles.backText}>Quay về</Text>
      </TouchableOpacity>
      <Button
        mode="contained"
        onPress={() => setModalVisible(true)}
        style={styles.openButton}
      >
        Open Create Company Form
      </Button>
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.formContainer}>
              <Formik
                initialValues={{
                  name: "",
                  address: "",
                  contactInfo: "",
                  phoneNumber: "",
                  email: "",
                  website: "",
                }}
                onSubmit={(values) => handleFormSubmit(values)}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                    <Text style={styles.header}>Create Company Request</Text>

                    <TextInput
                      label="Company Name"
                      mode="outlined"
                      style={styles.input}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                    />
                    <TextInput
                      label="Address"
                      mode="outlined"
                      style={styles.input}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                    />
                    <TextInput
                      label="Contact Info"
                      mode="outlined"
                      style={styles.input}
                      onChangeText={handleChange("contactInfo")}
                      onBlur={handleBlur("contactInfo")}
                      value={values.contactInfo}
                    />
                    <TextInput
                      label="Phone Number"
                      mode="outlined"
                      style={styles.input}
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                      keyboardType="phone-pad"
                      value={values.phoneNumber}
                    />
                    <TextInput
                      label="Email"
                      mode="outlined"
                      style={styles.input}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      keyboardType="email-address"
                      value={values.email}
                    />
                    <TextInput
                      label="Website"
                      mode="outlined"
                      style={styles.input}
                      onChangeText={handleChange("website")}
                      onBlur={handleBlur("website")}
                      value={values.website}
                    />

                    <Button
                      mode="contained"
                      onPress={handleSubmit}
                      style={styles.button}
                      disabled={loading}
                    >
                      {loading ? <ActivityIndicator size="small" /> : "Submit"}
                    </Button>
                    <Button
                      mode="text"
                      onPress={() => setModalVisible(false)}
                      style={styles.closeButton}
                    >
                      Close
                    </Button>
                  </View>
                )}
              </Formik>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Request List */}
      <FlatList
        data={userRequests}
        renderItem={({ item }) => (
          <View style={styles.companyItem}>
            <Text style={styles.companyTitle}>Tên Công Ty: {item.name}</Text>

            {/* Address with icon */}
            <View style={styles.textRow}>
              <MaterialCommunityIcons
                name="home-city"
                size={20}
                color="#007bff"
                style={styles.icon}
              />
              <Text>Địa chỉ: {item.address}</Text>
            </View>
            {/* Phone number with icon */}
            <View style={styles.textRow}>
              <MaterialCommunityIcons
                name="phone"
                size={20}
                color="#007bff"
                style={styles.icon}
              />
              <Text>Số điện thoại: {item.phoneNumber}</Text>
            </View>

            {/* Email with icon */}
            <View style={styles.textRow}>
              <MaterialCommunityIcons
                name="email"
                size={20}
                color="#007bff"
                style={styles.icon}
              />
              <Text>Email: {item.email}</Text>
            </View>

            {/* Website with icon */}
            <View style={styles.textRow}>
              <MaterialCommunityIcons
                name="web"
                size={20}
                color="#007bff"
                style={styles.icon}
              />
              <Text>Website: {item.website}</Text>
            </View>

            <Button
              mode="contained"
              onPress={() => handleCancelRequest(item._id)}
              style={styles.cancelButton}
            >
              Cancel Request
            </Button>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />

      {/* Loading Spinner */}
      {loading && <ActivityIndicator animating={true} size="large" />}

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Request submitted successfully!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Background color
    padding: 16,
  },
  openButton: {
    backgroundColor: "#4CAF50",
    marginBottom: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    padding: 20,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  companyItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
    flexDirection: "column", // Vertical layout for items
    borderWidth: 1,
    borderColor: "#ddd",
  },
  companyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  textLabel: {
    fontWeight: "bold",
    marginRight: 6,
  },
  cancelButton: {
    backgroundColor: "#E57373",
    marginTop: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  icon: {
    marginRight: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 20,
  },
  backText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#007bff",
  },
});

export default OpenCty;
