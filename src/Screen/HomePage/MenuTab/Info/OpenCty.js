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

const OpenCty = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userRequests, setUserRequests] = useState([]);
  const token = useSelector((state) => state.user.userInfo.token);
  const [tripRequests, setTripRequests] = useState([]);

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
      Alert.alert("lỗi", error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Button to open the modal */}
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
            <Text style={styles.companyTitle}>{item.name}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  openButton: {
    marginBottom: 20,
    backgroundColor: "#007BFF",
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 10,
  },
  formContainer: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#28a745",
  },
  closeButton: {
    marginTop: 10,
    color: "#007bff",
  },
  companyItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    width: "100%",
    marginHorizontal: 20,
  },
  companyTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
  },
});

export default OpenCty;
