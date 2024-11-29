import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Formik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../../../config";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Icon library

const HelpCar = () => {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [busTypes, setBusTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [tripRequests, setTripRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const token = useSelector((state) => state.user?.userInfo?.token);
  const navigation = useNavigation();

  // Fetch locations, bus types, companies, trip requests
  useEffect(() => {
    getLocation();
    getAllCompanies();
    getUserTripRequests();
  }, []);

  const getLocation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.BASE_URL}/locations`);
      if (Array.isArray(response.data.data)) {
        setLocations(response.data.data);
      } else {
        Alert.alert("Error", "Dữ liệu địa điểm không hợp lệ.");
      }
    } catch (error) {
      Alert.alert("Error", "Không thể tải danh sách địa điểm.");
    } finally {
      setLoading(false);
    }
  };

  const getBusTypesByCompany = async (companyId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.BASE_URL}/user/bustypes/${companyId}`,
        { headers: { Authorization: `bearer ${token}` } }
      );
      if (response.data.success) {
        setBusTypes(response.data.data);
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      Alert.alert("Error", "Không thể tải danh sách loại xe.");
    } finally {
      setLoading(false);
    }
  };

  const getAllCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.BASE_URL}/user/companies/names`
      );
      if (response.data.success) {
        setCompanies(response.data.data);
      } else {
        Alert.alert("Error", "Failed to fetch companies.");
      }
    } catch (error) {
      Alert.alert("Error", "Không thể tải danh sách công ty.");
    } finally {
      setLoading(false);
    }
  };

  const getUserTripRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.BASE_URL}/user/trip-requests`,
        { headers: { Authorization: `bearer ${token}` } }
      );
      if (response.data.success) {
        setTripRequests(response.data.data);
      } else {
        Alert.alert("Error", "Không thể tải danh sách yêu cầu chuyến đi.");
      }
    } catch (error) {
      Alert.alert("Error", "Không thể tải danh sách yêu cầu chuyến đi.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.BASE_URL}/user/trip-request`,
        {
          departureLocation: values.departureLocation,
          arrivalLocation: values.arrivalLocation,
          preferredDepartureTime: values.preferredDepartureTime,
          message: values.message,
          busType: values.busType,
          companyId: values.companyId,
          seatNumbers: values.seatNumbers,
        },
        { headers: { Authorization: `bearer ${token}` } }
      );
      if (response.data.success) {
        Alert.alert("Success", response.data.message);
        getUserTripRequests(); // Refresh trip requests
        setIsModalVisible(false); // Close the modal after submitting
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
    <View style={{ marginBottom:15 }}></View>
      {/* Back Button at the top */}
      <View style={styles.viewcontainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          onPress={() => setIsModalVisible(true)}
          style={styles.openModalButton}
        >
          Open Form
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Open Modal Button */}

        {/* Modal with Form */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Formik
                initialValues={{
                  departureLocation: "",
                  arrivalLocation: "",
                  preferredDepartureTime: "",
                  message: "",
                  busType: "",
                  companyId: "",
                  seatNumbers: [],
                }}
                onSubmit={handleFormSubmit}
              >
                {({ values, handleChange, handleSubmit, setFieldValue }) => (
                  <>
                    {/* Departure Location */}
                    <View style={styles.inputContainer}>
                      <RNPickerSelect
                        placeholder={{
                          label: "Select Departure Location",
                          value: null,
                        }}
                        value={values.departureLocation}
                        onValueChange={(value) =>
                          setFieldValue("departureLocation", value)
                        }
                        items={locations.map((location) => ({
                          label: location.name,
                          value: location._id,
                        }))}
                      />
                    </View>

                    {/* Arrival Location */}
                    <View style={styles.inputContainer}>
                      <RNPickerSelect
                        placeholder={{
                          label: "Select Arrival Location",
                          value: null,
                        }}
                        value={values.arrivalLocation}
                        onValueChange={(value) =>
                          setFieldValue("arrivalLocation", value)
                        }
                        items={locations.map((location) => ({
                          label: location.name,
                          value: location._id,
                        }))}
                      />
                    </View>

                    {/* Company */}
                    <View style={styles.inputContainer}>
                      <RNPickerSelect
                        placeholder={{ label: "Select Company", value: null }}
                        value={values.companyId}
                        onValueChange={(companyId) => {
                          setFieldValue("companyId", companyId);
                          if (companyId) {
                            getBusTypesByCompany(companyId);
                          } else {
                            setBusTypes([]);
                            setFieldValue("busType", "");
                          }
                        }}
                        items={companies.map((company) => ({
                          label: company.name,
                          value: company.id,
                        }))}
                      />
                    </View>

                    {/* Bus Type */}
                    <View style={styles.inputContainer}>
                      <RNPickerSelect
                        placeholder={{ label: "Select Bus Type", value: null }}
                        value={values.busType}
                        onValueChange={(value) =>
                          setFieldValue("busType", value)
                        }
                        items={busTypes.map((busType) => ({
                          label: busType.name,
                          value: busType._id,
                        }))}
                        disabled={busTypes.length === 0}
                      />
                    </View>

                    {/* Preferred Departure Time */}
                    <TextInput
                      label="Preferred Departure Time"
                      value={values.preferredDepartureTime}
                      onChangeText={handleChange("preferredDepartureTime")}
                      placeholder="Enter preferred time"
                      style={styles.textInput}
                    />

                    {/* Seat Numbers */}
                    <TextInput
                      label="Seat Numbers"
                      value={values.seatNumbers.join(", ")}
                      onChangeText={(text) =>
                        setFieldValue(
                          "seatNumbers",
                          text.split(",").map((s) => s.trim())
                        )
                      }
                      placeholder="Enter seat numbers"
                      style={styles.textInput}
                    />

                    {/* Message */}
                    <TextInput
                      label="Message (Optional)"
                      value={values.message}
                      onChangeText={handleChange("message")}
                      placeholder="Enter any additional message"
                      style={styles.textInput}
                    />

                    {/* Submit Button */}
                    <Button
                      mode="contained"
                      onPress={handleSubmit}
                      disabled={loading}
                      style={styles.submitButton}
                    >
                      {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        "Submit Request"
                      )}
                    </Button>

                    {/* Close Modal Button */}
                    <Pressable
                      onPress={() => setIsModalVisible(false)}
                      style={styles.closeModalButton}
                    >
                      <Text style={styles.closeModalText}>Close</Text>
                    </Pressable>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </Modal>

        {/* User's Trip Requests */}
        <View style={styles.requestsContainer}>
          <Text style={styles.requestsTitle}>Your Trip Requests</Text>
          {tripRequests.length === 0 ? (
            <Text>No trip requests found.</Text>
          ) : (
            tripRequests.map((request) => (
              <View key={request._id} style={styles.requestItem}>
                <Text>{`Departure: ${
                  request.departureLocation?.name || "N/A"
                }`}</Text>
                <Text>{`Arrival: ${
                  request.arrivalLocation?.name || "N/A"
                }`}</Text>
                <Text>{`Departure Time: ${
                  request.preferredDepartureTime || "N/A"
                }`}</Text>
                <Text>{`Bus Type: ${request.busType?.name || "N/A"}`}</Text>
                <Text>{`Seat Numbers: ${request.seatNumbers.join(", ")}`}</Text>
                <Text>{`Message: ${request.message || "N/A"}`}</Text>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => cancelTripRequest(request._id)}
                >
                  <Text style={styles.cancelButtonText}>Cancel Request</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9", // Soft background color
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "600",
  },
  openModalButton: {
    marginBottom: 20,
    paddingVertical: 12,
    backgroundColor: "#28a745",
    borderRadius: 25,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker overlay for focus
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 8, // Soft shadow for modal
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#f4f4f4", // Soft gray background for inputs
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    borderRadius: 25,
    paddingVertical: 14,
  },
  closeModalButton: {
    marginTop: 18,
    alignItems: "center",
  },
  closeModalText: {
    color: "#007BFF",
    fontSize: 18,
    fontWeight: "500",
  },
  requestsContainer: {
    marginTop: 30,
  },
  requestsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  requestItem: {
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#fff", // White background for requests
    shadowColor: "#000", // Soft shadow for request item
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cancelButton: {
    marginTop: 15,
    backgroundColor: "#FF4D4D",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  viewcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HelpCar;
