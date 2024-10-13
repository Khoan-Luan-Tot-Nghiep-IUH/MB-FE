import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 27,
  },
  header1: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 16,
    color: "#666",
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  tripCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tripInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tripTime: {
    fontSize: 16,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  tripPrice: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  busType: {
    fontSize: 14,
    color: "#666",
  },
  seatStatus: {
    fontSize: 14,
    color: "#666",
  },
  tripLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  tripLocationText: {
    marginLeft: 4,
    fontSize: 14,
  },
  tripDistance: {
    fontSize: 14,
    color: "#666",
  },
  tripDate: {
    fontSize: 14,
    color: "#666",
  },
  noTripsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  filterContainer: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  timePicker: {
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  noTripsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 1,
  },
  filterLabel: {
    padding: 10,
    fontWeight: "bold",
    color: "#333",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
  },
  // header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FF6F61", // Màu nền cam
    paddingVertical: 10, 
    // borderRadius: 10,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  tripInfoContainer: {
    flex: 1,
    flexDirection: "column",
  },
  tripInfo1: {
    fontSize: 18,
    color: "#ffffff", // Màu chữ trắng
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 16,
  },
  dateInfo: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 4,
  },
});

export default styles;
