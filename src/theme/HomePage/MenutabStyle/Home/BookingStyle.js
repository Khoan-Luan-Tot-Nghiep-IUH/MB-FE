import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f9",
    padding: 0,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#33CC66", // Màu nền xám nhẹ
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // Cho Android
  },
  angiang:{
  marginBottom: 25,
  },
  header1: {
    padding: 10,
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    marginBottom: 20,
    borderRadius: 8,
    resizeMode: "cover",
  },
  paymentMethodContainer: {
    marginTop: 20,
  },
  paymentMethodLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  selectedOption: {
    borderColor: "#ff6347",
    backgroundColor: "#ffefd5",
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  confirmButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    flexDirection: "row",
 
  },
  backButtonText: {
    marginLeft: 5,
    color: "#333",
    fontSize: 16,
  },
  headerContainerBooking: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#28A745",
  },
});

export default styles;
