import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    width: "100%",
  },
  backButton: {
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 4,
  },
  row: {
    padding: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  seat: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  size: {
    marginBottom: 27,
  },
  sold: {
    backgroundColor: "#dc3545", // Red color for sold seats
  },
  available: {
    backgroundColor: "#28a745", // Green color for available seats
  },
  selected: {
    backgroundColor: "#ffa500", // Orange color for selected seats
  },
  tempSelected: {
    backgroundColor: "#ffcc00", // Temporary selected seat color
  },
  seatVip: {
    backgroundColor: "#C0C0C0", // VIP seats color (Pink)
  },
  seatNotForSale: {
    backgroundColor: "#333333", // Non-sale seats color (Gray)
  },
  seatText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  status: {
    fontSize: 16,
  },
  sectionContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionIcon: {
    marginRight: 10,
  },
  tierHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  statusSold: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 10,
    width: 100,
    height: 40,
  },
  statusAvailable: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 10,
    width: 100,
    height: 40,
  },
  statusSelected: {
    backgroundColor: "#ffa500",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    width: 100,
    height: 40,
  },
  statustempSelected: {
    backgroundColor: "#ffa500",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    width: 100,
    height: 40,
  },
  buttonFooter: {
    paddingLeft: 20,
  },
  button: {
    backgroundColor: "#ff6347",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    width: 350,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  selectedSeatsContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginTop: 20,
  },
  selectedSeatsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedSeatItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  
});

export default styles;
