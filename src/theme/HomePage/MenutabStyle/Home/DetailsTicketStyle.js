import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  size: {
    marginBottom: 27,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 10,
  },
  scrollView: {
    padding: 20,
  },
  tripCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  tripInfo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  tripDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  tripLocation: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  tripDate: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  tripPrice: {
    fontSize: 18,
    color: "#28A745",
    fontWeight: "bold",
    marginVertical: 10,
  },
  availableSeats: {
    fontSize: 16,
    color: "#E74C3C",
    marginBottom: 10,
  },
  tripCode: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  tripStatus: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#333",
  },
  scheduleItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  scheduleStop: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noTicketText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
});

export default styles;
