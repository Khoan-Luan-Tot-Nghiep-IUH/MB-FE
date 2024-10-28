import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f9",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  tripDetails: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  tripDetailsText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
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
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  selectedOption: {
    borderColor: "#ff6347",
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
