import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
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

const HelpCar = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const token = useSelector((state) => state.user.userInfo.token);

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

  return (
    <View style={styles.container}>
      {/* Button to open the modal */}
      <Button mode="contained" onPress={() => setModalVisible(true)}>
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
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  formContainer: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
  closeButton: {
    marginTop: 10,
  },
});

export default HelpCar;
